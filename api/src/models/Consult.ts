import {
  Model,
  Column,
  Table,
  CreatedAt,
  DataType,
  BelongsTo,
  ForeignKey,
} from "sequelize-typescript";
import { User } from "./User";

@Table
export class Consult extends Model<Consult> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    unique: true,
  })
  id!: number;

  //Asunto de la consulta
  @Column({ allowNull: false })
  issue!: string;

  @Column({ allowNull: false })
  description!: string;

  // RELACIONAR CON USER (CLIENTE)
  @ForeignKey(() => User)
  @Column
  userId!: number;

  @BelongsTo(() => User)
  user!: User;
}
