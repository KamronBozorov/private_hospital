import { ApiProperty } from "@nestjs/swagger";
import { IsIn, IsNotEmpty, IsString, IsEmail } from "class-validator";
import { Role } from "src/staffs/models/staff.model";

export class StaffSignInDto {
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

  @ApiProperty({
    example: "doctor",
    description: "Roli (doctor, nurse, technician, creator, admin)",
  })
  @IsIn(["doctor", "nurse", "technician", "creator", "admin"])
  role: Role;
}
