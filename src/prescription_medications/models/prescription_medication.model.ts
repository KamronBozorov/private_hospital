import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";
import { Visit } from "../../visits/models/visit.model";
import { Medication } from "../../medications/models/medication.model";
import { Prescription } from "src/prescriptions/models/prescription.model";

export interface IPrescriptionMedicationCreationAttr {
  visit_id: number;
  prescription_id: number;
  medication_id: number;
  dosage: string;
  frequency: string;
  duration_days: number;
}

@Table({ tableName: "prescription_medications" })
export class PrescriptionMedication extends Model<
  PrescriptionMedication,
  IPrescriptionMedicationCreationAttr
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
  @ForeignKey(() => Prescription)
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare prescription_id: number;

  @ApiProperty({ example: 1 })
  @ForeignKey(() => Medication)
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare medication_id: number;

  @ApiProperty({ example: "1 tablet" })
  @Column({ type: DataType.STRING })
  declare dosage: string;

  @ApiProperty({ example: "Kuni 2 marta" })
  @Column({ type: DataType.STRING })
  declare frequency: string;

  @ApiProperty({ example: 7 })
  @Column({ type: DataType.INTEGER })
  declare duration_days: number;

  @BelongsTo(() => Visit)
  declare visit: Visit;

  @BelongsTo(() => Medication)
  declare medication: Medication;

  @BelongsTo(() => Prescription)
  declare prescription: Prescription;
}
