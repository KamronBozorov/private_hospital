import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";
import { Room } from "../../rooms/models/room.model";

export interface IBedCreationAttr {
  room_id: number;
  bed_number: string;
  status: string;
}

@Table({ tableName: "beds" })
export class Bed extends Model<Bed, IBedCreationAttr> {
  @ApiProperty({ example: 1, description: "Krovat IDsi" })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @ApiProperty({ example: 1 })
  @ForeignKey(() => Room)
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare room_id: number;

  @ApiProperty({ example: "B1" })
  @Column({ type: DataType.STRING, allowNull: false })
  declare bed_number: string;

  @ApiProperty({
    example: "AVAILABLE",
    description: "Holati (AVAILABLE, OCCUPIED)",
  })
  @Column({ type: DataType.ENUM("AVAILABLE", "OCCUPIED") })
  declare status: string;

  @BelongsTo(() => Room)
  declare room: Room;
}
