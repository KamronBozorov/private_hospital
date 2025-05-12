import { Module } from "@nestjs/common";
import { MedicationsService } from "./medications.service";
import { MedicationsController } from "./medications.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { Medication } from "./models/medication.model";
import { JwtModule } from "@nestjs/jwt";

@Module({
  imports: [SequelizeModule.forFeature([Medication]), JwtModule],
  controllers: [MedicationsController],
  providers: [MedicationsService],
  exports: [MedicationsService],
})
export class MedicationsModule {}
