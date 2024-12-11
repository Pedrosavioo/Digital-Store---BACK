import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const port = process.env.PORT || 3001;

const baseUrl = `http://localhost:${port}/v1`;

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

const axiosInstance = axios.create({
   baseURL: baseUrl,
   headers: { "Content-Type": "application/json" },
   withCredentials: true,
});

describe("User Routes", () => {
   /* 
   ||================||
   ||  GET /user:id  ||
   ||================||
   */
   it("Should return user information and status 200 when passing id parameter", async () => {
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

         const response = await axiosInstance.get("/user/1", {
            headers: {
               Cookie: `token=${token}`,
            },
         });

         expect(response.status).toBe(200);
         expect(response.data.data).toEqual({
            id: 1,
            firstname: "pedro",
            surname: "savio",
            email: "psavio@gmail.com",
         });
      } catch (error) {
         console.log(error);
      }
   });

   it("Should return status 401 when informing an id that is different from the logged in user", async () => {
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

         const response = await axiosInstance.get("/user/5", {
            headers: {
               Cookie: `token=${token}`,
            },
         });
      } catch (error: any) {
         expect(error.status).toBe(401);
         expect(error.response.data.message).toBe("No access permission");
      }
   });

   /* 
   ||================||
   ||   POST /user   ||
   ||================||
   */
   it("Should return status 201 when successfully creating user", async () => {
      try {
         const response = await axiosInstance.post("/user", {
            firstname: "user",
            surname: "test",
            email: "usertest0@gmail.com",
            password: "senha12345",
            confirmPassword: "senha12345",
         });

         // Verifica o status da resposta
         expect(response.status).toBe(201);
      } catch (error: any) {
         console.log(error);
      }
   });

   it("Should return 400 when trying to create user with incomplete data", async () => {
      try {
         const response = await axiosInstance.post("/user", {
            firstname: "user",
            surname: "test",
            password: "senha12345",
            confirmPassword: "senha12345",
         });
      } catch (error: any) {
         expect(error.status).toBe(400);
      }
   });

   /* 
   ||================||
   ||  PUT /user:id  ||
   ||================||
   */
   it("Should return status 200 when user is updated successfully", async () => {
      try {
         const responseLogin = await axiosInstance.post("/login", {
            email: "usertest0@gmail.com",
            password: "senha12345",
         });

         const token = extractToken(responseLogin);

         // Verifica se o token foi capturado corretamente
         expect(token).toBeDefined();

         // Verifica o status da resposta
         expect(responseLogin.status).toBe(200);

         const response = await axiosInstance.put(
            "/user/4",
            {
               firstname: "user firstname",
               surname: "user surname",
            },
            {
               headers: {
                  Cookie: `token=${token}`,
               },
            }
         );

         expect(response.status).toBe(200);
         expect(response.data.message).toBe("user updated successfully!");
      } catch (error) {
         console.log(error);
      }
   });

   it("Should return status 401 when trying to update user other than the logged in user", async () => {
      try {
         const responseLogin = await axiosInstance.post("/login", {
            email: "usertest0@gmail.com",
            password: "senha12345",
         });

         const token = extractToken(responseLogin);

         // Verifica se o token foi capturado corretamente
         expect(token).toBeDefined();

         // Verifica o status da resposta
         expect(responseLogin.status).toBe(200);

         const response = await axiosInstance.put(
            "/user/5",
            {
               firstname: "user firstname",
               surname: "user surname",
            },
            {
               headers: {
                  Cookie: `token=${token}`,
               },
            }
         );
      } catch (error: any) {
         expect(error.status).toBe(401);
      }
   });

   it("Should return status 400 when trying to update user with incorrect data", async () => {
      try {
         const responseLogin = await axiosInstance.post("/login", {
            email: "usertest0@gmail.com",
            password: "senha12345",
         });

         const token = extractToken(responseLogin);

         // Verifica se o token foi capturado corretamente
         expect(token).toBeDefined();

         // Verifica o status da resposta
         expect(responseLogin.status).toBe(200);

         const response = await axiosInstance.put(
            "/user/4",
            {
               firstname: 1,
               surname: 2,
            },
            {
               headers: {
                  Cookie: `token=${token}`,
               },
            }
         );
      } catch (error: any) {
         expect(error.status).toBe(400);
         expect(error.response.data.message).toBe(
            "Expected string, received number"
         );
      }
   });

   /* 
   ||=====================||
   ||   DELETE /user:id   ||
   ||=====================||
   */
   it("Should return status 401 when trying to delete a user that is not the same as the logged in user", async () => {
      try {
         const responseLogin = await axiosInstance.post("/login", {
            email: "usertest0@gmail.com",
            password: "senha12345",
         });

         const token = extractToken(responseLogin);

         // Verifica se o token foi capturado corretamente
         expect(token).toBeDefined();

         // Verifica o status da resposta
         expect(responseLogin.status).toBe(200);

         const response = await axiosInstance.delete("/user/1", {
            headers: {
               Cookie: `token=${token}`,
            },
         });
      } catch (error: any) {
         expect(error.status).toBe(401);
      }
   });

   it("Should return status 404 when trying to delete a user with a non-existent ID", async () => {
      try {
         const responseLogin = await axiosInstance.post("/login", {
            email: "usertest0@gmail.com",
            password: "senha12345",
         });

         const token = extractToken(responseLogin);

         // Verifica se o token foi capturado corretamente
         expect(token).toBeDefined();

         // Verifica o status da resposta
         expect(responseLogin.status).toBe(200);

         const response = await axiosInstance.delete("/user/10", {
            headers: {
               Cookie: `token=${token}`,
            },
         });
      } catch (error: any) {
         expect(error.status).toBe(404);
      }
   });

   it.only("Should return status 204 when deleting user successfully", async () => {
      try {
         const responseLogin = await axiosInstance.post("/login", {
            email: "usertest0@gmail.com",
            password: "senha12345",
         });

         const token = extractToken(responseLogin);

         // Verifica se o token foi capturado corretamente
         expect(token).toBeDefined();

         // Verifica o status da resposta
         expect(responseLogin.status).toBe(200);

         const response = await axiosInstance.delete("/user/4", {
            headers: {
               Cookie: `token=${token}`,
            },
         });
         expect(response.status).toBe(204);
      } catch (error: any) {
         console.log(error);
      }
   });
});
