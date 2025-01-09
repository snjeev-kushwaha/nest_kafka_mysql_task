import { Table, Column, Model, DataType } from "sequelize-typescript";

@Table({ tableName: "products" })
export class Product extends Model<Product> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  description: string;

  @Column({
    type: DataType.FLOAT,
    allowNull: false,
  })
  stock: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  status: string;
}
