import { Model, DataTypes, Sequelize } from "sequelize";
import db from ".";

class ProductOption extends Model {
   declare id: number;
   declare productId: number;
   declare title: string;
   declare shape: "square" | "circle";
   declare radius: number;
   declare type: "text" | "color";
   declare values: string;
   declare createdAt: Date;
   declare updatedAt: Date;
}

ProductOption.init(
   {
      id: {
         type: DataTypes.INTEGER,
         allowNull: false,
         autoIncrement: true,
         primaryKey: true,
      },
      productId: {
         type: DataTypes.INTEGER,
         allowNull: false,
         references: {
            model: "product",
            key: "id",
         },
         onDelete: "CASCADE",
         onUpdate: "CASCADE",
      },
      title: {
         type: DataTypes.STRING,
         allowNull: false,
      },
      shape: {
         type: DataTypes.ENUM("square", "circle"),
         allowNull: true,
         defaultValue: "square",
      },
      radius: {
         type: DataTypes.INTEGER,
         allowNull: true,
         defaultValue: 0,
      },
      type: {
         type: DataTypes.ENUM("text", "color"),
         allowNull: true,
         defaultValue: "text",
      },
      values: {
         type: DataTypes.STRING,
         allowNull: false,
      },
      createdAt: {
         type: DataTypes.DATE,
         allowNull: false,
         defaultValue: Sequelize.fn("NOW"),
      },
      updatedAt: {
         type: DataTypes.DATE,
         allowNull: false,
         defaultValue: Sequelize.fn("NOW"),
      },
   },
   {
      sequelize: db,
      tableName: "product_options",
      underscored: true,
   }
);

export default ProductOption;
