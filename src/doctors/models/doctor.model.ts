import {
  Table,
  Column,
  Model,
  DataType,
  BelongsTo,
  HasMany,
  ForeignKey,
} from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";
import { Staff } from "src/staffs/models/staff.model";
import { Department } from "src/departments/models/department.model";
import { Visit } from "src/visits/models/visit.model";

export interface IDoctorCreationAttr {
  staff_id: number;
  specialization: string;
  license_number: string;
  experience: string;
}

@Table({ tableName: "doctors" })
export class Doctor extends Model<Doctor, IDoctorCreationAttr> {
  @ForeignKey(() => Staff)
  @ApiProperty({ example: 1, description: "Shifokor IDsi" })
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
  })
  declare staff_id: number;

  @ApiProperty({ example: "Kardiolog" })
  @Column({ type: DataType.STRING, allowNull: false })
  declare specialization: string;

  @ApiProperty({ example: "LIC12345" })
  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  declare license_number: string;

  @ApiProperty({ example: "10 years" })
  @Column({ type: DataType.STRING, allowNull: false })
  declare experience: string;

  @BelongsTo(() => Staff)
  declare staff: Staff;

  @HasMany(() => Visit)
  declare visits: Visit[];
}
