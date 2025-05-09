import { ApiProperty } from "@nestjs/swagger";
import {
  IsString,
  IsEmail,
  IsNotEmpty,
  IsEnum,
  IsBoolean,
} from "class-validator";

export class CreateUserDto {
  @ApiProperty({ example: "John", description: "Foydalanuvchi ismi" })
  @IsString()
  @IsNotEmpty()
  first_name: string;

  @ApiProperty({ example: "Doe", description: "Foydalanuvchi familiyasi" })
  @IsString()
  @IsNotEmpty()
  last_name: string;

  @ApiProperty({
    example: "john.doe@example.com",
    description: "Foydalanuvchi emaili",
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: "password123", description: "Foydalanuvchi paroli" })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({ example: "patient", description: "Foydalanuvchi roli" })
  @IsEnum(["patient", "staff"])
  @IsNotEmpty()
  role: "patient" | "staff";
}
