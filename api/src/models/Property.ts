import { Model, Column, Table, CreatedAt, UpdatedAt, DataType } from "sequelize-typescript";

@Table({
  timestamps: false,
})
export class Property extends Model<Property> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    unique: true,
  })
  id!: number;

  @Column({allowNull: false})
    type!: string;

  @Column({allowNull: false})
  address!: string;

  @Column({allowNull: false})
  spaces!: number;

  @Column({
    allowNull: false,
    type: DataType.FLOAT,
  })
  price!: number;

  @Column({
    allowNull: false,
    type: DataType.ARRAY(DataType.JSON),
  })
  pictures!: object;

  @Column({
    allowNull: false,
    type: DataType.INTEGER,
  })
  floors!: number;

  @Column({
    allowNull: false,
    type: DataType.FLOAT,
  })
  covered_area!: number;

  @Column({
    allowNull: false,
    type: DataType.FLOAT,
  })
  bathroom!: number;

  @Column({
    allowNull: false,
    type: DataType.INTEGER,
  })
  bedroom!: number;

  @Column({allowNull: false})
  furnished!: Boolean;

  @Column({allowNull: false})
  description!: string;

 

  @Column({allowNull: false})
  situation!: string;

  @Column({
    allowNull: false,
    type: DataType.FLOAT,
  })
  total_area!: number;

  @Column({
    allowNull: false,
    type: DataType.FLOAT,
  })
  antiquity!: number;

  @Column({allowNull: false})
  operation!: string;

  @Column({allowNull: false})
  owner!: string;
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
