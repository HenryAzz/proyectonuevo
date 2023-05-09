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

enum TypeVivienda {
  CASA = "Casa",
  PH = "PH",
  DEPARTAMENTO = "Departamento",
  EDIFICIO = "Edificio",
  LOCAL = "Local",
  INDUSTRIA = "Industria",
  OFICINA = "Oficina",
  LOFT = "Loft",
  TERRENO = "Terreno",
}

@Table({ timestamps: true })
//Almacena todas las OPERACIONES
export default class Form extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    unique: true,
  })
  id!: number;

  //Mercado  Pago
  @Column({
    allowNull: true,
    type: DataType.ENUM("vender", "tasar", "rentar"),
  })
  title!: string;

  @Column({ allowNull: true })
  description!: string;

  @Column({ allowNull: true })
  picture_url!: string;

  @Column({ allowNull: true })
  unit_price!: number;

  //Datos usuario
  @Column({ allowNull: false })
  dni!: string;

  @Column({ allowNull: false })
  tel!: number;

  //Tipo de propiedad
  @Column({
    allowNull: false,
    type: DataType.ENUM("local", "industria", "vivienda", "oficina"),
  })
  type_prop!: string;

  @Column({
    type: DataType.ENUM(...Object.values(TypeVivienda)),
    allowNull: false,
  })
  type_vivienda: TypeVivienda;

  // Detalles Propiedad
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  Address: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  Number: number;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  Apartment: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  Floor: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  Location: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  province: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  postalCode: string;

  // RELACIIONAR CON USER (USUARIO)
  @ForeignKey(() => User)
  @Column
  userId!: number;

  @BelongsTo(() => User)
  user!: User;

  // RELACIONAR CON BROKER (EMPLEADO)
  @ForeignKey(() => Broker)
  @Column
  brokerId!: number;

  @BelongsTo(() => Broker)
  broker!: Broker;
}
