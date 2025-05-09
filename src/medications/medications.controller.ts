import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { MedicationsService } from "./medications.service";
import { CreateMedicationDto } from "./dto/create-medication.dto";
import { UpdateMedicationDto } from "./dto/update-medication.dto";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";

@ApiTags("medications")
@Controller("medications")
export class MedicationsController {
  constructor(private readonly medicationsService: MedicationsService) {}

  @Post()
  @ApiOperation({ summary: "Yangi dori qo'shish" })
  @ApiResponse({ status: 201, description: "Dori muvaffaqiyatli qo'shildi" })
  @ApiResponse({ status: 400, description: "Noto'g'ri ma'lumotlar" })
  create(@Body() createMedicationDto: CreateMedicationDto) {
    return this.medicationsService.create(createMedicationDto);
  }

  @Get()
  @ApiOperation({ summary: "Barcha dorilarni olish" })
  @ApiResponse({ status: 200, description: "Dorilar ro'yxati" })
  findAll() {
    return this.medicationsService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "ID bo'yicha dori olish" })
  @ApiResponse({ status: 200, description: "Dori topildi" })
  @ApiResponse({ status: 404, description: "Dori topilmadi" })
  findOne(@Param("id") id: string) {
    return this.medicationsService.findOne(+id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Dori ma'lumotlarini yangilash" })
  @ApiResponse({ status: 200, description: "Dori muvaffaqiyatli yangilandi" })
  @ApiResponse({ status: 404, description: "Dori topilmadi" })
  update(
    @Param("id") id: string,
    @Body() updateMedicationDto: UpdateMedicationDto,
  ) {
    return this.medicationsService.update(+id, updateMedicationDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Dori o'chirish" })
  @ApiResponse({ status: 200, description: "Dori muvaffaqiyatli o'chirildi" })
  @ApiResponse({ status: 404, description: "Dori topilmadi" })
  remove(@Param("id") id: string) {
    return this.medicationsService.remove(+id);
  }
}
