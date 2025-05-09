import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Bill } from "./models/bill.model";
import { CreateBillDto } from "./dto/create-bill.dto";
import { warn } from "console";
import { Not } from "sequelize-typescript";
import { PatientsService } from "src/patients/patients.service";

@Injectable()
export class BillsService {
  constructor(
    @InjectModel(Bill) private billModel: typeof Bill,
    private readonly patientService: PatientsService,
  ) {}

  async create(dto: CreateBillDto): Promise<Bill> {
    const { patient_id } = dto;
    const patient = await this.patientService.findOne(patient_id);
    if (!patient) throw new NotFoundException("Bemor topilmadi");
    return await this.billModel.create(dto);
  }

  async findAll(): Promise<Bill[]> {
    return await this.billModel.findAll();
  }

  async findOne(id: number): Promise<Bill> {
    const bill = await this.billModel.findByPk(id);
    if (!bill) throw new NotFoundException(`Hisob #${id} topilmadi`);
    return bill;
  }

  async update(id: number, dto: Partial<CreateBillDto>): Promise<Bill> {
    const bill = await this.findOne(id);
    return await bill.update(dto);
  }

  async remove(id: number): Promise<void> {
    const bill = await this.findOne(id);
    await bill.destroy();
  }
}
