import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Patient } from "./models/patient.model";
import { CreatePatientDto } from "./dto/create-patient.dto";

@Injectable()
export class PatientsService {
  constructor(@InjectModel(Patient) private patientModel: typeof Patient) {}

  async create(dto: CreatePatientDto): Promise<Patient> {
    return await this.patientModel.create(dto);
  }

  async findAll(): Promise<Patient[]> {
    return await this.patientModel.findAll({ include: { all: true } });
  }

  async findAllActives(): Promise<Patient[]> {
    return await this.patientModel.findAll({
      include: { all: true },
      where: { is_active: true },
    });
  }

  async findOne(id: number): Promise<Patient> {
    const patient = await this.patientModel.findByPk(id, {
      include: { all: true },
    });
    if (!patient) throw new NotFoundException(`Bemor #${id} topilmadi`);
    return patient;
  }

  async findByUrl(url: string): Promise<Patient> {
    const user = await this.patientModel.findOne({
      where: { activation_link: url },
    });
    if (!user) throw new NotFoundException(`Bemor topilmadi`);
    return user;
  }
  async update(id: number, dto: Partial<CreatePatientDto>): Promise<Patient> {
    const patient = await this.findOne(id);
    return await patient.update(dto);
  }

  async remove(id: number): Promise<void> {
    const patient = await this.findOne(id);
    await patient.destroy();
  }
}
