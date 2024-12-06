import { NextFunction, Request, Response } from "express";
import ProductService from "../services/product.service";
import {
   IProduct,
   IProductImages,
   IProductOptions,
} from "../interfaces/interface";
import { z } from "zod";

class ProductController {
   private service;

   constructor() {
      this.service = new ProductService();
   }

   public async getproductID(req: Request, res: Response, next: NextFunction) {
      try {
         const id = Number(req.params.id);
         const response = await this.service.getProductID(id);
         res.status(200).json(response);
      } catch (error) {
         next(error);
      }
   }

   public async getProducts(req: Request, res: Response, next: NextFunction) {
      try {
         const query = this.validateQueryString(req.query);
         const result = await this.service.getProducts(query);
         res.status(200).json(result);
      } catch (error) {
         next(error);
      }
   }

   public async create(req: Request, res: Response, next: NextFunction) {
      try {
         const {
            enabled,
            name,
            slug,
            stock,
            description,
            price,
            price_with_discount,
            category_ids,
            images,
            options,
         } = req.body;

         // validations
         this.validateInfoProducts({
            enabled,
            description,
            name,
            price,
            price_with_discount,
            slug,
            stock,
         });
         this.validateICategoriesID(category_ids);
         this.validateInfoImages(images);
         this.validateInfoOptions(options);

         // service create product
         const result = await this.service.create({
            enabled,
            name,
            slug,
            stock,
            description,
            price,
            price_with_discount,
            category_ids,
            images,
            options,
         });

         res.status(201).json(result);
      } catch (error) {
         next(error);
      }
   }

   public async update(req: Request, res: Response, next: NextFunction) {
      try {
         const id = Number(req.params.id);
         const data = req.body;

         const result = await this.service.update(id, data);

         res.status(200).json(result);
      } catch (error) {
         next(error);
      }
   }

   public async delete(req: Request, res: Response, next: NextFunction) {
      try {
         const id = Number(req.params.id);
         await this.service.delete(id);
         res.status(204).send("");
      } catch (error) {
         next(error);
      }
   }

   private validateInfoProducts(data: IProduct) {
      const schema = z.object({
         enabled: z.boolean({ message: "enabled is required" }),
         name: z.string({ message: "name is required" }),
         slug: z.string({ message: "slug is required" }),
         stock: z.number({ message: "stock is require" }),
         description: z.string({ message: "description is required" }),
         price: z.number({ message: "price is require" }),
         price_with_discount: z.number({
            message: "price_with_discount is require",
         }),
      });

      schema.parse(data);
   }

   private validateICategoriesID(data: string[]) {
      const schema = z.array(z.number());

      schema.parse(data);
   }

   private validateInfoImages(data: IProductImages[]) {
      const schema = z.object({
         type: z.string({ message: "type is required" }),
         content: z.string({ message: "content is required" }),
      });

      const schemaArray = z.array(schema);

      schemaArray.parse(data);
   }

   private validateInfoOptions(data: IProductOptions[]) {
      const schema = z.object({
         title: z.string({ message: "title is required" }),
         shape: z.string({ message: "shape is required" }),
         radius: z.string({ message: "radius is required" }),
         type: z.string({ message: "type is required" }),
         value: z.array(z.string({ message: "value is required type string" })),
      });

      const schemaArray = z.array(schema);

      schemaArray.parse(data);
   }

   private validateQueryString(query: any) {
      const productQuerySchema = z.object({
         limit: z
            .string()
            .optional()
            .default("12")
            .transform((val) => {
               const parsed = parseInt(val, 10);
               if (isNaN(parsed) || parsed < -1)
                  throw new Error("Limit must be -1 or a positive integer");
               return parsed;
            }),
         page: z
            .string()
            .optional()
            .default("1")
            .transform((val) => {
               const parsed = parseInt(val, 10);
               if (isNaN(parsed) || parsed < 1)
                  throw new Error("Page must be a positive integer");
               return parsed;
            }),
         fields: z
            .string()
            .optional()
            .transform((val) => (val ? val.split(",") : undefined)),
         match: z.string().optional(),
         category_ids: z
            .string()
            .optional()
            .transform((val) =>
               val ? val.split(",").map((id) => parseInt(id, 10)) : undefined
            ),
         "price-range": z
            .string()
            .optional()
            .refine(
               (val) => !val || /^\d+-\d+$/.test(val),
               "Price range must be in the format 'min-max'"
            )
            .transform((val) => {
               if (!val) return undefined;
               const [min, max] = val.split("-").map((v) => parseFloat(v));
               return { min, max };
            }),
      });

      return productQuerySchema.parse(query);
   }
}

export default ProductController;
