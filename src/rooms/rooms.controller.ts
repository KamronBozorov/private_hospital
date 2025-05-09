import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { RoomsService } from "./rooms.service";
import { CreateRoomDto } from "./dto/create-room.dto";
import { UpdateRoomDto } from "./dto/update-room.dto";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";

@ApiTags("rooms")
@Controller("rooms")
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @Post()
  @ApiOperation({ summary: "Yangi xona qo'shish" })
  @ApiResponse({ status: 201, description: "Xona muvaffaqiyatli qo'shildi" })
  @ApiResponse({ status: 400, description: "Noto'g'ri ma'lumotlar" })
  create(@Body() createRoomDto: CreateRoomDto) {
    return this.roomsService.create(createRoomDto);
  }

  @Get()
  @ApiOperation({ summary: "Barcha xonalarni olish" })
  @ApiResponse({ status: 200, description: "Xonalar ro'yxati" })
  findAll() {
    return this.roomsService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "ID bo'yicha xona olish" })
  @ApiResponse({ status: 200, description: "Xona topildi" })
  @ApiResponse({ status: 404, description: "Xona topilmadi" })
  findOne(@Param("id") id: string) {
    return this.roomsService.findOne(+id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Xona ma'lumotlarini yangilash" })
  @ApiResponse({ status: 200, description: "Xona muvaffaqiyatli yangilandi" })
  @ApiResponse({ status: 404, description: "Xona topilmadi" })
  update(@Param("id") id: string, @Body() updateRoomDto: UpdateRoomDto) {
    return this.roomsService.update(+id, updateRoomDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Xona o'chirish" })
  @ApiResponse({ status: 200, description: "Xona muvaffaqiyatli o'chirildi" })
  @ApiResponse({ status: 404, description: "Xona topilmadi" })
  remove(@Param("id") id: string) {
    return this.roomsService.remove(+id);
  }
}
