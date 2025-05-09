import {
  Table,
  Column,
  Model,
  DataType,
  BelongsToMany,
  HasMany,
} from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";
import { Prescription } from "src/prescriptions/models/prescription.model";
import { PrescriptionMedication } from "src/prescription_medications/models/prescription_medication.model";

export interface IMedicationCreationAttr {
  name: string;
  description: string;
  manufacturer: string;
  dosage_form: string;
  stock_quantity: number;
}

@Table({ tableName: "medications" })
export class Medication extends Model<Medication, IMedicationCreationAttr> {
  @ApiProperty({ example: 1, description: "Dori IDsi" })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @ApiProperty({ example: "Paracetamol" })
  @Column({ type: DataType.STRING, allowNull: false })
  declare name: string;

  @ApiProperty({ example: "Og'riq qoldiruvchi dori" })
  @Column({ type: DataType.TEXT })
  declare description: string;

  @ApiProperty({ example: "PharmaCorp" })
  @Column({ type: DataType.STRING })
  declare manufacturer: string;

  @ApiProperty({
    example: "tablet",
    description: "Dozaj shakli (tablet, capsule, liquid, injection, topical)",
  })
  @Column({
    type: DataType.ENUM("tablet", "capsule", "liquid", "injection", "topical"),
  })
  declare dosage_form: string;

  @ApiProperty({ example: 100 })
  @Column({ type: DataType.INTEGER })
  declare stock_quantity: number;

  @BelongsToMany(() => Prescription, () => PrescriptionMedication)
  declare prescriptions: Prescription[];

  @HasMany(() => PrescriptionMedication)
  declare prescription_medications: PrescriptionMedication[];
}
