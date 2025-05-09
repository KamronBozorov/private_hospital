import { ApiProperty } from "@nestjs/swagger";
import {
  IsString,
  IsEmail,
  IsNotEmpty,
  IsEnum,
  IsOptional,
} from "class-validator";

export class SignUpDto {
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

  @ApiProperty({ example: "password123", description: "Foydalanuvchi paroli" })
  @IsString()
  @IsNotEmpty()
  confirm_password: string;

  @ApiProperty({ example: "male", description: "Jinsi (male, female)" })
  @IsEnum(["male", "female"])
  @IsNotEmpty()
  gender: string;

  @ApiProperty({ example: "+998901234567" })
  @IsString()
  @IsNotEmpty()
  contact_number: string;

  @ApiProperty({ example: "Toshkent sh., Chilanzar tumani" })
  @IsString()
  @IsNotEmpty()
  address: string;

  @ApiProperty({ example: "+998901234568" })
  @IsString()
  @IsOptional()
  emergency_contact: string;
}
