import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Medication } from "./models/medication.model";
import { CreateMedicationDto } from "./dto/create-medication.dto";

@Injectable()
export class MedicationsService {
  constructor(
    @InjectModel(Medication) private medicationModel: typeof Medication,
  ) {}

  async create(dto: CreateMedicationDto): Promise<Medication> {
    return await this.medicationModel.create(dto);
  }

  async findAll(): Promise<Medication[]> {
    return await this.medicationModel.findAll();
  }

  async findOne(id: number): Promise<Medication> {
    const medication = await this.medicationModel.findByPk(id);
    if (!medication) throw new NotFoundException(`Dori #${id} topilmadi`);
    return medication;
  }

  async update(
    id: number,
    dto: Partial<CreateMedicationDto>,
  ): Promise<Medication> {
    const medication = await this.findOne(id);
    return await medication.update(dto);
  }

  async remove(id: number): Promise<void> {
    const medication = await this.findOne(id);
    await medication.destroy();
  }
}
