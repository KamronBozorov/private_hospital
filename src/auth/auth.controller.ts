import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Req,
  Res,
  UnauthorizedException,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { AuthService } from "./auth.service";
import { SignUpDto } from "./dto/patient-sign-up.dto";
import { StaffSignUpDto } from "./dto/staff-sign-up.dto";
import { PatientSignInDto } from "./dto/patient-sign-in.dto";
import { Response, Request, Express } from "express";
import { StaffSignInDto } from "./dto/staff-sign-in.dto";
import { JwtAuthGuard } from "src/common/guards/jwt-auth.guard";
import { RoleAuthGuard } from "src/common/guards/role-auth.guard";
import { Roles } from "src/common/decorators/role.decorator";
import { FileInterceptor } from "@nestjs/platform-express";

@ApiTags("Auth")
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("patient/sign-up")
  @ApiOperation({ summary: "Foydalanuvchini ro'yxatdan o'tkazish" })
  @ApiResponse({ status: 201, description: "Aktivatsiya linki yuborildi" })
  @ApiResponse({ status: 400, description: "Parollar mos emas" })
  @ApiResponse({ status: 409, description: "Foydalanuvchi allaqachon mavjud" })
  @UseInterceptors(FileInterceptor("photo"))
  async signUp(
    @Body() signUpDto: SignUpDto,
    @UploadedFile() photo: Express.Multer.File,
  ) {
    return this.authService.userSignUp(signUpDto, photo);
  }

  @Post("patient/sign-in")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Foydalanuvchini dasturga kiradi" })
  async userSignIn(
    @Body() signInDto: PatientSignInDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.patientSignIn(signInDto, res);
  }

  @Get("patient/verify/:url")
  @ApiOperation({ summary: "Foydalanuvchini aktivatsiya qilish" })
  @ApiResponse({
    status: 200,
    description: "Bemor akkaunti aktivatsiya qilindi",
  })
  @ApiResponse({ status: 404, description: "Bemor topilmadi" })
  async verify(@Param("url") url: string) {
    return this.authService.verifyPatient(url);
  }

  @Post("staff/sign-up")
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: "Staff (shifokor yoki boshqa) ro‘yxatdan o‘tishi" })
  @ApiResponse({
    status: 201,
    description: "Registratsiya muvaffaqiyatli amalga oshirildi",
  })
  @ApiResponse({ status: 400, description: "Noto‘g‘ri ma’lumotlar" })
  @ApiResponse({ status: 404, description: "Department topilmadi" })
  @ApiResponse({ status: 409, description: "Foydalanuvchi allaqachon mavjud" })
  @Roles("creator")
  @UseGuards(RoleAuthGuard)
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor("photo"))
  async staffSignUp(
    @Body() signUpDto: StaffSignUpDto,
    @UploadedFile() photo: Express.Multer.File,
  ) {
    return this.authService.staffSignUp(signUpDto, photo);
  }

  @Post("staff/sign-in")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Staff (shifokor yoki boshqa) tizimga kirishi" })
  @ApiResponse({
    status: 200,
    description: "Tizimga muvaffaqiyatli kirildi",
    schema: {
      example: {
        message: "Muvaffaqiyatli tizimga kirdingiz",
        access_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      },
    },
  })
  @ApiResponse({ status: 400, description: "Email va parol kiriting" })
  @ApiResponse({
    status: 404,
    description: "Foydalanuvchi yoki doktor topilmadi",
  })
  @ApiResponse({ status: 500, description: "Server xatosi" })
  async staffSignIn(
    @Body() signInDto: StaffSignInDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.staffSignIn(signInDto, res);
  }

  @Post("logout")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Foydalanuvchini tizimdan chiqarish" })
  @ApiResponse({ status: 200, description: "Tizimdan muvaffaqiyatli chiqildi" })
  @UseGuards(JwtAuthGuard)
  async logout(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const user = req.user as any;

    if (!user) {
      throw new UnauthorizedException("User not found");
    }

    return this.authService.logout(user.sub, res);
  }

  @Post("patient/refresh-token")
  @HttpCode(HttpStatus.OK)
  @Roles("patient")
  @UseGuards(RoleAuthGuard)
  @UseGuards(JwtAuthGuard)
  async refreshPatientToken(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const userId = req.user.sub;
    return this.authService.patientRefreshToken(userId, res);
  }

  @Post("staff/refresh-token")
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  async refreshStaffToken(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const userId = req.user.sub;
    return this.authService.staffRefReshToken(userId, res);
  }
}
