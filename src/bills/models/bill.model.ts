import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";
import { Patient } from "../../patients/models/patient.model";

export interface IBillCreationAttr {
  patient_id: number;
  total_amount: number;
  due_date: Date;
  status: string;
  payment_method: string;
  insurance_id?: number;
}

@Table({ tableName: "bills" })
export class Bill extends Model<Bill, IBillCreationAttr> {
  @ApiProperty({ example: 1, description: "Hisob IDsi" })
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

  @ApiProperty({ example: 1500.5 })
  @Column({ type: DataType.DECIMAL(10, 2), allowNull: false })
  declare total_amount: number;

  @ApiProperty({ example: "2025-05-10" })
  @Column({ type: DataType.DATE })
  declare due_date: Date;

  @ApiProperty({ example: "PENDING", description: "Holati (PENDING, PAID)" })
  @Column({ type: DataType.ENUM("PENDING", "PAID") })
  declare status: string;

  @ApiProperty({ example: "CASH", description: "To'lov usuli (CASH, CARD)" })
  @Column({ type: DataType.ENUM("CASH", "CARD") })
  declare payment_method: string;

  @ApiProperty({ example: 1 })
  @Column({ type: DataType.INTEGER })
  declare insurance_id: number;

  @BelongsTo(() => Patient)
  declare patient: Patient;
}
