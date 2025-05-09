import { Table, Column, Model, DataType, HasOne } from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";
import { Staff } from "src/staffs/models/staff.model";
import { Patient } from "src/patients/models/patient.model";

export interface IUserCreationAttr {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  role: "patient" | "staff";
  photo: string;
}

@Table({ tableName: "users" })
export class User extends Model<User, IUserCreationAttr> {
  @ApiProperty({ example: 1, description: "Foydalanuvchi IDsi" })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @ApiProperty({ example: "John", description: "Foydalanuvchi ismi" })
  @Column({ type: DataType.STRING, allowNull: false })
  declare first_name: string;

  @ApiProperty({ example: "Doe", description: "Foydalanuvchi familiyasi" })
  @Column({ type: DataType.STRING, allowNull: false })
  declare last_name: string;

  @ApiProperty({
    example: "john.doe@example.com",
    description: "Foydalanuvchi emaili",
  })
  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  declare email: string;

  @ApiProperty({
    example: "hashedpassword123",
    description: "Foydalanuvchi paroli (hashed)",
  })
  @Column({ type: DataType.STRING, allowNull: false })
  declare password: string;

  @ApiProperty({ example: "patient", description: "Foydalanuvchi roli" })
  @Column({ type: DataType.ENUM("patient", "staff"), allowNull: false })
  declare role: "patient" | "staff";

  @ApiProperty({ example: "refresh_token", description: "Refresh token" })
  @Column({ type: DataType.STRING, allowNull: true })
  declare refresh_token: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare photo: string;

  @HasOne(() => Staff)
  declare staff: Staff;

  @HasOne(() => Patient)
  declare patient: Patient;
}
