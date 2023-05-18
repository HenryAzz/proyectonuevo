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
  CASA = "casa",
  PH = "ph",
  DEPARTAMENTO = "departamento",
  EDIFICIO = "edificio",
  LOCAL = "local",
  INDUSTRIA = "industria",
  OFICINA = "oficina",
  LOFT = "loft",
  TERRENO = "terreno",
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

  @Column({ allowNull: true, type: DataType.ARRAY(DataType.JSON) })
  picture_url!: object;

  @Column({ type: DataType.INTEGER, allowNull: true })
  unit_price!: number;

  //Datos usuario
  @Column({ type: DataType.INTEGER, allowNull: false, unique: true })
  dni!: number;

  @Column({ type: DataType.INTEGER, allowNull: false })
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
  type_vivienda!: TypeVivienda;

  // Detalles Propiedad
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  address!: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  number!: number;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  apartment!: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  floor!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  location!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  province!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  postalCode!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  preferenceIdMP!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  payed!: string;

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
