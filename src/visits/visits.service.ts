import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Visit } from "./models/visit.model";
import { CreateVisitDto } from "./dto/create-visit.dto";
import { PatientsService } from "src/patients/patients.service";
import { DoctorsService } from "src/doctors/doctors.service";
import { RoomsService } from "src/rooms/rooms.service";

@Injectable()
export class VisitsService {
  constructor(
    @InjectModel(Visit) private visitModel: typeof Visit,
    private readonly patientService: PatientsService,
    private readonly doctorService: DoctorsService,
    private readonly roomService: RoomsService,
  ) {}

  async create(dto: CreateVisitDto): Promise<Visit> {
    const { patient_id, doctor_id, room_id } = dto;
    await this.patientService.findOne(patient_id);
    await this.doctorService.findOne(doctor_id);
    await this.roomService.findOne(room_id);
    return await this.visitModel.create(dto);
  }

  async findAll(): Promise<Visit[]> {
    return await this.visitModel.findAll();
  }

  async findOne(id: number): Promise<Visit> {
    const visit = await this.visitModel.findByPk(id);
    if (!visit) throw new NotFoundException(`Tashrif #${id} topilmadi`);
    return visit;
  }

  async update(id: number, dto: Partial<CreateVisitDto>): Promise<Visit> {
    const visit = await this.findOne(id);
    return await visit.update(dto);
  }

  async remove(id: number): Promise<void> {
    const visit = await this.findOne(id);
    await visit.destroy();
  }
}
