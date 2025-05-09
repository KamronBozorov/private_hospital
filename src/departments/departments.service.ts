import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Department } from "./models/department.model";
import { CreateDepartmentDto } from "./dto/create-department.dto";

@Injectable()
export class DepartmentsService {
  constructor(
    @InjectModel(Department) private departmentModel: typeof Department,
  ) {}

  async create(dto: CreateDepartmentDto): Promise<Department> {
    return await this.departmentModel.create(dto);
  }

  async findAll(): Promise<Department[]> {
    return await this.departmentModel.findAll({ include: { all: true } });
  }

  async countStaffs(): Promise<number> {
    const departments = await this.departmentModel.findAll({
      include: { all: true },
    });

    return departments[0].staffs.length;
  }

  async findOne(id: number): Promise<Department | null> {
    const department = await this.departmentModel.findByPk(id);
    return department;
  }

  async update(
    id: number,
    dto: Partial<CreateDepartmentDto>,
  ): Promise<Department> {
    const department = await this.findOne(id);
    return await department!.update(dto);
  }

  async remove(id: number): Promise<void> {
    const department = await this.findOne(id);
    await department!.destroy();
  }
}
