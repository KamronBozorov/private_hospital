import {
  Table,
  Column,
  Model,
  DataType,
  BelongsTo,
  HasOne,
  ForeignKey,
} from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";
import { User } from "src/users/models/user.model";
import { Doctor } from "src/doctors/models/doctor.model";
import { Department } from "src/departments/models/department.model";

export type Role = "doctor" | "nurse" | "technician" | "creator" | "admin";

export interface IStaffCreationAttr {
  user_id: number;
  role: Role;
  department_id: number;
  contact_info: string;
  hire_date: Date;
}

@Table({ tableName: "staff" })
export class Staff extends Model<Staff, IStaffCreationAttr> {
  @ApiProperty({ example: 1, description: "Xodim IDsi" })
  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
  })
  declare user_id: number;

  @ApiProperty({
    example: "NURSE",
    description: "Roli (doctor, nurse, technician, creator, admin)",
  })
  @Column({
    type: DataType.ENUM(),
    values: ["doctor", "nurse", "technician", "creator", "admin"],
  })
  declare role: string;

  @ApiProperty({ example: "+998901234567" })
  @Column({ type: DataType.STRING })
  declare contact_info: string;

  @ApiProperty({ example: "2025-01-01" })
  @Column({ type: DataType.DATE })
  declare hire_date: Date;

  @ForeignKey(() => Department)
  @ApiProperty({ example: 1 })
  @Column({ type: DataType.INTEGER, allowNull: true })
  declare department_id: number;

  @BelongsTo(() => User)
  declare user: User;

  @BelongsTo(() => Department)
  declare department: Department;

  @HasOne(() => Doctor)
  declare doctor: Doctor;
}
