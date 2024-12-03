import { Model } from "sequelize";
import db from ".";
import sequelize from "sequelize";

class User extends Model {
   declare id: number;
   declare firstname: string;
   declare surname: string;
   declare email: string;
   declare password: string;
   declare createdAt: Date;
   declare updatedAt: Date;
}

User.init(
   {
      id: {
         type: sequelize.INTEGER,
         allowNull: false,
         autoIncrement: true,
         primaryKey: true,
      },
      firstname: {
         type: sequelize.STRING,
         allowNull: false,
      },
      surname: {
         type: sequelize.STRING,
         allowNull: false,
      },
      email: {
         type: sequelize.STRING,
         allowNull: false,
         unique: true,
      },
      password: {
         type: sequelize.STRING,
         allowNull: false,
      },
      createdAt: {
         type: sequelize.DATE,
         allowNull: false,
         defaultValue: sequelize.fn("NOW"),
      },
      updatedAt: {
         type: sequelize.DATE,
         allowNull: false,
         defaultValue: sequelize.fn("NOW"),
      },
   },
   {
      sequelize: db,
      tableName: "users",
      underscored: true,
   }
);

export default User;
