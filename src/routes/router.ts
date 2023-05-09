import { Router } from "express";
import { usersRouter } from "./users-router";
// import { credentialRouter } from "./credentialRoute";
// import { noteRouter } from "./noteRoute";
// import { cardRouter } from "./cardRoute";
// import { networkRouter } from "./networkRoute";

export const router = Router();

router.use("/users", usersRouter);
// router.use("/credentials", credentialRouter);
// router.use("/notes", noteRouter);
// router.use("/cards", cardRouter);
// router.use("/networks", networkRouter);