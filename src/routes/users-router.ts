import { Router } from "express";
import { signIn, signUp } from "../controllers/index";
import { Validation } from '../middlewares/validationMiddleware';
import * as authenticate from '../middlewares/authenticationMiddleware'

const usersRouter = Router();

usersRouter
    .all('/*', authenticate.authenticateToken)
    .post("/sign-up", Validation.signup, signUp)
    .post("/sign-in", Validation.signin, signIn)

export { usersRouter };