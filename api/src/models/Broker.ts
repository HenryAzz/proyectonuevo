import {
  Model,
  Column,
  Table,
  CreatedAt,
  UpdatedAt,
  DataType,
  HasMany,
} from "sequelize-typescript";
import Form from "./Form";

@Table({
  timestamps: false,
})
export class Broker extends Model<Broker> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    allowNull: false,
    unique: true,
  })
  id!: number;

  //Modificado tipo enum que sea admin o broker
  @Column({ allowNull: false, type: DataType.ENUM("Admin", "Broker") })
  rol!: string;
  @Column({ allowNull: false, type: DataType.ENUM("Local", "Vivienda", "Oficina", "Industria") })
  division!: string;

  @Column({ allowNull: false })
  email!: string;

  @Column({ allowNull: false })
  password!: string;

  @Column({ allowNull: false })
  name!: string;

  //agrego imagen por defecto de avatar para admin o broker
  @Column({
    allowNull: false,
    defaultValue: "https://i.pinimg.com/originals/43/b6/17/43b617c260ae06d6ab6318176f20be50.png",
  })
  avatar!: string;
  @HasMany(() => Form)
  properties!: Form[];
}

// //ejemplo:
// @Table
// export class User extends Model<User> {
//  @Column
//  name!: string;

//  @Column
//  lastName!: string;

//  @CreatedAt
//  @Column
//  createdAt!: Date;

//  @UpdatedAt
//  @Column
//  updatedAt!: Date;
// }
// @Column({//aca irian nuestros atributos}) Asi mismo, tambien dentro de la clase deberiamos generar nuestras relaciones! No en un archivo afuera, te invito a que leas la documentacion de sequelize-typescript para que veas como se hace! Es muy sencillo.
