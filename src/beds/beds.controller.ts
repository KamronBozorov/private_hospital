import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { BedsService } from "./beds.service";
import { CreateBedDto } from "./dto/create-bed.dto";
import { UpdateBedDto } from "./dto/update-bed.dto";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";

@ApiTags("beds")
@Controller("beds")
export class BedsController {
  constructor(private readonly bedsService: BedsService) {}

  @Post()
  @ApiOperation({ summary: "Yangi krovat qo'shish" })
  @ApiResponse({ status: 201, description: "Krovat muvaffaqiyatli qo'shildi" })
  @ApiResponse({ status: 400, description: "Noto'g'ri ma'lumotlar" })
  create(@Body() createBedDto: CreateBedDto) {
    return this.bedsService.create(createBedDto);
  }

  @Get()
  @ApiOperation({ summary: "Barcha krovatlarni olish" })
  @ApiResponse({ status: 200, description: "Krovatlar ro'yxati" })
  findAll() {
    return this.bedsService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "ID bo'yicha krovat olish" })
  @ApiResponse({ status: 200, description: "Krovat topildi" })
  @ApiResponse({ status: 404, description: "Krovat topilmadi" })
  findOne(@Param("id") id: string) {
    return this.bedsService.findOne(+id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Krovat ma'lumotlarini yangilash" })
  @ApiResponse({ status: 200, description: "Krovat muvaffaqiyatli yangilandi" })
  @ApiResponse({ status: 404, description: "Krovat topilmadi" })
  update(@Param("id") id: string, @Body() updateBedDto: UpdateBedDto) {
    return this.bedsService.update(+id, updateBedDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Krovat o'chirish" })
  @ApiResponse({ status: 200, description: "Krovat muvaffaqiyatli o'chirildi" })
  @ApiResponse({ status: 404, description: "Krovat topilmadi" })
  remove(@Param("id") id: string) {
    return this.bedsService.remove(+id);
  }
}
