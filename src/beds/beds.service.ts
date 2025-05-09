import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Bed } from "./models/bed.model";
import { CreateBedDto } from "./dto/create-bed.dto";

@Injectable()
export class BedsService {
  constructor(@InjectModel(Bed) private bedModel: typeof Bed) {}

  async create(dto: CreateBedDto): Promise<Bed> {
    return await this.bedModel.create(dto);
  }

  async findAll(): Promise<Bed[]> {
    return await this.bedModel.findAll();
  }

  async findOne(id: number): Promise<Bed> {
    const bed = await this.bedModel.findByPk(id);
    if (!bed) throw new NotFoundException(`Krovat #${id} topilmadi`);
    return bed;
  }

  async update(id: number, dto: Partial<CreateBedDto>): Promise<Bed> {
    const bed = await this.findOne(id);
    return await bed.update(dto);
  }

  async remove(id: number): Promise<void> {
    const bed = await this.findOne(id);
    await bed.destroy();
  }
}
