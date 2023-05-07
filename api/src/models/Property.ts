import {
  Model,
  Column,
  Table,
  CreatedAt,
  UpdatedAt,
  DataType,
} from "sequelize-typescript";

@Table({
  timestamps: false,
})
export class Property extends Model<Property> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id!: number;

  //Modificado tipo enum que sea vivienda, oficina, local o industria
  @Column({
    allowNull: false,
    type: DataType.ENUM("Vivienda", "Oficina", "Local", "Industria"),
  })
  type!: string;

  @Column({
    allowNull: false,
    unique: true
   })
  address!: string;

  @Column({ allowNull: true })
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
    allowNull: true,
    type: DataType.INTEGER,
  })
  floors!: number;

  @Column({
    allowNull: true,
    type: DataType.FLOAT,
  })
  covered_area!: number;

  @Column({
    allowNull: true,
    type: DataType.FLOAT,
  })
  bathroom!: number;

  @Column({
    allowNull: true,
    type: DataType.INTEGER,
  })
  bedroom!: number;

  @Column({ allowNull: true })
  furnished!: Boolean;

  @Column({ allowNull: false })
  description!: string;

  //Modificado tipo enum que sea reservado, disponible, rentado o vendido
  @Column({
    allowNull: false,
    type: DataType.ENUM("Reservado", "Disponible", "Rentado", "Vendido"),
  })
  situation!: string;

  @Column({
    allowNull: true,
    type: DataType.FLOAT,
  })
  total_area!: number;

  @Column({
    allowNull: true,
    type: DataType.FLOAT,
  })
  antiquity!: number;

  //Modificado tipo enum que sea renta o alquiler
  @Column({ allowNull: false, type: DataType.ENUM("Alquiler", "Venta") })
  operation!: string;

  @Column({ allowNull: false })
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
