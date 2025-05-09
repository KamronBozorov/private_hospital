import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Staff } from "./models/staff.model";
import { CreateStaffDto } from "./dto/create-staff.dto";
import { Workbook } from "exceljs";
import { Response } from "express";
import { UsersModule } from "src/users/users.module";
import { UsersService } from "src/users/users.service";
import { DepartmentsService } from "src/departments/departments.service";
import { DoctorsService } from "src/doctors/doctors.service";

@Injectable()
export class StaffsService {
  constructor(
    @InjectModel(Staff) private staffModel: typeof Staff,
    private readonly userService: UsersService,
    private readonly departmentService: DepartmentsService,
    private readonly doctorService: DoctorsService,
  ) {}

  async create(dto: CreateStaffDto): Promise<Staff> {
    return await this.staffModel.create(dto);
  }

  async findAll(): Promise<Staff[]> {
    return await this.staffModel.findAll({ include: { all: true } });
  }

  async getAllAsFile(res: Response) {
    const staffs = await this.staffModel.findAll();
    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet("exceljs-example");

    worksheet.columns = [
      { header: "No", key: "no", width: 10 },
      { header: "Name", key: "name", width: 30 },
      { header: "Email", key: "email", width: 30 },
      { header: "Department", key: "department", width: 30 },
      { header: "Position", key: "position", width: 30 },
      { header: "License number", key: "licnumber", width: 30 },
    ];

    for (const staff of staffs) {
      const user = await this.userService.findOne(staff.user_id);
      const department = await this.departmentService.findOne(
        staff.department_id,
      );
      let lic: any = "";
      if (staff.role === "doctor") {
        const doctor = await this.doctorService.findOne(staff.user_id);
        lic = doctor.license_number;
      }
      worksheet.addRow({
        no: user.id,
        name: user.first_name + " " + user.last_name,
        email: user.email,
        department: department?.name,
        position: staff.role,
        licnumber: lic,
      });
    }

    const buffer = await workbook.xlsx.writeBuffer();

    return res
      .set(
        "Content-Type",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      )
      .set("Content-Disposition", "attachment; filename=example.xlsx")
      .send(buffer);
  }

  async findOne(id: number): Promise<Staff> {
    const staff = await this.staffModel.findByPk(id, {
      include: { all: true },
    });
    if (!staff) throw new NotFoundException(`Xodim #${id} topilmadi`);
    return staff;
  }

  async update(id: number, dto: Partial<CreateStaffDto>): Promise<Staff> {
    const staff = await this.findOne(id);
    return await staff.update(dto);
  }

  async remove(id: number): Promise<void> {
    const staff = await this.findOne(id);
    await staff.destroy();
  }
}
