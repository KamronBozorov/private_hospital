import { Module } from "@nestjs/common";
import { LabtestsService } from "./labtests.service";
import { LabtestsController } from "./labtests.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { LabTest } from "./models/labtest.models";

@Module({
  imports: [SequelizeModule.forFeature([LabTest])],
  controllers: [LabtestsController],
  providers: [LabtestsService],
  exports: [LabtestsService],
})
export class LabtestsModule {}
