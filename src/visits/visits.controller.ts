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
import { VisitsService } from "./visits.service";
import { CreateVisitDto } from "./dto/create-visit.dto";
import { UpdateVisitDto } from "./dto/update-visit.dto";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/common/guards/jwt-auth.guard";
import { RoleAuthGuard } from "src/common/guards/role-auth.guard";
import { Roles } from "src/common/decorators/role.decorator";
import { SelfAuthGuard } from "src/common/guards/self-auth.guard";

@ApiTags("visits")
@Controller("visits")
export class VisitsController {
  constructor(private readonly visitsService: VisitsService) {}

  @Post()
  @ApiOperation({ summary: "Yangi tashrif qo'shish" })
  @ApiResponse({ status: 201, description: "Tashrif muvaffaqiyatli qo'shildi" })
  @ApiResponse({ status: 400, description: "Noto'g'ri ma'lumotlar" })
  @Roles("admin", "creator")
  @UseGuards(RoleAuthGuard)
  @UseGuards(JwtAuthGuard)
  create(@Body() createVisitDto: CreateVisitDto) {
    return this.visitsService.create(createVisitDto);
  }

  @Get()
  @ApiOperation({ summary: "Barcha tashriflarni olish" })
  @ApiResponse({ status: 200, description: "Tashriflar ro'yxati" })
  @Roles("admin", "creator")
  @UseGuards(RoleAuthGuard)
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.visitsService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "ID bo'yicha tashrif olish" })
  @ApiResponse({ status: 200, description: "Tashrif topildi" })
  @ApiResponse({ status: 404, description: "Tashrif topilmadi" })
  findOne(@Param("id") id: string) {
    return this.visitsService.findOne(+id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Tashrif ma'lumotlarini yangilash" })
  @ApiResponse({
    status: 200,
    description: "Tashrif muvaffaqiyatli yangilandi",
  })
  @ApiResponse({ status: 404, description: "Tashrif topilmadi" })
  @Roles("admin", "creator")
  @UseGuards(RoleAuthGuard)
  @UseGuards(JwtAuthGuard)
  update(@Param("id") id: string, @Body() updateVisitDto: UpdateVisitDto) {
    return this.visitsService.update(+id, updateVisitDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Tashrif o'chirish" })
  @ApiResponse({
    status: 200,
    description: "Tashrif muvaffaqiyatli o'chirildi",
  })
  @ApiResponse({ status: 404, description: "Tashrif topilmadi" })
  @Roles("admin", "creator")
  @UseGuards(RoleAuthGuard)
  @UseGuards(JwtAuthGuard)
  remove(@Param("id") id: string) {
    return this.visitsService.remove(+id);
  }
}
