import { Model, DataTypes, Sequelize } from "sequelize";
import db from ".";

class ProductImage extends Model {
   declare id: number;
   declare productId: number;
   declare enabled: boolean;
   declare path: string;
   declare createdAt: Date;
   declare updatedAt: Date;
}

ProductImage.init(
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
      enabled: {
         type: DataTypes.BOOLEAN,
         allowNull: true,
         defaultValue: false,
      },
      path: {
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
      tableName: "product_images",
      underscored: true,
   }
);

export default ProductImage;
