import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { UsersModule } from "src/users/users.module";
import { StaffsModule } from "src/staffs/staffs.module";
import { PatientsModule } from "src/patients/patients.module";
import { MailModule } from "src/mail/mail.module";
import { JwtModule } from "@nestjs/jwt";
import { DepartmentsModule } from "src/departments/departments.module";
import { DoctorsModule } from "src/doctors/doctors.module";
import { FileModule } from "src/file/file.module";

@Module({
  imports: [
    UsersModule,
    StaffsModule,
    PatientsModule,
    StaffsModule,
    MailModule,
    JwtModule,
    DepartmentsModule,
    DoctorsModule,
    FileModule,
  ],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
