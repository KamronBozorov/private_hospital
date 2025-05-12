import { Module } from "@nestjs/common";
import { BillsService } from "./bills.service";
import { BillsController } from "./bills.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { Bill } from "./models/bill.model";
import { PatientsModule } from "src/patients/patients.module";
import { JwtModule } from "@nestjs/jwt";

@Module({
  imports: [SequelizeModule.forFeature([Bill]), PatientsModule, JwtModule],
  controllers: [BillsController],
  providers: [BillsService],
  exports: [BillsService],
})
export class BillsModule {}
