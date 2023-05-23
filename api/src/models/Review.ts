import { Model, Table, Column, DataType, BelongsTo, ForeignKey, CreatedAt, UpdatedAt } from "sequelize-typescript";
import { Broker } from "./Broker";

@Table
//Crea review
export class Review extends Model<Review> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id!: number;

  @Column({type: DataType.STRING, allowNull: false,})
  target!: string;

  @Column({type: DataType.INTEGER, allowNull: false,})
  grade!: number;

  @Column({ type: DataType.TEXT, allowNull: false, })
  message!: string;

  // RELACIIONAR CON BROKER (EMPLEADO)
  @ForeignKey(() => Broker)
  @Column
  brokerId!: number;
  @BelongsTo(() => Broker)
  broker!: Broker;
}
