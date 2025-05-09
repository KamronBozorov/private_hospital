import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Prescription } from "./models/prescription.model";
import { CreatePrescriptionDto } from "./dto/create-prescription.dto";
import { VisitsService } from "src/visits/visits.service";
import { DoctorsService } from "src/doctors/doctors.service";

@Injectable()
export class PrescriptionsService {
  constructor(
    @InjectModel(Prescription) private prescriptionModel: typeof Prescription,
    private readonly visitService: VisitsService,
    private readonly doctorService: DoctorsService,
  ) {}

  async create(dto: CreatePrescriptionDto): Promise<Prescription> {
    const { visit_id, doctor_id } = dto;
    await this.visitService.findOne(visit_id);
    await this.doctorService.findOne(doctor_id);
    return await this.prescriptionModel.create(dto);
  }

  async findAll(): Promise<Prescription[]> {
    return await this.prescriptionModel.findAll();
  }

  async findOne(id: number): Promise<Prescription> {
    const prescription = await this.prescriptionModel.findByPk(id);
    if (!prescription) throw new NotFoundException(`Retsept #${id} topilmadi`);
    return prescription;
  }

  async update(
    id: number,
    dto: Partial<CreatePrescriptionDto>,
  ): Promise<Prescription> {
    const prescription = await this.findOne(id);
    return await prescription.update(dto);
  }

  async remove(id: number): Promise<void> {
    const prescription = await this.findOne(id);
    await prescription.destroy();
  }
}
