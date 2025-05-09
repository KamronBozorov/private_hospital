import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty, IsOptional, IsEnum } from "class-validator";

export class CreateRoomDto {
  @ApiProperty({ example: "101" })
  @IsString()
  @IsNotEmpty()
  room_number: string;

  @ApiProperty({
    example: "STANDARD",
    description: "Xona turi (STANDARD, ICU)",
  })
  @IsEnum(["STANDARD", "ICU"])
  @IsOptional()
  room_type: string;

  @ApiProperty({
    example: "AVAILABLE",
    description: "Holati (AVAILABLE, OCCUPIED)",
  })
  @IsEnum(["AVAILABLE", "OCCUPIED"])
  @IsOptional()
  status: string;
}
