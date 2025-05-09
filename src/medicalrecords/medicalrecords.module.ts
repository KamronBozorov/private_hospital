import { Module } from "@nestjs/common";
import { MedicalrecordsService } from "./medicalrecords.service";
import { MedicalrecordsController } from "./medicalrecords.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { MedicalRecord } from "./models/medicalrecord.model";
import { VisitsModule } from "src/visits/visits.module";

@Module({
  imports: [SequelizeModule.forFeature([MedicalRecord]), VisitsModule],
  controllers: [MedicalrecordsController],
  providers: [MedicalrecordsService],
  exports: [MedicalrecordsService],
})
export class MedicalrecordsModule {}
