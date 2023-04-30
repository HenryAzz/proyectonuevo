import {
  Model,
  Column,
  Table,
  CreatedAt,
  UpdatedAt,
  DataType,
  BelongsTo,
  ForeignKey,
  HasOne,
  HasMany,
} from "sequelize-typescript";
import { Property } from "./Property";
import { Broker } from "./Broker";
import { User } from "./User";

@Table
export class Signal extends Model<Signal> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    unique: true,
  })
  id!: number;
  @Column({allowNull: false,})
  operation!: string;
  @Column({allowNull: false,})
  status!: string;
  @Column({allowNull: false,})
  documentation!: string;

  // RELACIIONAR CON PROPERTY (PROPIEDAD)
  @ForeignKey(() => Property)
  @Column
  propertyId!: number;

  @BelongsTo(() => Property)
  property!: Property;

  // RELACIIONAR CON BROKER (EMPLEADO)
  @ForeignKey(() => Broker)
  @Column
  brokerId!: number;

  @BelongsTo(() => Broker)
  broker!: Broker;

  // RELACIONAR CON USER (CLIENTE)
  @ForeignKey(() => User)
  @Column
  userId!: number;

  @BelongsTo(() => User)
  user!: User;
}

// //ejemplo:
// @Table
// export class User extends Model<User> {
//  @Column
//  name!: string;

//  @Column
//  lastName!: string;


//  @UpdatedAt
//  @Column
//  updatedAt!: Date;
// }
// @Column({//aca irian nuestros atributos}) Asi mismo, tambien dentro de la clase deberiamos generar nuestras relaciones! No en un archivo afuera, te invito a que leas la documentacion de sequelize-typescript para que veas como se hace! Es muy sencillo.
