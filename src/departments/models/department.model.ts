import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
  HasMany,
} from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";
import { Doctor } from "../../doctors/models/doctor.model";
import { Staff } from "src/staffs/models/staff.model";
import { Visit } from "src/visits/models/visit.model";

export interface IDepartmentCreationAttr {
  name: string;
  description: string;
  head_doctor_id?: number;
}

@Table({ tableName: "departments" })
export class Department extends Model<Department, IDepartmentCreationAttr> {
  @ApiProperty({ example: 1, description: "Bo'lim IDsi" })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @ApiProperty({ example: "Kardiologiya" })
  @Column({ type: DataType.STRING, allowNull: false })
  declare name: string;

  @ApiProperty({ example: "Yurak kasalliklari bo'limi" })
  @Column({ type: DataType.TEXT })
  declare description: string;

  @HasMany(() => Staff)
  declare staffs: Staff[];
}
