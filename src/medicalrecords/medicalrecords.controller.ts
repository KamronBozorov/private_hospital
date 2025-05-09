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
import { MedicalrecordsService } from "./medicalrecords.service";
import { CreateMedicalrecordDto } from "./dto/create-medicalrecord.dto";
import { UpdateMedicalrecordDto } from "./dto/update-medicalrecord.dto";

@ApiTags("medical-records")
@Controller("medical-records")
export class MedicalrecordsController {
  constructor(private readonly medicalRecordsService: MedicalrecordsService) {}

  @Post()
  @ApiOperation({ summary: "Yangi tibbiy yozuv qo'shish" })
  @ApiResponse({ status: 201, description: "Yozuv muvaffaqiyatli qo'shildi" })
  @ApiResponse({ status: 400, description: "Noto'g'ri ma'lumotlar" })
  create(@Body() createMedicalRecordDto: CreateMedicalrecordDto) {
    return this.medicalRecordsService.create(createMedicalRecordDto);
  }

  @Get()
  @ApiOperation({ summary: "Barcha tibbiy yozuvlarni olish" })
  @ApiResponse({ status: 200, description: "Yozuvlar ro'yxati" })
  findAll() {
    return this.medicalRecordsService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "ID bo'yicha tibbiy yozuv olish" })
  @ApiResponse({ status: 200, description: "Yozuv topildi" })
  @ApiResponse({ status: 404, description: "Yozuv topilmadi" })
  findOne(@Param("id") id: string) {
    return this.medicalRecordsService.findOne(+id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Tibbiy yozuvni yangilash" })
  @ApiResponse({ status: 200, description: "Yozuv muvaffaqiyatli yangilandi" })
  @ApiResponse({ status: 404, description: "Yozuv topilmadi" })
  update(
    @Param("id") id: string,
    @Body() updateMedicalRecordDto: UpdateMedicalrecordDto,
  ) {
    return this.medicalRecordsService.update(+id, updateMedicalRecordDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Tibbiy yozuv o'chirish" })
  @ApiResponse({ status: 200, description: "Yozuv muvaffaqiyatli o'chirildi" })
  @ApiResponse({ status: 404, description: "Yozuv topilmadi" })
  remove(@Param("id") id: string) {
    return this.medicalRecordsService.remove(+id);
  }
}
