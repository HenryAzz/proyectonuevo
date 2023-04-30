import { Model, Column, Table, CreatedAt, UpdatedAt, DataType } from "sequelize-typescript";

@Table({
  timestamps: false,
})
export class User extends Model<User> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    unique: true,
  })
  id!: number;
  @Column({allowNull: false})
  rol!: string;
  @Column({allowNull: false})
  email!: string;
  @Column({allowNull: false})
  password!: string;
  @Column({allowNull: false})
  person_type!: string;
  @Column({allowNull: false})
  name!: string;
  @Column({allowNull: false})
  avatar!: string;
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
