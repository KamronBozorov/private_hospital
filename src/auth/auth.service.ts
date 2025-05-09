import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { SignUpDto } from "./dto/patient-sign-up.dto";
import { UsersService } from "src/users/users.service";
import * as bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";
import { PatientsService } from "src/patients/patients.service";
import { MailService } from "src/mail/mail.service";
import { StaffSignUpDto } from "./dto/staff-sign-up.dto";
import { DepartmentsService } from "src/departments/departments.service";
import { StaffsService } from "src/staffs/staffs.service";
import { DoctorsService } from "src/doctors/doctors.service";
import { PatientSignInDto } from "./dto/patient-sign-in.dto";
import { USER_NOT_FOUND } from "src/constants";
import { Express, Request, Response } from "express";
import { StaffSignInDto } from "./dto/staff-sign-in.dto";
import { FileService } from "src/file/file.service";

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly staffService: StaffsService,
    private readonly jwtService: JwtService,
    private readonly patientService: PatientsService,
    private readonly mailService: MailService,
    private readonly doctorService: DoctorsService,
    private readonly fileService: FileService,
  ) {}

  async generateTokens(payload: any) {
    const accessToken = this.jwtService.sign(payload, {
      secret: process.env.SECRET,
      expiresIn: process.env.ACCEES_TOKEN_TIME,
    });

    const refreshToken = this.jwtService.sign(payload, {
      secret: process.env.SECRET,
      expiresIn: process.env.REFRESH_TOKEN_TIME,
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  async userSignUp(signUpDto: SignUpDto, photo: Express.Multer.File) {
    const { email, password, confirm_password } = signUpDto;

    if (password !== confirm_password || !password || !confirm_password)
      throw new BadRequestException("Parollar mos emas");

    const user = await this.userService.findByEmail(email);

    if (user) throw new ConflictException("Foydalanuvchi allaqachon mavjud");

    const hashPass = await bcrypt.hash(password, 10);

    const fileName = await this.fileService.saveFile(photo);

    const newUser = await this.userService.create(
      {
        ...signUpDto,
        password: hashPass,
        role: "patient",
      },
      fileName,
    );

    const newPatient = await this.patientService.create({
      user_id: newUser.id,
      ...signUpDto,
      emergency_contact: signUpDto.contact_number,
    });

    await this.mailService.sendMail(newPatient);

    return {
      message: "Aktivatsiya linki yuborildi",
    };
  }

  async staffSignUp(signUpDto: StaffSignUpDto, photo: Express.Multer.File) {
    const { email, password, confirm_password, department_id } = signUpDto;

    if (password !== confirm_password || !password || !confirm_password)
      throw new BadRequestException("Parollar mos emas");

    const user = await this.userService.findByEmail(email);

    if (user) throw new ConflictException("Foydalanuvchi allaqachon mavjud");

    const hashPass = await bcrypt.hash(password, 10);

    const fileName = await this.fileService.saveFile(photo);

    const newUser = await this.userService.create(
      {
        ...signUpDto,
        password: hashPass,
        role: "staff",
      },
      fileName,
    );

    const newStaff = await this.staffService.create({
      ...signUpDto,
      user_id: newUser.id,
      role: signUpDto.role,
    });

    if (signUpDto.role === "doctor") {
      if (
        !signUpDto.specialization ||
        !signUpDto.license_number ||
        !signUpDto.experience
      ) {
        throw new BadRequestException("Doctor fields are required");
      }

      const newDoctor = await this.doctorService.create({
        staff_id: newStaff.user_id,
        specialization: signUpDto.specialization,
        license_number: signUpDto.license_number,
        experience: signUpDto.experience,
      });
    }

    return {
      message: "Registratsiya muvaffaqiyatli amalga oshirildi",
    };
  }

  async patientSignIn(signInDto: PatientSignInDto, res: Response) {
    const { email, password } = signInDto;

    if (!email || !password)
      throw new BadRequestException("Email va parol kiriting");

    const user = await this.userService.findByEmail(email);

    if (!user) throw new NotFoundException(USER_NOT_FOUND);

    const patient = await this.patientService.findOne(user.id);

    if (!patient) throw new NotFoundException("Bemor topilmadi");

    const payload = {
      sub: patient.user_id,
      email: patient.user.email,
      is_active: patient.is_active,
      role: "patient",
    };
    const tokens = await this.generateTokens(payload);

    res.cookie("refresh_token", tokens.refreshToken, {
      httpOnly: true,
      maxAge: 1296000000,
    });

    user.refresh_token = tokens.refreshToken;
    user.save();

    console.log({
      message: "Muvaffaqiyatli tizimga kirdingiz",
      access_token: tokens.accessToken,
    });

    return {
      message: "Muvaffaqiyatli tizimga kirdingiz",
      access_token: tokens.accessToken,
    };
  }

  async staffSignIn(signInDto: StaffSignInDto, res: Response) {
    const { email, password, role } = signInDto;

    if (!email || !password)
      throw new BadRequestException("Email va parol kiriting");

    const user = await this.userService.findByEmail(email);

    if (!user) throw new NotFoundException(USER_NOT_FOUND);

    const staff = await this.staffService.findOne(user.id);

    if (!staff) throw new NotFoundException("Ishchi topilmadi");

    if (role !== staff.role) throw new NotFoundException("Topilmadi");

    let payload = {
      sub: staff.user_id,
      email: staff.user.email,
      role: staff.role,
    };

    const tokens = await this.generateTokens(payload);

    res.cookie("refresh_token", tokens.refreshToken, {
      httpOnly: true,
      maxAge: 1296000000,
    });

    user.refresh_token = tokens.refreshToken;
    user.save();

    return {
      message: "Muvaffaqiyatli tizimga kirdingiz",
      access_token: tokens.accessToken,
    };
  }

  async logout(userId: number, res: Response) {
    const user = await this.userService.findOne(userId);
    if (!user) throw new NotFoundException("Foydalanuvchi topilmadi");

    user.refresh_token = "";
    await user.save();

    res.clearCookie("refresh_token");

    return { message: "Tizimdan muvaffaqiyatli chiqdingiz" };
  }

  async patientRefreshToken(userId: number, res: Response) {
    const user = await this.userService.findOne(userId);
    if (!user) throw new NotFoundException("Foydalanuvchi topilmadi");

    const patient = await this.patientService.findOne(user.id);

    if (!patient) throw new NotFoundException("Bemor topilmadi");

    const payload = {
      sub: patient.user_id,
      email: patient.user.email,
      is_active: patient.is_active,
      role: "patient",
    };

    const tokens = await this.generateTokens(payload);

    res.cookie("refresh_token", tokens.refreshToken, {
      httpOnly: true,
      maxAge: 1296000000,
    });

    user.refresh_token = tokens.refreshToken;
    user.save();

    return {
      message: "Token muvaffaqiyatli yangilandi",
      access_token: tokens.accessToken,
    };
  }

  async staffRefReshToken(userId: number, res: Response) {
    const user = await this.userService.findOne(userId);
    if (!user) throw new NotFoundException("Foydalanuvchi topilmadi");

    const staff = await this.staffService.findOne(user.id);

    if (!staff) throw new NotFoundException("Ishchi topilmadi");

    let payload = {
      sub: staff.user_id,
      email: staff.user.email,
      role: staff.role,
      is_doctor: false,
    };
    if (staff.role === "doctor") {
      const doctore = await this.doctorService.findOne(staff.user_id);

      if (!doctore) throw new NotFoundException("Doktor topilmadi");

      payload.is_doctor = true;
    }

    const tokens = await this.generateTokens(payload);

    res.cookie("refresh_token", tokens.refreshToken, {
      httpOnly: true,
      maxAge: 1296000000,
    });

    user.refresh_token = tokens.refreshToken;
    user.save();

    return {
      message: "Token muvaffaqiyatli yangilandi",
      access_token: tokens.accessToken,
    };
  }
  async verifyPatient(url: string) {
    const patient = await this.patientService.findByUrl(url);

    if (!patient) throw new NotFoundException("Bemor topilmadi");

    patient.is_active = true;
    patient.activation_link = "";
    patient.save();

    return {
      message: `Bemor #${patient.id} akkauntingiz muvaffaqiyatli aktivatsiya qilindi`,
    };
  }
}
