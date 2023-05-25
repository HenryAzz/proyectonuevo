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
import { User } from "./User";

@Table
export class Favorites extends Model<Favorites> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    unique: true,
  })
  id!: number;

  // RELACIIONAR CON PROPERTY (PROPIEDAD)
  @ForeignKey(() => Property)
  @Column
  propertyId!: number;

  @BelongsTo(() => Property)
  property!: Property;

  // RELACIONAR CON USER (CLIENTE)
  @ForeignKey(() => User)
  @Column
  userId!: number;

  @BelongsTo(() => User)
  user!: User;
}