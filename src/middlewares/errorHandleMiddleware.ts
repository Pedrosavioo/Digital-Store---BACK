import { ErrorRequestHandler } from "express";
import { ZodError } from "zod";
import HttpResponse from "../utils/httpResponse";

const errorMiddleware: ErrorRequestHandler = (err, req, res, next) => {
   const name = err.name || "Internal error";
   let statusCode = err.statusCode || 500;
   let message = err.message || "Internal server error";

   // Tratamento específico para erros do Zod
   if (err instanceof ZodError) {
      statusCode = 400;
      message = err.errors.map((e) => e.message).join(", "); // Une todas as mensagens de erro
   }

   switch (err.constructor) {
      case ZodError:
         statusCode = 400;
         message = err.errors?.[0]?.message || "Validation error";
         // message = err.errors.map((e: any) => e.message).join(", ")
         break;
      case "PasswordMismatchException":
         statusCode = err.statusCode;
         message = err.message;
         break;
      default:
         break;
   }

   const response = new HttpResponse({
      status: statusCode,
      error: name,
      message: message,
   });

   res.status(statusCode).json(response);
};

export default errorMiddleware;
