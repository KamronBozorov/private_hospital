import { Module } from "@nestjs/common";
import { BillsService } from "./bills.service";
import { BillsController } from "./bills.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { Bill } from "./models/bill.model";
import { PatientsModule } from "src/patients/patients.module";

@Module({
  imports: [SequelizeModule.forFeature([Bill]), PatientsModule],
  controllers: [BillsController],
  providers: [BillsService],
  exports: [BillsService],
})
export class BillsModule {}
