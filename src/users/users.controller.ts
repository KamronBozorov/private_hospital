import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { FileInterceptor } from "@nestjs/platform-express";
import { Express } from "express";
import { FileService } from "src/file/file.service";

@ApiTags("users")
@Controller("users")
export class UsersController {
  constructor(
    private readonly fileService: FileService,
    private readonly usersService: UsersService,
  ) {}

  @Post()
  @ApiOperation({ summary: "Yangi foydalanuvchi qo'shish" })
  @ApiResponse({
    status: 201,
    description: "Foydalanuvchi muvaffaqiyatli qo'shildi",
  })
  @ApiResponse({ status: 400, description: "Noto'g'ri ma'lumotlar" })
  @UseInterceptors(FileInterceptor("photo"))
  async create(
    @Body() createUserDto: CreateUserDto,
    @UploadedFile() photo: Express.Multer.File,
  ) {
    const fileName: string = await this.fileService.saveFile(photo);
    return this.usersService.create(createUserDto, fileName);
  }

  @Get()
  @ApiOperation({ summary: "Barcha foydalanuvchilarni olish" })
  @ApiResponse({ status: 200, description: "Foydalanuvchilar ro'yxati" })
  findAll() {
    return this.usersService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "ID bo'yicha foydalanuvchi olish" })
  @ApiResponse({ status: 200, description: "Foydalanuvchi topildi" })
  @ApiResponse({ status: 404, description: "Foydalanuvchi topilmadi" })
  findOne(@Param("id") id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Foydalanuvchi ma'lumotlarini yangilash" })
  @ApiResponse({
    status: 200,
    description: "Foydalanuvchi muvaffaqiyatli yangilandi",
  })
  @ApiResponse({ status: 404, description: "Foydalanuvchi topilmadi" })
  update(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Foydalanuvchi o'chirish" })
  @ApiResponse({
    status: 200,
    description: "Foydalanuvchi muvaffaqiyatli o'chirildi",
  })
  @ApiResponse({ status: 404, description: "Foydalanuvchi topilmadi" })
  remove(@Param("id") id: string) {
    return this.usersService.remove(+id);
  }
}
