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
import { PrescriptionMedicationsService } from "./prescription_medications.service";
import { CreatePrescriptionMedicationDto } from "./dto/create-prescription_medication.dto";
import { UpdatePrescriptionMedicationDto } from "./dto/update-prescription_medication.dto";

@ApiTags("prescription-medications")
@Controller("prescription-medications")
export class PrescriptionMedicationsController {
  constructor(
    private readonly prescriptionMedicationsService: PrescriptionMedicationsService,
  ) {}

  @Post()
  @ApiOperation({ summary: "Yangi retsept dori qo'shish" })
  @ApiResponse({ status: 201, description: "Dori muvaffaqiyatli qo'shildi" })
  @ApiResponse({ status: 400, description: "Noto'g'ri ma'lumotlar" })
  create(
    @Body() createPrescriptionMedicationDto: CreatePrescriptionMedicationDto,
  ) {
    return this.prescriptionMedicationsService.create(
      createPrescriptionMedicationDto,
    );
  }

  @Get()
  @ApiOperation({ summary: "Barcha retsept dorilarini olish" })
  @ApiResponse({ status: 200, description: "Dorilar ro'yxati" })
  findAll() {
    return this.prescriptionMedicationsService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "ID bo'yicha retsept dori olish" })
  @ApiResponse({ status: 200, description: "Dori topildi" })
  @ApiResponse({ status: 404, description: "Dori topilmadi" })
  findOne(@Param("id") id: string) {
    return this.prescriptionMedicationsService.findOne(+id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Retsept dori ma'lumotlarini yangilash" })
  @ApiResponse({ status: 200, description: "Dori muvaffaqiyatli yangilandi" })
  @ApiResponse({ status: 404, description: "Dori topilmadi" })
  update(
    @Param("id") id: string,
    @Body() updatePrescriptionMedicationDto: UpdatePrescriptionMedicationDto,
  ) {
    return this.prescriptionMedicationsService.update(
      +id,
      updatePrescriptionMedicationDto,
    );
  }

  @Delete(":id")
  @ApiOperation({ summary: "Retsept dori o'chirish" })
  @ApiResponse({ status: 200, description: "Dori muvaffaqiyatli o'chirildi" })
  @ApiResponse({ status: 404, description: "Dori topilmadi" })
  remove(@Param("id") id: string) {
    return this.prescriptionMedicationsService.remove(+id);
  }
}
