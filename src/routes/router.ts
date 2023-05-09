import { Router } from "express";
import { usersRouter } from "./users-router";
import { networkRouter } from "./network-router";
import { credentialRouter } from "./credential-router";
import { cardRouter } from "./card-router";

export const router = Router();

router.use("/users", usersRouter);
router.use("/networks", networkRouter);
router.use("/credentials", credentialRouter);
router.use("/cards", cardRouter);
