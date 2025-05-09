import { Module } from "@nestjs/common";
import { PrescriptionsService } from "./prescriptions.service";
import { PrescriptionsController } from "./prescriptions.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { Prescription } from "./models/prescription.model";
import { VisitsModule } from "src/visits/visits.module";
import { DoctorsModule } from "src/doctors/doctors.module";

@Module({
  imports: [
    SequelizeModule.forFeature([Prescription]),
    VisitsModule,
    DoctorsModule,
  ],
  controllers: [PrescriptionsController],
  providers: [PrescriptionsService],
  exports: [PrescriptionsService],
})
export class PrescriptionsModule {}
