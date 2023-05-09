import { Request, Response, NextFunction } from "express";
import { ErrorInfo } from "./errorMiddleware";
import { signInSchema, signUpSchema } from "../schemas/users-schemas";
import { networkSchema } from "../schemas/network-schemas";
import { credentialSchema } from "../schemas/credential-schemas";
import { cardSchema } from "../schemas/card-schemas";

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
    createNetwork:(req: Request, _res:Response, next: NextFunction) =>{
        const request = req.body;
        const validation = networkSchema.validate(request, {abortEarly: false});
        if(validation.error) throw new ErrorInfo("error_unprocessable_entity", validation.error.message);
        next();
    },
    createCredential:(req: Request, _res:Response, next: NextFunction) =>{
        const request = req.body;
        const validation = credentialSchema.validate(request, {abortEarly: false});
        if(validation.error) throw new ErrorInfo("error_unprocessable_entity", validation.error.message);
        next();
    },
    createCard: (req: Request, _res:Response, next: NextFunction) => {
        const request = req.body;
        const validation = cardSchema.validate(request, {abortEarly: false});
        if(validation.error) throw new ErrorInfo("error_unprocessable_entity", validation.error.message);
        next();
    },
}
