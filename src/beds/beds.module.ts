import { Module } from "@nestjs/common";
import { BedsService } from "./beds.service";
import { BedsController } from "./beds.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { Bed } from "./models/bed.model";

@Module({
  imports: [SequelizeModule.forFeature([Bed])],
  controllers: [BedsController],
  providers: [BedsService],
  exports: [BedsService],
})
export class BedsModule {}
