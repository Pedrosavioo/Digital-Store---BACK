import axios from "axios";
import dotenv from "dotenv";

const port = process.env.PORT || 3001;

const axiosInstance = axios.create({
   baseURL: `http:localhost:${port}/v1`,
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

describe("Category Routes", () => {
   /* 
   ||====================||
   ||  GET /category:id  ||
   ||====================||
   */
   it("Should return category information and status 200 when passing id parameter", async () => {
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

         const response = await axiosInstance.get("/category/1", {
            headers: {
               Cookie: `token=${token}`,
            },
         });

         expect(response.status).toBe(200);
         expect(response.data.data).toEqual({
            name: "Shoes",
            slug: "shoes",
            use_in_menu: true,
         });
      } catch (error) {
         console.log(error);
      }
   });

   it("Should return status 404 when category is not found", async () => {
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

         const response = await axiosInstance.get("/category/1", {
            headers: {
               Cookie: `token=${token}`,
            },
         });
      } catch (error: any) {
         expect(error.status).toBe(200);
         expect(error.response.data.message).toBe(
            "Category with informed id not found"
         );
      }
   });
   /* 
   ||=================================||
   ||  GET /category/search?limit=-1  ||
   ||=================================||
   */
   it("Should return status 200 and all categories when limit is set to -1, ignoring pagination", async () => {
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

         const response = await axiosInstance.get("/category/search?limit=-1", {
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
   ||  POST /category  ||
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
            "/category",
            {
               name: "Shoes",
               slug: "shoes",
               use_in_menu: true,
            },
            {
               headers: {
                  Cookie: `token=${token}`,
               },
            }
         );

         expect(response.status).toBe(201);
         expect(response.data.message).toBe("Category created successfully");
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
            "/category",
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
   ||  PUT /category:id  ||
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
            "/category/11",
            {
               name: "Shoesss",
               slug: "shoesss",
               use_in_menu: false,
            },
            {
               headers: {
                  Cookie: `token=${token}`,
               },
            }
         );

         expect(response.status).toBe(200);
         expect(response.data.message).toBe("Category updated successfully!");
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

         const response = await axiosInstance.put(
            "/category/30",
            {
               name: "Shoesss",
               slug: "shoesss",
               use_in_menu: false,
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
            "Category with informed id not found"
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
            "/category/1",
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
   ||=======================||
   ||  DELETE /category:id  ||
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

         const response = await axiosInstance.delete("/category/11", {
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

         const response = await axiosInstance.delete("/category/30", {
            headers: {
               Cookie: `token=${token}`,
            },
         });
      } catch (error: any) {
         expect(error.status).toBe(404);
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

         const response = await axiosInstance.delete("/category/11", {
            headers: {
               Cookie: `tokenn=${token}`,
            },
         });
      } catch (error: any) {
         expect(error.status).toBe(401);
      }
   });
});
