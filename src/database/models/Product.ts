import { Model, DataTypes, Sequelize } from "sequelize";
import db from "."; 
import ProductImage from "./ProductImage";
import ProductOption from "./ProductOptions";
import ProductCategoryOption from "./ProductCategoryOptions";

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
      tableName: "product",
      underscored: true,
   }
);

Product.hasMany(ProductImage, { foreignKey: 'productId', as: 'images' });
Product.hasMany(ProductOption, { foreignKey: 'productId', as: 'options' });
Product.hasMany(ProductCategoryOption, { foreignKey: 'productId', as: 'categories' });

export default Product;
