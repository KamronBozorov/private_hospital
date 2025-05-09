import { Module } from "@nestjs/common";
import { LabordersService } from "./laborders.service";
import { LabordersController } from "./laborders.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { LabOrder } from "./models/laborder.model";
import { LabtestsModule } from "src/labtests/labtests.module";
import { VisitsModule } from "src/visits/visits.module";

@Module({
  imports: [
    SequelizeModule.forFeature([LabOrder]),
    LabtestsModule,
    VisitsModule,
  ],
  controllers: [LabordersController],
  providers: [LabordersService],
  exports: [LabordersService],
})
export class LabordersModule {}
