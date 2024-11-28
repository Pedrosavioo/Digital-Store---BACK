import { Model, DataTypes, Sequelize } from "sequelize";
import db from ".";

class ProductCategoryOption extends Model {
   declare id: number;
   declare productId: number;
   declare categoryId: number;
   declare createdAt: Date;
   declare updatedAt: Date;
}

ProductCategoryOption.init(
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
      categoryId: {
         type: DataTypes.INTEGER,
         allowNull: false,
         references: {
            model: "category",
            key: "id",
         },
         onDelete: "CASCADE",
         onUpdate: "CASCADE",
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
      tableName: "product_category_options",
      underscored: true,
   }
);

export default ProductCategoryOption;
