import dotenv from "dotenv";
import axios from "axios";

const port = process.env.PORT || 3001;

const axiosInstance = axios.create({
   baseURL: `http://localhost:${port}/v1`,
   headers: {
      "Content-Type": "application/json",
   },
   withCredentials: true,
});

function extractToken(responseHttp: any): string {
   // Captura o cookie do token
   const setCookieHeader = responseHttp.headers["set-cookie"];
   if (setCookieHeader) {
      // Extrai o valor do token
      const tokenCookie = setCookieHeader.find((cookie: any) =>
         cookie.startsWith("token=")
      );
      const token = tokenCookie?.split(";")[0].split("=")[1];

      return token;
   } else {
      throw new Error("No cookie found in response header");
   }
}

describe("Product Routes", () => {
   /* 
   ||====================||
   ||  GET /product:id  ||
   ||====================||
   */
   it("Should return product information and status 200 when passing id parameter", async () => {
      try {
         const responseLogin = await axiosInstance.post("/login", {
            email: "psavio@gmail.com",
            password: "senha12345",
         });

         const token = extractToken(responseLogin);

         // Verifica se o token foi capturado corretamente
         expect(token).toBeDefined();

         // Verifica o status da resposta
         expect(responseLogin.status).toBe(200);

         const response = await axiosInstance.get("/product/1", {
            headers: {
               Cookie: `token=${token}`,
            },
         });

         expect(response.status).toBe(200);
         expect(response.data.data).toEqual({
            id: 1,
            enabled: true,
            name: "Camiseta Básica",
            slug: "camiseta-basica",
            stock: 100,
            description: "Camiseta de algodão, modelo básico.",
            price: 49.9,
            price_with_discount: 39.9,
            category_ids: [1],
            images: [
               {
                  id: 1,
                  path: "src/image1.png",
               },
            ],
            options: [
               {
                  id: 1,
                  title: "Cor",
                  shape: "square",
                  radius: 4,
                  type: "text",
                  values: ["PP", "GG", "M"],
               },
            ],
         });
      } catch (error) {
         console.log(error);
      }
   });
   it("Should return status 404 when product is not found", async () => {
      try {
         const responseLogin = await axiosInstance.post("/login", {
            email: "psavio@gmail.com",
            password: "senha12345",
         });

         const token = extractToken(responseLogin);

         // Verifica se o token foi capturado corretamente
         expect(token).toBeDefined();

         // Verifica o status da resposta
         expect(responseLogin.status).toBe(200);

         const response = await axiosInstance.get("/product/30", {
            headers: {
               Cookie: `token=${token}`,
            },
         });
      } catch (error: any) {
         expect(error.status).toBe(404);
      }
   });
   /* 
   ||=================================||
   ||  GET /product/search?limit=-1  ||
   ||=================================||
   */
   it("Should return status 200 and all products when limit is set to -1, ignoring pagination", async () => {
      try {
         const responseLogin = await axiosInstance.post("/login", {
            email: "psavio@gmail.com",
            password: "senha12345",
         });

         const token = extractToken(responseLogin);

         // Verifica se o token foi capturado corretamente
         expect(token).toBeDefined();

         // Verifica o status da resposta
         expect(responseLogin.status).toBe(200);

         const response = await axiosInstance.get("/product/search?limit=-1", {
            headers: {
               Cookie: `token=${token}`,
            },
         });

         expect(response.status).toBe(200);
         expect(response.data.limit).toEqual(-1);
      } catch (error) {
         console.log(error);
      }
   });
   /* 
   ||==================||
   ||  POST /product   ||
   ||==================||
   */
   it("Should return status 201 when the request data is incorrect", async () => {
      try {
         const responseLogin = await axiosInstance.post("/login", {
            email: "psavio@gmail.com",
            password: "senha12345",
         });

         const token = extractToken(responseLogin);

         // Verifica se o token foi capturado corretamente
         expect(token).toBeDefined();

         // Verifica o status da resposta
         expect(responseLogin.status).toBe(200);

         const response = await axiosInstance.post(
            "/product",
            {
               enabled: true,
               name: "Produto 2",
               slug: "produto-2",
               stock: 10,
               description: "Descrição do produto 2",
               price: 119.9,
               price_with_discount: 99.9,
               category_ids: [2],
               images: [
                  {
                     type: "image/png",
                     content: "src/image.png",
                  },
                  {
                     type: "image/png",
                     content: "src/image.png",
                  },
                  {
                     type: "image/jpg",
                     content: "src/image.png",
                  },
               ],
               options: [
                  {
                     title: "Cor",
                     shape: "square",
                     radius: "4px",
                     type: "text",
                     value: ["PP", "GG", "M"],
                  },
                  {
                     title: "Tamanho",
                     shape: "circle",
                     radius: "4px",
                     type: "color",
                     value: ["#000", "#333"],
                  },
               ],
            },
            {
               headers: {
                  Cookie: `token=${token}`,
               },
            }
         );

         expect(response.status).toBe(201);
         expect(response.data.message).toBe("Product created successfully!");
      } catch (error) {
         console.log(error);
      }
   });
   it("Should return status 400 when trying to update user other than the logged in user", async () => {
      try {
         const responseLogin = await axiosInstance.post("/login", {
            email: "psavio@gmail.com",
            password: "senha12345",
         });

         const token = extractToken(responseLogin);

         // Verifica se o token foi capturado corretamente
         expect(token).toBeDefined();

         // Verifica o status da resposta
         expect(responseLogin.status).toBe(200);

         const response = await axiosInstance.post(
            "/product",
            {
               name: "Shoes",
               slug: 3,
               use_in_menu: true,
            },
            {
               headers: {
                  Cookie: `token=${token}`,
               },
            }
         );
      } catch (error: any) {
         expect(error.status).toBe(400);
      }
   });
   it("Should return status 401 when authorization token is not sent or is incorrect", async () => {
      try {
         const responseLogin = await axiosInstance.post("/login", {
            email: "psavio@gmail.com",
            password: "senha12345",
         });

         const token = extractToken(responseLogin);

         // Verifica se o token foi capturado corretamente
         expect(token).toBeDefined();

         // Verifica o status da resposta
         expect(responseLogin.status).toBe(200);

         const response = await axiosInstance.post(
            "/category",
            {
               name: "Shoes",
               slug: "shoes",
               use_in_menu: true,
            },
            {
               headers: {
                  Cookie: `tokenn=${token}`, // "tokenn"
               },
            }
         );
      } catch (error: any) {
         expect(error.status).toBe(401);
      }
   });
   /* 
   ||====================||
   ||  PUT /product:id  ||
   ||====================||
   */
   it("should return status 200 when update successfully", async () => {
      try {
         const responseLogin = await axiosInstance.post("/login", {
            email: "psavio@gmail.com",
            password: "senha12345",
         });

         const token = extractToken(responseLogin);

         // Verifica se o token foi capturado corretamente
         expect(token).toBeDefined();

         // Verifica o status da resposta
         expect(responseLogin.status).toBe(200);

         const response = await axiosInstance.put(
            "/product/1",
            {
               name: "Produto 01 atualizado",
               slug: "produto-01-atualizado",
               stock: 20,
               description: "Descrição do produto 01 atualizado",
            },
            {
               headers: {
                  Cookie: `token=${token}`,
               },
            }
         );

         expect(response.status).toBe(200);
         expect(response.data.message).toBe("Product update successfully!");
      } catch (error) {
         console.log(error);
      }
   });
   it("Should return status 404 when the product with the given ID is not found", async () => {
      try {
         const responseLogin = await axiosInstance.post("/login", {
            email: "psavio@gmail.com",
            password: "senha12345",
         });

         const token = extractToken(responseLogin);

         // Verifica se o token foi capturado corretamente
         expect(token).toBeDefined();

         // Verifica o status da resposta
         expect(responseLogin.status).toBe(200);

         const response = await axiosInstance.put(
            "/product/30",
            {
               enabled: false,
               name: "Produto 01 atualizado",
               slug: "produto-01-atualizado",
               stock: 20,
            },
            {
               headers: {
                  Cookie: `token=${token}`,
               },
            }
         );
      } catch (error: any) {
         expect(error.status).toBe(404);
         expect(error.response.data.message).toBe(
            "Product with informed id not found"
         );
      }
   });
   it("Should return status 401 when authorization token is not sent or is incorrect", async () => {
      try {
         const responseLogin = await axiosInstance.post("/login", {
            email: "psavio@gmail.com", // email incorreto
            password: "senha12345",
         });

         const token = extractToken(responseLogin);

         // Verifica se o token foi capturado corretamente
         expect(token).toBeDefined();

         // Verifica o status da resposta
         expect(responseLogin.status).toBe(200);

         const response = await axiosInstance.put(
            "/product/1",
            {
               enabled: false,
               name: "Produto 01 atualizado",
               slug: "produto-01-atualizado",
               stock: 20,
            },
            {
               headers: {
                  Cookie: `tokenn=${token}`, // "tokenn"
               },
            }
         );
      } catch (error: any) {
         expect(error.status).toBe(401);
      }
   });
   /* 
   ||=======================||
   ||  DELETE /product:id  ||
   ||=======================||
   */
   it("Should return status 204 when the request was successful but no body should be returned", async () => {
      try {
         const responseLogin = await axiosInstance.post("/login", {
            email: "psavio@gmail.com",
            password: "senha12345",
         });

         const token = extractToken(responseLogin);

         // Verifica se o token foi capturado corretamente
         expect(token).toBeDefined();

         // Verifica o status da resposta
         expect(responseLogin.status).toBe(200);

         const response = await axiosInstance.delete("/product/11", {
            headers: {
               Cookie: `token=${token}`,
            },
         });

         expect(response.status).toBe(204);
      } catch (error) {
         console.log(error);
      }
   });
   it("Should return status 404 when the request data is incorrect", async () => {
      try {
         const responseLogin = await axiosInstance.post("/login", {
            email: "psavio@gmail.com",
            password: "senha12345",
         });

         const token = extractToken(responseLogin);

         // Verifica se o token foi capturado corretamente
         expect(token).toBeDefined();

         // Verifica o status da resposta
         expect(responseLogin.status).toBe(200);

         const response = await axiosInstance.delete("/product/30", {
            headers: {
               Cookie: `token=${token}`,
            },
         });
      } catch (error: any) {
         expect(error.status).toBe(404);
      }
   });
   it.only("Should return status 401 when authorization token is not sent or is incorrect", async () => {
      try {
         const responseLogin = await axiosInstance.post("/login", {
            email: "psavio@gmail.com",
            password: "senha12345",
         });

         const token = extractToken(responseLogin);

         // Verifica se o token foi capturado corretamente
         expect(token).toBeDefined();

         // Verifica o status da resposta
         expect(responseLogin.status).toBe(200);

         const response = await axiosInstance.delete("/product/1", {
            headers: {
               Cookie: `tokenn=${token}`,
            },
         });
      } catch (error: any) {
         expect(error.status).toBe(401);
      }
   });
});
