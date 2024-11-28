import { Model, DataTypes, Sequelize } from "sequelize";
import db from "."; 

class Product extends Model {
   declare id: number;
   declare enabled: boolean;
   declare name: string;
   declare slug: string;
   declare useInMenu: boolean;
   declare stock: number;
   declare description: string | null;
   declare price: number;
   declare priceWithDiscount: number;
   declare createdAt: Date;
   declare updatedAt: Date;
}

Product.init(
   {
      id: {
         type: DataTypes.INTEGER,
         allowNull: false,
         autoIncrement: true,
         primaryKey: true,
      },
      enabled: {
         type: DataTypes.BOOLEAN,
         allowNull: true,
         defaultValue: false,
      },
      name: {
         type: DataTypes.STRING,
         allowNull: false,
      },
      slug: {
         type: DataTypes.STRING,
         allowNull: false,
      },
      useInMenu: {
         type: DataTypes.BOOLEAN,
         allowNull: true,
         defaultValue: false,
      },
      stock: {
         type: DataTypes.INTEGER,
         allowNull: true,
         defaultValue: 0,
      },
      description: {
         type: DataTypes.STRING,
         allowNull: true,
      },
      price: {
         type: DataTypes.FLOAT,
         allowNull: false,
      },
      priceWithDiscount: {
         type: DataTypes.FLOAT,
         allowNull: false,
      },
      created_at: {
         type: DataTypes.DATE,
         allowNull: false,
         defaultValue: Sequelize.fn("NOW"),
      },
      updated_at: {
         type: DataTypes.DATE,
         allowNull: false,
         defaultValue: Sequelize.fn("NOW"),
      },
   },
   {
      sequelize: db,
      tableName: "product",
      underscored: true,
   }
);

export default Product;
