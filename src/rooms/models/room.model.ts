import { Table, Column, Model, DataType, HasMany } from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";
import { hasUncaughtExceptionCaptureCallback } from "process";
import { Visit } from "src/visits/models/visit.model";
import { Bed } from "src/beds/models/bed.model";

export interface IRoomCreationAttr {
  room_number: string;
  room_type: string;
  status: string;
}

@Table({ tableName: "rooms" })
export class Room extends Model<Room, IRoomCreationAttr> {
  @ApiProperty({ example: 1, description: "Xona IDsi" })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @ApiProperty({ example: "101" })
  @Column({ type: DataType.STRING, allowNull: false })
  declare room_number: string;

  @ApiProperty({
    example: "STANDARD",
    description: "Xona turi (STANDARD, ICU)",
  })
  @Column({ type: DataType.ENUM("STANDARD", "ICU") })
  declare room_type: string;

  @ApiProperty({
    example: "AVAILABLE",
    description: "Holati (AVAILABLE, OCCUPIED)",
  })
  @Column({ type: DataType.ENUM("AVAILABLE", "OCCUPIED") })
  declare status: string;

  @HasMany(() => Visit)
  declare visits: Visit[];

  @HasMany(() => Bed)
  declare beds: Bed[];
}
