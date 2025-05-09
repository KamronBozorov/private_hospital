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
import { LabTest } from "../../labtests/models/labtest.models";

export interface ILabOrderCreationAttr {
  visit_id: number;
  test_id: number;
  order_date: Date;
  result_date: Date;
}

@Table({ tableName: "lab_orders" })
export class LabOrder extends Model<LabOrder, ILabOrderCreationAttr> {
  @ApiProperty({ example: 1, description: "Laboratoriya buyurtma IDsi" })
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
  @ForeignKey(() => LabTest)
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare test_id: number;

  @ApiProperty({ example: "2025-05-10" })
  @Column({ type: DataType.DATE })
  declare order_date: Date;

  @ApiProperty({ example: "2025-05-12" })
  @Column({ type: DataType.DATE })
  declare result_date: Date;

  @BelongsTo(() => Visit)
  declare visit: Visit;

  @BelongsTo(() => LabTest)
  declare labTest: LabTest;
}
