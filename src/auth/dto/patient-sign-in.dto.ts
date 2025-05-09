import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsEmail } from "class-validator";

export class PatientSignInDto {
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
}
