import { signInSchema, signUpSchema } from "../schemas/users-schemas";
import { Request, Response, NextFunction } from "express";
import { ErrorInfo } from "./errorMiddleware";

export const Validation = {
    signup: (req: Request, _res:Response, next: NextFunction) => {
        const request = req.body;
        const validation = signUpSchema.validate(request, {abortEarly: false});
        if(validation.error) throw new ErrorInfo("error_unprocessable_entity", validation.error.message);
        next();
    },
    signin: (req: Request, _res:Response, next: NextFunction) => {
        const request = req.body;
        const validation = signInSchema.validate(request, {abortEarly: false});
        if(validation.error) throw new ErrorInfo("error_unprocessable_entity", validation.error.message);
        next();
    },
}