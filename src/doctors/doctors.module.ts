import { Module } from "@nestjs/common";
import { DoctorsService } from "./doctors.service";
import { DoctorsController } from "./doctors.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { Doctor } from "./models/doctor.model";
import { AuthModule } from "src/auth/auth.module";
import { JwtModule } from "@nestjs/jwt";

@Module({
  imports: [SequelizeModule.forFeature([Doctor]), JwtModule],
  controllers: [DoctorsController],
  providers: [DoctorsService],
  exports: [DoctorsService],
})
export class DoctorsModule {}
