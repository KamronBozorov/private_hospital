import { Module } from "@nestjs/common";
import { DepartmentsService } from "./departments.service";
import { DepartmentsController } from "./departments.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { Department } from "./models/department.model";
import { DoctorsModule } from "src/doctors/doctors.module";
import { JwtModule } from "@nestjs/jwt";

@Module({
  imports: [SequelizeModule.forFeature([Department]), DoctorsModule, JwtModule],
  controllers: [DepartmentsController],
  providers: [DepartmentsService],
  exports: [DepartmentsService],
})
export class DepartmentsModule {}
