import { Module } from "@nestjs/common";
import { StaffsService } from "./staffs.service";
import { StaffController } from "./staffs.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { Staff } from "./models/staff.model";
import { JwtModule } from "@nestjs/jwt";
import { UsersModule } from "src/users/users.module";
import { DepartmentsModule } from "src/departments/departments.module";
import { DoctorsModule } from "src/doctors/doctors.module";

@Module({
  imports: [
    SequelizeModule.forFeature([Staff]),
    JwtModule,
    UsersModule,
    DepartmentsModule,
    DoctorsModule,
  ],
  controllers: [StaffController],
  providers: [StaffsService],
  exports: [StaffsService],
})
export class StaffsModule {}
