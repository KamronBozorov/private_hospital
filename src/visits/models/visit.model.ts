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
import { Patient } from "../../patients/models/patient.model";
import { Doctor } from "../../doctors/models/doctor.model";
import { Prescription } from "src/prescriptions/models/prescription.model";
import { Staff } from "src/staffs/models/staff.model";
import { Room } from "src/rooms/models/room.model";
import { LabOrder } from "src/laborders/models/laborder.model";
import { MedicalRecord } from "src/medicalrecords/models/medicalrecord.model";

export interface IVisitCreationAttr {
  patient_id: number;
  doctor_id: number;
  visit_date: Date;
  visit_type: string;
  notes: string;
  status: string;
  room_id: number;
}

@Table({ tableName: "visits" })
export class Visit extends Model<Visit, IVisitCreationAttr> {
  @ApiProperty({ example: 1, description: "Tashrif IDsi" })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @ApiProperty({ example: 1 })
  @ForeignKey(() => Patient)
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare patient_id: number;

  @ApiProperty({ example: 1 })
  @ForeignKey(() => Doctor)
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare doctor_id: number;

  @ApiProperty({ example: "2025-05-10" })
  @Column({ type: DataType.DATE })
  declare visit_date: Date;

  @ApiProperty({
    example: "CHECKUP",
    description: "Tashrif turi (appointment, admission, emergency)",
  })
  @Column({ type: DataType.ENUM("appointment", "admission", "emergency") })
  declare visit_type: string;

  @ApiProperty({ example: "Tashrif haqida eslatmalar" })
  @Column({ type: DataType.TEXT })
  declare notes: string;

  @ApiProperty({
    example: "SCHEDULED",
    description: "Holati (scheduled, completed, canceled)",
  })
  @Column({ type: DataType.ENUM("scheduled", "completed", "canceled") })
  declare status: string;

  @ApiProperty({ example: 1 })
  @ForeignKey(() => Room)
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare room_id: number;

  @HasMany(() => Prescription)
  declare prescriptions: Prescription[];

  @BelongsTo(() => Patient)
  declare patient: Patient;

  @BelongsTo(() => Doctor)
  declare doctor: Doctor;

  @BelongsTo(() => Room)
  declare room: Room;

  @HasMany(() => LabOrder)
  declare lab_orders: LabOrder[];

  @HasMany(() => MedicalRecord)
  declare medical_records: MedicalRecord[];
}
