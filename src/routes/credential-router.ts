import { Router } from "express";
import * as credentialController from "../controllers/credential-controller";
import { authenticateToken } from "../middlewares/authenticationMiddleware";
import { Validation } from "../middlewares/validationMiddleware";
export const credentialRouter = Router();

credentialRouter
    .get("", authenticateToken, credentialController.allTitles)
    .get("/:id", authenticateToken, credentialController.infoById)
    .post("/create", authenticateToken, Validation.createCredential, credentialController.newCredential)
    .delete("/:id", authenticateToken, credentialController.deleteById);