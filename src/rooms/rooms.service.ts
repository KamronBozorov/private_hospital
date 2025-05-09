import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Room } from "./models/room.model";
import { CreateRoomDto } from "./dto/create-room.dto";

@Injectable()
export class RoomsService {
  constructor(@InjectModel(Room) private roomModel: typeof Room) {}

  async create(dto: CreateRoomDto): Promise<Room> {
    return await this.roomModel.create(dto);
  }

  async findAll(): Promise<Room[]> {
    return await this.roomModel.findAll();
  }

  async findOne(id: number): Promise<Room> {
    const room = await this.roomModel.findByPk(id);
    if (!room) throw new NotFoundException(`Xona #${id} topilmadi`);
    return room;
  }

  async update(id: number, dto: Partial<CreateRoomDto>): Promise<Room> {
    const room = await this.findOne(id);
    return await room.update(dto);
  }

  async remove(id: number): Promise<void> {
    const room = await this.findOne(id);
    await room.destroy();
  }
}
