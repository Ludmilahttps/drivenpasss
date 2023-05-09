import { Router } from "express";
import * as networkController from "../controllers/network-controller";
import { Validation } from "../middlewares/validationMiddleware";
import { authenticateToken } from "../middlewares/authenticationMiddleware";
export const networkRouter = Router();

networkRouter
    .get("", authenticateToken, networkController.allTitles)
    .get("/:id", authenticateToken, networkController.InfoById)
    .post("/create", authenticateToken, Validation.createNetwork, networkController.newNetwork)
    .delete("/:id", authenticateToken, networkController.deleteById);