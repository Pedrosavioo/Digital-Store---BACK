import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const port = process.env.PORT || 3001;

const baseUrl = `http://localhost:${port}/v1`;

const axiosInstance = axios.create({
   baseURL: baseUrl,
   headers: { "Content-Type": "application/json" },
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

describe("Authentication", () => {
   it("Should return a token in the cookie when it is a successful login", async () => {
      const response = await axiosInstance.post("/login", {
         email: "psavio@gmail.com",
         password: "senha12345",
      });

      const token = extractToken(response);

      // Verifica se o token foi capturado corretamente
      expect(token).toBeDefined();

      // Verifica o status da resposta
      expect(response.status).toBe(200);
   });

   it("Should return 400 when email is not provided", async () => {
      try {
         const response = await axiosInstance.post("/login", {
            password: "senha12345",
         });
      } catch (error: any) {
         const { status, data } = error.response;
         expect(status).toBe(400);
         expect(data.message).toBe("email required");
      }
   });

   it("Should return 400 when password is not provided", async () => {
      try {
         const response = await axiosInstance.post("/login", {
            email: "psavio@gmail.com",
         });
      } catch (error: any) {
         const { status, data } = error.response;
         expect(status).toBe(400);
         expect(data.message).toBe("password required");
      }
   });

   it("Should clear the token cookie on logout", async () => {
      try {
         const loginResponse = await axiosInstance.post("/login", {
            email: "psavio@gmail.com",
            password: "senha12345",
         });

         const token = extractToken(loginResponse);

         const logoutResponse = await axios.delete(`${baseUrl}/logout`, {
            headers: {
               "Content-Type": "application/json",
               Cookie: `token=${token}`,
            },
            withCredentials: true,
         });

         // Verifica o status da resposta
         expect(logoutResponse.status).toBe(200);
         expect(logoutResponse.data.message).toBe("logout successful");

         // Verifica se o cookie foi removido
         const logoutCookies = logoutResponse.headers["set-cookie"];

         if (logoutCookies) {
            expect(logoutCookies).toBeDefined();
            expect(logoutCookies[0]).toMatch(/token=;/);
         }
      } catch (error: any) {
         console.log(error);
      }
   });
});
