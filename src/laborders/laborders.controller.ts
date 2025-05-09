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
import { LabordersService } from "./laborders.service";
import { CreateLaborderDto } from "./dto/create-laborder.dto";
import { UpdateLaborderDto } from "./dto/update-laborder.dto";

@ApiTags("lab-orders")
@Controller("lab-orders")
export class LabordersController {
  constructor(private readonly labOrdersService: LabordersService) {}

  @Post()
  @ApiOperation({ summary: "Yangi laboratoriya buyurtma qo'shish" })
  @ApiResponse({
    status: 201,
    description: "Buyurtma muvaffaqiyatli qo'shildi",
  })
  @ApiResponse({ status: 400, description: "Noto'g'ri ma'lumotlar" })
  create(@Body() createLabOrderDto: CreateLaborderDto) {
    return this.labOrdersService.create(createLabOrderDto);
  }

  @Get()
  @ApiOperation({ summary: "Barcha laboratoriya buyurtmalarini olish" })
  @ApiResponse({ status: 200, description: "Buyurtmalar ro'yxati" })
  findAll() {
    return this.labOrdersService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "ID bo'yicha laboratoriya buyurtma olish" })
  @ApiResponse({ status: 200, description: "Buyurtma topildi" })
  @ApiResponse({ status: 404, description: "Buyurtma topilmadi" })
  findOne(@Param("id") id: string) {
    return this.labOrdersService.findOne(+id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Laboratoriya buyurtma ma'lumotlarini yangilash" })
  @ApiResponse({
    status: 200,
    description: "Buyurtma muvaffaqiyatli yangilandi",
  })
  @ApiResponse({ status: 404, description: "Buyurtma topilmadi" })
  update(
    @Param("id") id: string,
    @Body() updateLabOrderDto: UpdateLaborderDto,
  ) {
    return this.labOrdersService.update(+id, updateLabOrderDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Laboratoriya buyurtma o'chirish" })
  @ApiResponse({
    status: 200,
    description: "Buyurtma muvaffaqiyatli o'chirildi",
  })
  @ApiResponse({ status: 404, description: "Buyurtma topilmadi" })
  remove(@Param("id") id: string) {
    return this.labOrdersService.remove(+id);
  }
}
