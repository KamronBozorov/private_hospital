import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  UploadedFile,
} from "@nestjs/common";
import { PatientsService } from "./patients.service";
import { CreatePatientDto } from "./dto/create-patient.dto";
import { UpdatePatientDto } from "./dto/update-patient.dto";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { Roles } from "src/common/decorators/role.decorator";
import { RoleAuthGuard } from "src/common/guards/role-auth.guard";
import { JwtAuthGuard } from "src/common/guards/jwt-auth.guard";
import { FileInterceptor } from "@nestjs/platform-express";
import { Express } from "express";

@ApiTags("patients")
@Controller("patients")
export class PatientsController {
  constructor(private readonly patientsService: PatientsService) {}

  @Post()
  @ApiOperation({ summary: "Yangi bemor qo'shish" })
  @ApiResponse({ status: 201, description: "Bemor muvaffaqiyatli qo'shildi" })
  @ApiResponse({ status: 400, description: "Noto'g'ri ma'lumotlar" })
  create(@Body() createPatientDto: CreatePatientDto) {
    return this.patientsService.create(createPatientDto);
  }

  @Get()
  @ApiOperation({ summary: "Barcha bemorlarni olish" })
  @ApiResponse({ status: 200, description: "Bemorlar ro'yxati" })
  //@Roles("admin", "creator", "doctor")
  //@UseGuards(RoleAuthGuard)
  //@UseGuards(JwtAuthGuard)
  findAll() {
    return this.patientsService.findAll();
  }

  @Post("upload")
  @UseInterceptors(
    FileInterceptor("file", { limits: { files: 1, fileSize: 10 } }),
  )
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    console.log(file);
  }

  @Get(":id")
  @ApiOperation({ summary: "ID bo'yicha bemor olish" })
  @ApiResponse({ status: 200, description: "Bemor topildi" })
  @ApiResponse({ status: 404, description: "Bemor topilmadi" })
  findOne(@Param("id") id: string) {
    return this.patientsService.findOne(+id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Bemor ma'lumotlarini yangilash" })
  @ApiResponse({ status: 200, description: "Bemor muvaffaqiyatli yangilandi" })
  @ApiResponse({ status: 404, description: "Bemor topilmadi" })
  update(@Param("id") id: string, @Body() updatePatientDto: UpdatePatientDto) {
    return this.patientsService.update(+id, updatePatientDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Bemor o'chirish" })
  @ApiResponse({ status: 200, description: "Bemor muvaffaqiyatli o'chirildi" })
  @ApiResponse({ status: 404, description: "Bemor topilmadi" })
  remove(@Param("id") id: string) {
    return this.patientsService.remove(+id);
  }
}
