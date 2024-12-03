import { Model, DataTypes, Sequelize } from "sequelize";
import db from ".";

class Category extends Model {
   declare id: number;
   declare name: string;
   declare slug: string;
   declare useInMenu: boolean;
   declare createdAt: Date;
   declare updatedAt: Date;
}

Category.init(
   {
      id: {
         type: DataTypes.INTEGER,
         allowNull: false,
         autoIncrement: true,
         primaryKey: true,
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
         defaultValue: false, // Valor padrão
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
      tableName: "category", 
      underscored: true,
   }
);

export default Category;
