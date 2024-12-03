import Category from "../database/models/Category";
import { ICategory } from "../interfaces/interface";
import { NotFoundException } from "../utils/exception";
import HttpResponse from "../utils/httpResponse";

class CategoryService {
   public async getCategories(queryParams: any) {
      try {
         const { limit = 12, page = 1, fields, use_in_menu } = queryParams;

         const whereCondition: any = {};
         if (use_in_menu) {
            whereCondition.use_in_menu = use_in_menu === "true";
         }

         const selectedFields = fields ? fields.split(",") : null;

         if (Number(limit) === -1) {
            const categories = await Category.findAll({
               where: whereCondition,
               attributes: selectedFields || undefined,
            });

            return {
               status: 200,
               data: categories,
               total: categories.length,
               limit: -1,
               page: 1,
            };
         }

         const offset = (page - 1) * limit;
         const { rows, count } = await Category.findAndCountAll({
            where: whereCondition,
            attributes: selectedFields || undefined,
            limit: Number(limit),
            offset: Number(offset),
         });

         return {
            status: 200,
            data: rows,
            total: count,
            limit: Number(limit),
            page: Number(page),
         };
      } catch (error) {
         throw error;
      }
   }

   public async getByID(categoryID: number) {
      try {
         const category = await Category.findOne({
            where: {
               id: categoryID,
            },
         });

         if (!category) {
            throw new NotFoundException("Category with informed id not found");
         }

         const categoryInfo: ICategory = {
            name: category.name,
            slug: category.slug,
            use_in_menu: category.useInMenu,
         };

         const response = new HttpResponse({ status: 200, data: categoryInfo });
         return response;
      } catch (error) {
         throw error;
      }
   }

   public async create(category_data: ICategory) {
      try {
         await Category.create({
            name: category_data.name,
            slug: category_data.slug,
            useInMenu: category_data.use_in_menu,
         });

         const response = new HttpResponse({
            status: 201,
            data: category_data,
            message: "Category created successfully",
         });

         return response;
      } catch (error) {
         throw error;
      }
   }

   public async update(
      categoryID: number,
      newCategoryInfo: Partial<ICategory>
   ) {
      try {
         const searchCategoryByID = await Category.findOne({
            where: {
               id: categoryID,
            },
         });

         if (!searchCategoryByID) {
            throw new NotFoundException("Category with informed id not found");
         }

         const CategoryUpdate: ICategory = {
            name: newCategoryInfo.name || searchCategoryByID.name,
            slug: newCategoryInfo.slug || searchCategoryByID.slug,
            use_in_menu:
               newCategoryInfo.use_in_menu || searchCategoryByID.useInMenu,
         };

         const [affectedRows] = await Category.update(
            { ...CategoryUpdate },
            {
               where: { id: categoryID },
               returning: true,
            }
         );

         console.log(`rows affected: ${affectedRows}`);

         const CategoryUpdated = await Category.findOne({
            where: {
               id: categoryID,
            },
         });

         const response = new HttpResponse({
            status: 200,
            data: CategoryUpdated as Category,
            message: "Category updated successfully!",
         });

         return response;
      } catch (error) {
         throw error;
      }
   }

   public async delete(categoryID: number) {
      try {
         const NumberCategoryDeleted = await Category.destroy({
            where: {
               id: categoryID,
            },
         });

         if (NumberCategoryDeleted === 0) {
            throw new NotFoundException(
               "Error deleting caterory, category not found"
            );
         }
      } catch (error) {
         throw error;
      }
   }
}

export default CategoryService;
