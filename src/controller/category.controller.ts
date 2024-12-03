import { NextFunction, Request, Response } from "express";
import CategoryService from "../services/category.service";
import { ICategory } from "../interfaces/interface";
import { boolean, string, z } from "zod";

class CategoryController {
   private service;

   constructor() {
      this.service = new CategoryService();
   }

   public async getCategories(req: Request, res: Response, next: NextFunction) {
      try {
         const queryParams = req.query;
         const result = await this.service.getCategories(queryParams);
         res.status(200).json(result);
      } catch (error) {
         next(error);
      }
   }

   public async getCategoryID(req: Request, res: Response, next: NextFunction) {
      try {
         const categoryID = Number(req.params.id);
         const response = await this.service.getByID(categoryID);
         res.status(200).json(response);
      } catch (error) {
         next(error);
      }
   }

   public async create(req: Request, res: Response, next: NextFunction) {
      try {
         const category_info: ICategory = req.body;
         this.validateInfo(category_info);
         const response = await this.service.create(category_info);
         res.status(201).json(response);
      } catch (error) {
         next(error);
      }
   }

   public async update(req: Request, res: Response, next: NextFunction) {
      try {
         const categoryInfo = req.body;
         const categoryID = Number(req.params.id);

         this.validateInfo(categoryInfo, true);

         const response = await this.service.update(categoryID, categoryInfo);

         res.status(200).json(response);
      } catch (error) {
         next(error);
      }
   }

   public async delete(req: Request, res: Response, next: NextFunction) {
      try {
         const categoryID = Number(req.params.id);
         await this.service.delete(categoryID);
         res.status(204).send("");
      } catch (error) {
         next(error);
      }
   }

   private validateInfo(data: ICategory, partial?: true) {
      const schema = z.object({
         name: string({ message: "name required" }),
         slug: string({ message: "slug required" }),
         use_in_menu: boolean({ message: "use in menu required" }),
      });

      if (!partial) {
         schema.parse(data);
      }

      if (partial) {
         const schemaPartial = schema.partial();
         schemaPartial.parse(data);
      }
   }
}

export default CategoryController;
