import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
  BelongsToMany,
  HasMany,
} from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";
import { Visit } from "../../visits/models/visit.model";
import { Doctor } from "../../doctors/models/doctor.model";
import { Medication } from "src/medications/models/medication.model";
import { PrescriptionMedication } from "src/prescription_medications/models/prescription_medication.model";

export interface IPrescriptionCreationAttr {
  visit_id: number;
  doctor_id: number;
  issue_date: Date;
}

@Table({ tableName: "prescriptions" })
export class Prescription extends Model<
  Prescription,
  IPrescriptionCreationAttr
> {
  @ApiProperty({ example: 1, description: "Retsept IDsi" })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @ApiProperty({ example: 1 })
  @ForeignKey(() => Visit)
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare visit_id: number;

  @ApiProperty({ example: 1 })
  @ForeignKey(() => Doctor)
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare doctor_id: number;

  @ApiProperty({ example: "2025-05-10T14:30:00Z" })
  @Column({ type: DataType.DATE, allowNull: false })
  declare issue_date: Date;

  @BelongsTo(() => Visit)
  declare visit: Visit;

  @BelongsTo(() => Doctor)
  declare doctor: Doctor;

  @BelongsToMany(() => Medication, () => PrescriptionMedication)
  declare medications: Medication[];

  @HasMany(() => PrescriptionMedication)
  declare prescription_medications: PrescriptionMedication[];
}
