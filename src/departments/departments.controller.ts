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
import { DepartmentsService } from "./departments.service";
import { CreateDepartmentDto } from "./dto/create-department.dto";
import { UpdateDepartmentDto } from "./dto/update-department.dto";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { Roles } from "src/common/decorators/role.decorator";
import { RoleAuthGuard } from "src/common/guards/role-auth.guard";
import { JwtAuthGuard } from "src/common/guards/jwt-auth.guard";

@ApiTags("departments")
@Controller("departments")
export class DepartmentsController {
  constructor(private readonly departmentsService: DepartmentsService) {}

  @Post()
  @ApiOperation({ summary: "Yangi bo'lim qo'shish" })
  @ApiResponse({ status: 201, description: "Bo'lim muvaffaqiyatli qo'shildi" })
  @ApiResponse({ status: 400, description: "Noto'g'ri ma'lumotlar" })
  @Roles("creator", "admin")
  @UseGuards(RoleAuthGuard)
  @UseGuards(JwtAuthGuard)
  create(@Body() createDepartmentDto: CreateDepartmentDto) {
    return this.departmentsService.create(createDepartmentDto);
  }

  @Get()
  @ApiOperation({ summary: "Barcha bo'limlarni olish" })
  @ApiResponse({ status: 200, description: "Bo'limlar ro'yxati" })
  findAll() {
    return this.departmentsService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "ID bo'yicha bo'lim olish" })
  @ApiResponse({ status: 200, description: "Bo'lim topildi" })
  @ApiResponse({ status: 404, description: "Bo'lim topilmadi" })
  findOne(@Param("id") id: string) {
    return this.departmentsService.findOne(+id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Bo'lim ma'lumotlarini yangilash" })
  @ApiResponse({ status: 200, description: "Bo'lim muvaffaqiyatli yangilandi" })
  @ApiResponse({ status: 404, description: "Bo'lim topilmadi" })
  @Roles("creator", "admin")
  @UseGuards(RoleAuthGuard)
  @UseGuards(JwtAuthGuard)
  update(
    @Param("id") id: string,
    @Body() updateDepartmentDto: UpdateDepartmentDto,
  ) {
    return this.departmentsService.update(+id, updateDepartmentDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Bo'lim o'chirish" })
  @ApiResponse({ status: 200, description: "Bo'lim muvaffaqiyatli o'chirildi" })
  @ApiResponse({ status: 404, description: "Bo'lim topilmadi" })
  @Roles("creator", "admin")
  @UseGuards(RoleAuthGuard)
  @UseGuards(JwtAuthGuard)
  remove(@Param("id") id: string) {
    return this.departmentsService.remove(+id);
  }
}
