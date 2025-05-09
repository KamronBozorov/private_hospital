import { Table, Column, Model, DataType, HasMany } from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";
import { Visit } from "src/visits/models/visit.model";
import { LabOrder } from "src/laborders/models/laborder.model";

export interface ILabTestCreationAttr {
  test_name: string;
  description: string;
  standard_cost: number;
}

@Table({ tableName: "lab_tests" })
export class LabTest extends Model<LabTest, ILabTestCreationAttr> {
  @ApiProperty({ example: 1, description: "Laboratoriya testi IDsi" })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @ApiProperty({ example: "Qon tahlili" })
  @Column({ type: DataType.STRING, allowNull: false })
  declare test_name: string;

  @ApiProperty({ example: "Umumiy qon tahlili" })
  @Column({ type: DataType.TEXT })
  declare description: string;

  @ApiProperty({ example: 50.0 })
  @Column({ type: DataType.DECIMAL(10, 2) })
  declare standard_cost: number;

  @HasMany(() => LabOrder)
  declare lab_orders: LabOrder[];
}
