import express from 'express';
import 'express-async-errors';
import cors from "cors";
import { loadEnv } from "./config/envs";
import { connectDb, disconnectDB } from "./config/database";

loadEnv();

import { usersRouter } from "../src/routes/users-router";
import { credentialRouter } from "../src/routes/credential-router";
import { networkRouter } from "../src/routes/network-router";

const app = express();
app
  .use(cors())
  .use(express.json())
  .use('/users', usersRouter)
  .use('/credentials', credentialRouter)
  .use('/network', networkRouter)

export function init() {
  connectDb();
  return Promise.resolve(app);
};
  
export async function close(): Promise<void> {
  await disconnectDB();
};

export default app;