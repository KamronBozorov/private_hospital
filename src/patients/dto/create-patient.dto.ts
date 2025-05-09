import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty, IsOptional, IsEnum } from "class-validator";

export class CreatePatientDto {
  user_id: number;

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
  @IsOptional()
  address: string;

  @ApiProperty({ example: "+998901234568" })
  @IsString()
  @IsOptional()
  emergency_contact: string;
}
