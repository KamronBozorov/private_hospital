import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from "@nestjs/common";
import { PrescriptionsService } from "./prescriptions.service";
import { CreatePrescriptionDto } from "./dto/create-prescription.dto";
import { UpdatePrescriptionDto } from "./dto/update-prescription.dto";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/common/guards/jwt-auth.guard";
import { RoleAuthGuard } from "src/common/guards/role-auth.guard";
import { Roles } from "src/common/decorators/role.decorator";

@ApiTags("prescriptions")
@Controller("prescriptions")
export class PrescriptionsController {
  constructor(private readonly prescriptionsService: PrescriptionsService) {}

  @Post()
  @ApiOperation({ summary: "Yangi retsept qo'shish" })
  @ApiResponse({ status: 201, description: "Retsept muvaffaqiyatli qo'shildi" })
  @ApiResponse({ status: 400, description: "Noto'g'ri ma'lumotlar" })
  @Roles("doctor")
  @UseGuards(RoleAuthGuard)
  @UseGuards(JwtAuthGuard)
  create(@Body() createPrescriptionDto: CreatePrescriptionDto) {
    return this.prescriptionsService.create(createPrescriptionDto);
  }

  @Get()
  @ApiOperation({ summary: "Barcha retseptlarni olish" })
  @ApiResponse({ status: 200, description: "Retseptlar ro'yxati" })
  findAll() {
    return this.prescriptionsService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "ID bo'yicha retsept olish" })
  @ApiResponse({ status: 200, description: "Retsept topildi" })
  @ApiResponse({ status: 404, description: "Retsept topilmadi" })
  findOne(@Param("id") id: string) {
    return this.prescriptionsService.findOne(+id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Retsept ma'lumotlarini yangilash" })
  @ApiResponse({
    status: 200,
    description: "Retsept muvaffaqiyatli yangilandi",
  })
  @ApiResponse({ status: 404, description: "Retsept topilmadi" })
  update(
    @Param("id") id: string,
    @Body() updatePrescriptionDto: UpdatePrescriptionDto,
  ) {
    return this.prescriptionsService.update(+id, updatePrescriptionDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Retsept o'chirish" })
  @ApiResponse({
    status: 200,
    description: "Retsept muvaffaqiyatli o'chirildi",
  })
  @ApiResponse({ status: 404, description: "Retsept topilmadi" })
  remove(@Param("id") id: string) {
    return this.prescriptionsService.remove(+id);
  }
}
