import { ApiProperty } from "@nestjs/swagger";
import {
  IsNumber,
  IsNotEmpty,
  IsOptional,
  IsEnum,
  IsDateString,
} from "class-validator";

export class CreateBillDto {
  @ApiProperty({ example: 1 })
  @IsNumber()
  @IsNotEmpty()
  patient_id: number;

  @ApiProperty({ example: 1500.5 })
  @IsNumber()
  @IsNotEmpty()
  total_amount: number;

  @ApiProperty({ example: "2025-05-10" })
  @IsDateString()
  @IsNotEmpty()
  due_date: Date;

  @ApiProperty({ example: "PENDING", description: "Holati (PENDING, PAID)" })
  @IsEnum(["PENDING", "PAID"])
  @IsOptional()
  status: string;

  @ApiProperty({ example: "CASH", description: "To'lov usuli (CASH, CARD)" })
  @IsEnum(["CASH", "CARD"])
  @IsOptional()
  payment_method: string;

  @ApiProperty({ example: 1 })
  @IsNumber()
  @IsOptional()
  insurance_id: number;
}
