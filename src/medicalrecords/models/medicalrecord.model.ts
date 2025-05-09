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

export interface IMedicalRecordCreationAttr {
  visit_id: number;
  diagnosis: string;
  treatment_notes: string;
}

@Table({ tableName: "medical_records" })
export class MedicalRecord extends Model<
  MedicalRecord,
  IMedicalRecordCreationAttr
> {
  @ApiProperty({ example: 1, description: "Tibbiy yozuv IDsi" })
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

  @ApiProperty({ example: "Gripp tashxisi" })
  @Column({ type: DataType.STRING })
  declare diagnosis: string;

  @ApiProperty({ example: "Davolash bo'yicha eslatmalar" })
  @Column({ type: DataType.TEXT })
  declare treatment_notes: string;

  @BelongsTo(() => Visit)
  declare visit: Visit;
}
