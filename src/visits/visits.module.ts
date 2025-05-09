import { Module } from "@nestjs/common";
import { VisitsService } from "./visits.service";
import { VisitsController } from "./visits.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { Visit } from "./models/visit.model";
import { DoctorsModule } from "src/doctors/doctors.module";
import { PatientsModule } from "src/patients/patients.module";
import { RoomsModule } from "src/rooms/rooms.module";

@Module({
  imports: [
    SequelizeModule.forFeature([Visit]),
    DoctorsModule,
    PatientsModule,
    RoomsModule,
  ],
  controllers: [VisitsController],
  providers: [VisitsService],
  exports: [VisitsService],
})
export class VisitsModule {}
