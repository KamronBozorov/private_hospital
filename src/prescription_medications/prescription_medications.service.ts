import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { PrescriptionMedication } from "./models/prescription_medication.model";
import { CreatePrescriptionMedicationDto } from "./dto/create-prescription_medication.dto";
import { VisitsService } from "src/visits/visits.service";
import { PrescriptionsService } from "src/prescriptions/prescriptions.service";
import { MedicationsService } from "src/medications/medications.service";

@Injectable()
export class PrescriptionMedicationsService {
  constructor(
    @InjectModel(PrescriptionMedication)
    private prescriptionMedicationModel: typeof PrescriptionMedication,
    private readonly visitService: VisitsService,
    private readonly prescriptionService: PrescriptionsService,
    private readonly medicationsService: MedicationsService,
  ) {}

  async create(
    dto: CreatePrescriptionMedicationDto,
  ): Promise<PrescriptionMedication> {
    const { visit_id, prescription_id, medication_id } = dto;
    await this.visitService.findOne(visit_id);
    await this.prescriptionService.findOne(prescription_id);
    await this.medicationsService.findOne(medication_id);
    return await this.prescriptionMedicationModel.create(dto);
  }

  async findAll(): Promise<PrescriptionMedication[]> {
    return await this.prescriptionMedicationModel.findAll();
  }

  async findOne(id: number): Promise<PrescriptionMedication> {
    const prescription = await this.prescriptionMedicationModel.findByPk(id);
    if (!prescription) throw new NotFoundException(`Retsept #${id} topilmadi`);
    return prescription;
  }

  async update(
    id: number,
    dto: Partial<CreatePrescriptionMedicationDto>,
  ): Promise<PrescriptionMedication> {
    const prescription = await this.findOne(id);
    return await prescription.update(dto);
  }

  async remove(id: number): Promise<void> {
    const prescription = await this.findOne(id);
    await prescription.destroy();
  }
}
