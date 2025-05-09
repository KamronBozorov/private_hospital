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
import { User } from "src/users/models/user.model";
import { Visit } from "src/visits/models/visit.model";
import { Bill } from "src/bills/models/bill.model";

export interface IPatientCreationAttr {
  gender: string;
  contact_number: string;
  address: string;
  emergency_contact: string;
}

@Table({ tableName: "patients" })
export class Patient extends Model<Patient, IPatientCreationAttr> {
  @ApiProperty({ example: 1, description: "User ID (asosiy kalit)" })
  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    allowNull: false,
  })
  declare user_id: number;

  @BelongsTo(() => User, { onDelete: "CASCADE" })
  declare user: User;

  @ApiProperty({ example: "male", description: "Jinsi (male, female)" })
  @Column({ type: DataType.ENUM("male", "female"), allowNull: false })
  declare gender: string;

  @ApiProperty({ example: "+998901234567" })
  @Column({ type: DataType.STRING, allowNull: false })
  declare contact_number: string;

  @ApiProperty({ example: "Toshkent sh., Chilanzar tumani" })
  @Column({ type: DataType.STRING })
  declare address: string;

  @ApiProperty({ example: "+998901234568" })
  @Column({ type: DataType.STRING })
  declare emergency_contact: string;

  @Column({ type: DataType.STRING, defaultValue: DataType.UUIDV4() })
  declare activation_link: string;

  @ApiProperty({ example: true, description: "Bemor aktivligi" })
  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  declare is_active: boolean;

  @HasMany(() => Visit)
  declare visits: Visit[];

  @HasMany(() => Bill)
  declare bills: Bill[];
}
