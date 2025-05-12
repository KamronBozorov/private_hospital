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
import { DoctorsService } from "./doctors.service";
import { CreateDoctorDto } from "./dto/create-doctor.dto";
import { UpdateDoctorDto } from "./dto/update-doctor.dto";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { Roles } from "src/common/decorators/role.decorator";
import { RoleAuthGuard } from "src/common/guards/role-auth.guard";
import { JwtAuthGuard } from "src/common/guards/jwt-auth.guard";

@ApiTags("doctors")
@Controller("doctors")
export class DoctorsController {
  constructor(private readonly doctorsService: DoctorsService) {}

  @Post()
  @ApiOperation({ summary: "Yangi shifokor qo'shish" })
  @ApiResponse({
    status: 201,
    description: "Shifokor muvaffaqiyatli qo'shildi",
  })
  @ApiResponse({ status: 400, description: "Noto'g'ri ma'lumotlar" })
  @Roles("creator", "admin")
  @UseGuards(RoleAuthGuard)
  @UseGuards(JwtAuthGuard)
  create(@Body() createDoctorDto: CreateDoctorDto) {
    return this.doctorsService.create(createDoctorDto);
  }

  @Get()
  @ApiOperation({ summary: "Barcha shifokorlarni olish" })
  @ApiResponse({ status: 200, description: "Shifokorlar ro'yxati" })
  findAll() {
    return this.doctorsService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "ID bo'yicha shifokor olish" })
  @ApiResponse({ status: 200, description: "Shifokor topildi" })
  @ApiResponse({ status: 404, description: "Shifokor topilmadi" })
  findOne(@Param("id") id: string) {
    return this.doctorsService.findOne(+id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Shifokor ma'lumotlarini yangilash" })
  @ApiResponse({
    status: 200,
    description: "Shifokor muvaffaqiyatli yangilandi",
  })
  @ApiResponse({ status: 404, description: "Shifokor topilmadi" })
  @Roles("creator", "admin")
  @UseGuards(RoleAuthGuard)
  @UseGuards(JwtAuthGuard)
  update(@Param("id") id: string, @Body() updateDoctorDto: UpdateDoctorDto) {
    return this.doctorsService.update(+id, updateDoctorDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Shifokor o'chirish" })
  @ApiResponse({
    status: 200,
    description: "Shifokor muvaffaqiyatli o'chirildi",
  })
  @ApiResponse({ status: 404, description: "Shifokor topilmadi" })
  @Roles("creator", "admin")
  @UseGuards(RoleAuthGuard)
  @UseGuards(JwtAuthGuard)
  remove(@Param("id") id: string) {
    return this.doctorsService.remove(+id);
  }
}
