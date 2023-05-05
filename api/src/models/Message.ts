import { Model, Table, Column, DataType } from "sequelize-typescript";

@Table({ timestamps: true })
//Crea mensaje
export default class Mensaje extends Model {
  @Column({ type: DataType.TEXT, allowNull: false })
  mensaje!: string;
  //Hora del mensaje
  @Column({ type: DataType.DATE, allowNull: false })
  timestamp!: Date;
}
