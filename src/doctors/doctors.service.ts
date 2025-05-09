import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Doctor } from "./models/doctor.model";
import { CreateDoctorDto } from "./dto/create-doctor.dto";

@Injectable()
export class DoctorsService {
  constructor(@InjectModel(Doctor) private doctorModel: typeof Doctor) {}

  async create(dto: CreateDoctorDto): Promise<Doctor> {
    return await this.doctorModel.create(dto);
  }

  async findAll(): Promise<Doctor[]> {
    return await this.doctorModel.findAll({ include: { all: true } });
  }

  async findOne(id: number): Promise<Doctor> {
    const doctor = await this.doctorModel.findByPk(id);
    if (!doctor) throw new NotFoundException(`Shifokor #${id} topilmadi`);
    return doctor;
  }

  async update(id: number, dto: Partial<CreateDoctorDto>): Promise<Doctor> {
    const doctor = await this.findOne(id);
    return await doctor.update(dto);
  }

  async remove(id: number): Promise<void> {
    const doctor = await this.findOne(id);
    await doctor.destroy();
  }
}
