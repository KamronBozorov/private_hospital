import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { PrescriptionMedicationsController } from "./prescription_medications.controller";
import { PrescriptionMedicationsService } from "./prescription_medications.service";
import { PrescriptionMedication } from "./models/prescription_medication.model";
import { VisitsModule } from "src/visits/visits.module";
import { PrescriptionsModule } from "src/prescriptions/prescriptions.module";
import { MedicationsModule } from "src/medications/medications.module";

@Module({
  imports: [
    SequelizeModule.forFeature([PrescriptionMedication]),
    VisitsModule,
    PrescriptionsModule,
    MedicationsModule,
  ],
  controllers: [PrescriptionMedicationsController],
  providers: [PrescriptionMedicationsService],
  exports: [PrescriptionMedicationsService],
})
export class PrescriptionMedicationsModule {}
