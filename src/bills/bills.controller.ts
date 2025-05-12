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
import { BillsService } from "./bills.service";
import { CreateBillDto } from "./dto/create-bill.dto";
import { UpdateBillDto } from "./dto/update-bill.dto";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { JwtModule } from "@nestjs/jwt";
import { JwtAuthGuard } from "src/common/guards/jwt-auth.guard";
import { RoleAuthGuard } from "src/common/guards/role-auth.guard";
import { Roles } from "src/common/decorators/role.decorator";
import { SelfAuthGuard } from "src/common/guards/self-auth.guard";

@ApiTags("bills")
@Controller("bills")
export class BillsController {
  constructor(private readonly billsService: BillsService) {}

  @Post()
  @ApiOperation({ summary: "Yangi hisob qo'shish" })
  @ApiResponse({ status: 201, description: "Hisob muvaffaqiyatli qo'shildi" })
  @ApiResponse({ status: 400, description: "Noto'g'ri ma'lumotlar" })
  @Roles("creator", "admin")
  @UseGuards(RoleAuthGuard)
  @UseGuards(JwtAuthGuard)
  create(@Body() createBillDto: CreateBillDto) {
    return this.billsService.create(createBillDto);
  }

  @Get()
  @ApiOperation({ summary: "Barcha hisoblarni olish" })
  @ApiResponse({ status: 200, description: "Hisoblar ro'yxati" })
  @Roles("creator", "admin")
  @UseGuards(RoleAuthGuard)
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.billsService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "ID bo'yicha hisob olish" })
  @ApiResponse({ status: 200, description: "Hisob topildi" })
  @ApiResponse({ status: 404, description: "Hisob topilmadi" })
  @UseGuards(SelfAuthGuard)
  @UseGuards(JwtAuthGuard)
  findOne(@Param("id") id: string) {
    return this.billsService.findOne(+id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Hisob ma'lumotlarini yangilash" })
  @ApiResponse({ status: 200, description: "Hisob muvaffaqiyatli yangilandi" })
  @ApiResponse({ status: 404, description: "Hisob topilmadi" })
  update(@Param("id") id: string, @Body() updateBillDto: UpdateBillDto) {
    return this.billsService.update(+id, updateBillDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Hisob o'chirish" })
  @ApiResponse({ status: 200, description: "Hisob muvaffaqiyatli o'chirildi" })
  @ApiResponse({ status: 404, description: "Hisob topilmadi" })
  remove(@Param("id") id: string) {
    return this.billsService.remove(+id);
  }
}
