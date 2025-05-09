import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty } from "class-validator";

export class CreateDoctorDto {
  @IsNotEmpty({ message: "Staff ID bo‘sh bo‘lmasligi kerak" })
  staff_id: number;

  @ApiProperty({ example: "Kardiolog" })
  @IsString()
  @IsNotEmpty()
  specialization: string;

  @ApiProperty({ example: "LIC12345" })
  @IsString()
  @IsNotEmpty()
  license_number: string;

  @ApiProperty({ example: "3-years" })
  @IsString()
  @IsNotEmpty()
  experience: string;
}
