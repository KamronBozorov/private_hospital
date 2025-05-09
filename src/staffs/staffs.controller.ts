import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  Res,
} from "@nestjs/common";
import { StaffsService } from "./staffs.service";
import { CreateStaffDto } from "./dto/create-staff.dto";
import { UpdateStaffDto } from "./dto/update-staff.dto";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { SelfAuthGuard } from "src/common/guards/self-auth.guard";
import { JwtAuthGuard } from "src/common/guards/jwt-auth.guard";
import { Response } from "express";

@ApiTags("staff")
@Controller("staff")
export class StaffController {
  constructor(private readonly staffService: StaffsService) {}

  @Post()
  @ApiOperation({ summary: "Yangi xodim qo'shish" })
  @ApiResponse({ status: 201, description: "Xodim muvaffaqiyatli qo'shildi" })
  @ApiResponse({ status: 400, description: "Noto'g'ri ma'lumotlar" })
  create(@Body() createStaffDto: CreateStaffDto) {
    return this.staffService.create(createStaffDto);
  }

  @Get()
  @ApiOperation({ summary: "Barcha xodimlarni olish" })
  @ApiResponse({ status: 200, description: "Xodimlar ro'yxati" })
  findAll() {
    return this.staffService.findAll();
  }

  @Get("download")
  getAllAsFile(@Res() res: Response) {
    return this.staffService.getAllAsFile(res);
  }

  @Get(":id")
  @ApiOperation({ summary: "ID bo'yicha xodim olish" })
  @ApiResponse({ status: 200, description: "Xodim topildi" })
  @ApiResponse({ status: 404, description: "Xodim topilmadi" })
  findOne(@Param("id") id: string) {
    return this.staffService.findOne(+id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Xodim ma'lumotlarini yangilash" })
  @ApiResponse({ status: 200, description: "Xodim muvaffaqiyatli yangilandi" })
  @ApiResponse({ status: 404, description: "Xodim topilmadi" })
  update(@Param("id") id: string, @Body() updateStaffDto: UpdateStaffDto) {
    return this.staffService.update(+id, updateStaffDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Xodim o'chirish" })
  @ApiResponse({ status: 200, description: "Xodim muvaffaqiyatli o'chirildi" })
  @ApiResponse({ status: 404, description: "Xodim topilmadi" })
  remove(@Param("id") id: string) {
    return this.staffService.remove(+id);
  }
}
