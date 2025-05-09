import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { MedicalRecord } from "./models/medicalrecord.model";
import { CreateMedicalrecordDto } from "./dto/create-medicalrecord.dto";
import { VisitsService } from "src/visits/visits.service";

@Injectable()
export class MedicalrecordsService {
  constructor(
    @InjectModel(MedicalRecord)
    private medicalRecordModel: typeof MedicalRecord,
    private readonly visitService: VisitsService,
  ) {}

  async create(dto: CreateMedicalrecordDto): Promise<MedicalRecord> {
    const { visit_id } = dto;
    await this.visitService.findOne(visit_id);
    return await this.medicalRecordModel.create(dto);
  }

  async findAll(): Promise<MedicalRecord[]> {
    return await this.medicalRecordModel.findAll();
  }

  async findOne(id: number): Promise<MedicalRecord> {
    const record = await this.medicalRecordModel.findByPk(id);
    if (!record) throw new NotFoundException(`Tibbiy yozuv #${id} topilmadi`);
    return record;
  }

  async update(
    id: number,
    dto: Partial<CreateMedicalrecordDto>,
  ): Promise<MedicalRecord> {
    const record = await this.findOne(id);
    return await record.update(dto);
  }

  async remove(id: number): Promise<void> {
    const record = await this.findOne(id);
    await record.destroy();
  }
}
