import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { LabtestsService } from "./labtests.service";
import { CreateLabtestDto } from "./dto/create-labtest.dto";
import { UpdateLabtestDto } from "./dto/update-labtest.dto";

@ApiTags("lab-tests")
@Controller("lab-tests")
export class LabtestsController {
  constructor(private readonly labTestsService: LabtestsService) {}

  @Post()
  @ApiOperation({ summary: "Yangi laboratoriya testi qo'shish" })
  @ApiResponse({ status: 201, description: "Test muvaffaqiyatli qo'shildi" })
  @ApiResponse({ status: 400, description: "Noto'g'ri ma'lumotlar" })
  create(@Body() createLabTestDto: CreateLabtestDto) {
    return this.labTestsService.create(createLabTestDto);
  }

  @Get()
  @ApiOperation({ summary: "Barcha laboratoriya testlarini olish" })
  @ApiResponse({ status: 200, description: "Testlar ro'yxati" })
  findAll() {
    return this.labTestsService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "ID bo'yicha laboratoriya test olish" })
  @ApiResponse({ status: 200, description: "Test topildi" })
  @ApiResponse({ status: 404, description: "Test topilmadi" })
  findOne(@Param("id") id: string) {
    return this.labTestsService.findOne(+id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Laboratoriya test ma'lumotlarini yangilash" })
  @ApiResponse({ status: 200, description: "Test muvaffaqiyatli yangilandi" })
  @ApiResponse({ status: 404, description: "Test topilmadi" })
  update(@Param("id") id: string, @Body() updateLabTestDto: UpdateLabtestDto) {
    return this.labTestsService.update(+id, updateLabTestDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Laboratoriya test o'chirish" })
  @ApiResponse({ status: 200, description: "Test muvaffaqiyatli o'chirildi" })
  @ApiResponse({ status: 404, description: "Test topilmadi" })
  remove(@Param("id") id: string) {
    return this.labTestsService.remove(+id);
  }
}
