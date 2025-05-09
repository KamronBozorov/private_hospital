import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { User } from "./models/user.model";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private userModel: typeof User) {}

  async create(createUserDto: CreateUserDto, photo: string): Promise<User> {
    return await this.userModel.create({ ...createUserDto, photo });
  }

  async findAll(): Promise<User[]> {
    return await this.userModel.findAll({ include: { all: true } });
  }

  async findOne(id: number): Promise<User> {
    const user = await this.userModel.findByPk(id, { include: { all: true } });
    if (!user) throw new NotFoundException(`Foydalanuvchi #${id} topilmadi`);
    return user;
  }

  findByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ where: { email }, include: { all: true } });
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id);
    return await user.update(updateUserDto);
  }

  async remove(id: number): Promise<void> {
    const user = await this.findOne(id);
    await user.destroy();
  }
}
