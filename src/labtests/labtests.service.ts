import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { LabTest } from "./models/labtest.models";
import { CreateLabtestDto } from "./dto/create-labtest.dto";

@Injectable()
export class LabtestsService {
  constructor(@InjectModel(LabTest) private labTestModel: typeof LabTest) {}

  async create(dto: CreateLabtestDto): Promise<LabTest> {
    return await this.labTestModel.create(dto);
  }

  async findAll(): Promise<LabTest[]> {
    return await this.labTestModel.findAll();
  }

  async findOne(id: number): Promise<LabTest> {
    const labTest = await this.labTestModel.findByPk(id);
    if (!labTest)
      throw new NotFoundException(`Laboratoriya testi #${id} topilmadi`);
    return labTest;
  }

  async update(id: number, dto: Partial<CreateLabtestDto>): Promise<LabTest> {
    const labTest = await this.findOne(id);
    return await labTest.update(dto);
  }

  async remove(id: number): Promise<void> {
    const labTest = await this.findOne(id);
    await labTest.destroy();
  }
}
