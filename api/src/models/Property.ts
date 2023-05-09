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

  //Modificado tipo enum que sea vivienda, oficina, local o industria
  @Column({
    allowNull: false,
    type: DataType.ENUM("Vivienda", "Oficina", "Local", "Industria"),
  })
  type!: string;

  @Column({ allowNull: false })
  address!: string;

  @Column({ allowNull: false })
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

  @Column({ allowNull: false })
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
    allowNull: false,
    type: DataType.FLOAT,
  })
  total_area!: number;

  @Column({
    allowNull: false,
    type: DataType.FLOAT,
  })
  antiquity!: number;

  //Modificado tipo enum que sea renta o alquiler
  @Column({ allowNull: false, type: DataType.ENUM("Alquiler", "Venta") })
  operation!: string;

  @Column({ allowNull: false })
  owner!: string;
}

// "type": "Vivienda",
// "address": "UJUY AV. al 1700 103",
// "spaces": 2,
// "price": 84.0,
// "pictures":[
//     {"img":"https://static.tokkobroker.com/water_pics/61473490849556420478476952427662215243829091586321796539503166833583826460719.jpg"}]
// ,
// "floors": 10,
// "covered_area": 37,
// "bathroom": 1.5,
// "bedroom": 1,
// "furnished": true,
// "description": "DPTO. 2 AMBIENTES, CFTE., BALCON,  APTO PROFESIONAL, AMENITIES, A ESTRENAR, ENTREGA INMEDIATA!",
// "situation": "Disponible",
// "total_area": 40,
// "antiquity": 1,
// "operation": "Venta",
// "owner": "Schiaffino"
// },
