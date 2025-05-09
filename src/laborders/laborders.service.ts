import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { LabOrder } from "./models/laborder.model";
import { CreateLaborderDto } from "./dto/create-laborder.dto";
import { VisitsService } from "src/visits/visits.service";
import { LabtestsService } from "src/labtests/labtests.service";

@Injectable()
export class LabordersService {
  constructor(
    @InjectModel(LabOrder) private labOrderModel: typeof LabOrder,
    private readonly visitService: VisitsService,
    private readonly testService: LabtestsService,
  ) {}

  async create(dto: CreateLaborderDto): Promise<LabOrder> {
    const { visit_id, test_id } = dto;
    await this.visitService.findOne(visit_id);
    await this.testService.findOne(test_id);
    return await this.labOrderModel.create(dto);
  }

  async findAll(): Promise<LabOrder[]> {
    return await this.labOrderModel.findAll();
  }

  async findOne(id: number): Promise<LabOrder> {
    const labOrder = await this.labOrderModel.findByPk(id);
    if (!labOrder)
      throw new NotFoundException(`Laboratoriya buyurtma #${id} topilmadi`);
    return labOrder;
  }

  async update(id: number, dto: Partial<CreateLaborderDto>): Promise<LabOrder> {
    const labOrder = await this.findOne(id);
    return await labOrder.update(dto);
  }

  async remove(id: number): Promise<void> {
    const labOrder = await this.findOne(id);
    await labOrder.destroy();
  }
}
