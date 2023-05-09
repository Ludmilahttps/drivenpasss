import { Router } from "express";
import * as cardController from "../controllers/cards-controller";
import { Validation } from "../middlewares/validationMiddleware";
import { authenticateToken } from "../middlewares/authenticationMiddleware";
export const cardRouter = Router();

cardRouter
    .get("", authenticateToken, cardController.allTitles)
    .get("/:id", authenticateToken, cardController.InfoById)
    .post("/create", authenticateToken, Validation.createCard, cardController.newCard)
    .delete("/:id", authenticateToken, cardController.deleteById);