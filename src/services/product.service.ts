import { Op, Transaction } from "sequelize";
import Product from "../database/models/Product";
import ProductCategoryOption from "../database/models/ProductCategoryOptions";
import ProductImage from "../database/models/ProductImage";
import ProductOption from "../database/models/ProductOptions";
import HttpResponse from "../utils/httpResponse";
import sequelize from "./../database/models/index";
import { NotFoundException } from "../utils/exception";

class ProductService {
   public async getProductID(id: number) {
      try {
         const product = (await Product.findByPk(id, {
            include: [
               {
                  model: ProductCategoryOption,
                  as: "categories",
                  attributes: ["id"],
               },
               {
                  model: ProductImage,
                  as: "images",
                  attributes: ["id", "path"],
               },
               {
                  model: ProductOption,
                  as: "options",
                  attributes: [
                     "id",
                     "title",
                     "shape",
                     "radius",
                     "type",
                     "values",
                  ],
               },
            ],
         })) as Product & {
            categories: ProductCategoryOption[];
            images: ProductImage[];
            options: ProductOption[];
         };

         if (!product) {
            throw new NotFoundException("Product with informed id not found");
         }

         const formattedProducts = {
            id: product.id,
            enabled: product.enabled,
            name: product.name,
            slug: product.slug,
            stock: product.stock,
            description: product.description,
            price: product.price,
            price_with_discount: product.priceWithDiscount,
            category_ids: product.categories.map((cat: any) => cat.id),
            images: product.images.map((image: any) => ({
               id: image.id,
               path: this.unconvertBase64(image.path),
            })),
            options: product.options.map((option: any) => ({
               ...option.dataValues,
               values: JSON.parse(option.dataValues.values || "[]"),
            })),
         };

         const response = new HttpResponse({
            status: 200,
            data: formattedProducts,
         });

         return response;
      } catch (error) {
         throw error;
      }
   }

   public async getProducts(query: any) {
      try {
         const {
            limit = 12,
            page = 1,
            fields,
            match,
            category_ids,
            "price-range": priceRange,
         } = query;

         // Configurações básicas de paginação
         const parsedLimit = parseInt(limit, 10);
         const parsedPage = parseInt(page, 10);
         const offset = (parsedPage - 1) * parsedLimit;

         // Filtros principais
         const where: any = {};

         if (match) {
            where[Op.or] = [
               { name: { [Op.like]: `%${match}%` } },
               { description: { [Op.like]: `%${match}%` } },
            ];
         }

         if (category_ids) {
            const categories = Array.isArray(category_ids)
               ? category_ids
               : category_ids.split(",").map(Number); // Divide a string e converte para números

            where["$ProductCategoryOptions.categoryId$"] = {
               [Op.in]: categories,
            };
         }

         if (priceRange) {
            const [min, max] = String(priceRange).split("-").map(Number);
            where.price = { [Op.between]: [min, max] };
         }

         // Seleção de campos
         const attributes = fields ? String(fields).split(",") : undefined;

         // Consulta no banco com associações
         const queryConfig: any = {
            where,
            attributes,
            include: [
               {
                  model: ProductImage,
                  as: "images",
                  attributes: ["id", "path"],
               },
               {
                  model: ProductOption,
                  as: "options",
               },
               {
                  model: ProductCategoryOption,
                  as: "categories",
                  attributes: ["categoryId"],
               },
            ],
         };

         if (parsedLimit !== -1) {
            queryConfig.limit = parsedLimit;
            queryConfig.offset = offset;
         }

         // Executar consulta
         const { rows: products, count: total } = await Product.findAndCountAll(
            queryConfig
         );

         // Formatar resposta
         const formattedProducts = products.map((product: any) => ({
            id: product.id,
            enabled: product.enabled,
            name: product.name,
            slug: product.slug,
            stock: product.stock,
            description: product.description,
            price: product.price,
            price_with_discount: product.priceWithDiscount,
            category_ids: product.categories.map((cat: any) => cat.categoryId),
            images: product.images.map((image: any) => ({
               id: image.id,
               path: this.unconvertBase64(image.path),
            })),
            options: product.options.map((option: any) => ({
               ...option.dataValues, // Acessa diretamente o objeto com os dados
               values: JSON.parse(option.dataValues.values),
            })),
         }));

         return {
            status: 200,
            data: formattedProducts,
            total: formattedProducts.length,
            limit: limit,
            page: page,
         };
      } catch (error) {
         throw error;
      }
   }

   public async create(data: any) {
      const t = await sequelize.transaction();

      try {
         const product = await Product.create(
            {
               enabled: data.enabled,
               name: data.name,
               slug: data.slug,
               stock: data.stock,
               description: data.description,
               price: data.price,
               priceWithDiscount: data.price_with_discount,
            },
            { transaction: t }
         );

         // 2. Associar Categorias ao Produto
         if (data.category_ids && data.category_ids.length > 0) {
            const categoryPromises = data.category_ids.map(
               (categoryId: number) =>
                  ProductCategoryOption.create(
                     {
                        productId: product.id,
                        categoryId: categoryId,
                     },
                     { transaction: t }
                  )
            );
            await Promise.all(categoryPromises);
         }

         // 3. Adicionar as Imagens ao Produto
         if (data.images && data.images.length > 0) {
            const imagePromises = data.images.map(
               (image: { type: string; content: string }) =>
                  ProductImage.create(
                     {
                        productId: product.id,
                        enabled: true,
                        path: this.convertToBase64(image.content),
                     },
                     { transaction: t }
                  )
            );
            await Promise.all(imagePromises);
         }

         // 4. Adicionar as Opções ao Produto
         if (data.options && data.options.length > 0) {
            const optionPromises = data.options.map((option: any) =>
               ProductOption.create(
                  {
                     productId: product.id,
                     title: option.title,
                     shape: option.shape,
                     radius: Number.parseInt(option.radius),
                     type: option.type,
                     values: JSON.stringify(option.value),
                  },
                  { transaction: t }
               )
            );
            await Promise.all(optionPromises);
         }

         // Commitar a transação
         await t.commit();
         const response = new HttpResponse({
            status: 201,
            message: "Product created successfully!",
         });
         return response;
      } catch (error) {
         await t.rollback();
         throw error;
      }
   }

   public async update(id: number, data: any) {
      const t = await sequelize.transaction();
      try {
         // 1. Atualizar os dados principais do produto
         const product = await Product.findByPk(id);
         if (!product) {
            throw new NotFoundException("Product with informed id not found");
         }

         await product.update(
            {
               enabled: data.enabled,
               name: data.name,
               slug: data.slug,
               stock: data.stock,
               description: data.description,
               price: data.price,
               priceWithDiscount: data.price_with_discount,
            },
            { transaction: t }
         );

         // 2. Atualizar ou remover as imagens
         if (data.images && data.images.length > 0) {
            // Remover imagens marcadas para deletar
            const deletedImages = data.images.filter(
               (image: any) => image.deleted
            );
            if (deletedImages.length > 0) {
               await ProductImage.destroy({
                  where: {
                     id: {
                        [Op.in]: deletedImages.map((image: any) => image.id),
                     },
                  },
                  transaction: t,
               });
            }

            // Adicionar ou atualizar as novas imagens
            const imagePromises = data.images
               .filter((image: any) => !image.deleted)
               .map((image: any) => {
                  if (image.id) {
                     // Atualizar imagem existente
                     return ProductImage.update(
                        { path: image.content },
                        { where: { id: image.id }, transaction: t }
                     );
                  } else {
                     // Adicionar nova imagem
                     return ProductImage.create(
                        {
                           productId: id,
                           enabled: true,
                           path: this.convertToBase64(image.content),
                        },
                        { transaction: t }
                     );
                  }
               });
            await Promise.all(imagePromises);
         }

         // 3. Atualizar ou remover as opções
         if (data.options && data.options.length > 0) {
            const optionPromises: Promise<any>[] = [];

            // Remover opções marcadas para deletar
            const deletedOptions = data.options.filter(
               (option: any) => option.deleted
            );
            if (deletedOptions.length > 0) {
               optionPromises.push(
                  ProductOption.destroy({
                     where: {
                        id: {
                           [Op.in]: deletedOptions.map(
                              (option: any) => option.id
                           ),
                        },
                     },
                     transaction: t,
                  })
               );
            }

            // Adicionar ou atualizar as opções
            const newOptions = data.options.filter(
               (option: any) => !option.deleted
            );
            for (let option of newOptions) {
               if (option.id) {
                  // Atualizar opção existente
                  optionPromises.push(
                     ProductOption.update(
                        {
                           title: option.title,
                           shape: option.shape,
                           radius: option.radius,
                           type: option.type,
                           values: JSON.stringify(option.values),
                        },
                        {
                           where: { id: option.id, productId: id },
                           transaction: t,
                        }
                     )
                  );
               } else {
                  // Adicionar nova opção
                  optionPromises.push(
                     ProductOption.create(
                        {
                           productId: id,
                           title: option.title,
                           shape: option.shape,
                           radius: Number.parseInt(option.radius),
                           type: option.type,
                           values: JSON.stringify(option.values),
                        },
                        { transaction: t }
                     )
                  );
               }
            }
            await Promise.all(optionPromises);
         }

         // 4. Atualizar as categorias associadas
         if (data.category_ids && data.category_ids.length > 0) {
            // Remover categorias antigas
            await ProductCategoryOption.destroy({
               where: { productId: id },
               transaction: t,
            });

            // Adicionar as novas categorias
            const categoryPromises = data.category_ids.map(
               (categoryId: number) =>
                  ProductCategoryOption.create(
                     { productId: id, categoryId: categoryId },
                     { transaction: t }
                  )
            );
            await Promise.all(categoryPromises);
         }

         // Commitar a transação
         await t.commit();

         const response = new HttpResponse({
            status: 200,
            message: "Product update successfully!",
         });
         return response;
      } catch (error) {
         await t.rollback();
         throw error;
      }
   }

   public async delete(id: number) {
      try {
         const numbersProductsDeleted = await Product.destroy({
            where: {
               id: id,
            },
         });

         if (numbersProductsDeleted === 0) {
            throw new NotFoundException("Product with informed id not found");
         }
      } catch (error) {
         throw error;
      }
   }

   private convertToBase64(data: string): string {
      return btoa(data);
   }

   private unconvertBase64(data: string): string {
      return atob(data);
   }
}

export default ProductService;
