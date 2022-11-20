import { Router } from "express";
import { getDefaultEvent } from "@/controllers";
import { authenticateToken } from "@/middlewares";

const eventsRouter = Router();

eventsRouter
  .get("/", getDefaultEvent)
  .all("/*", authenticateToken);

export { eventsRouter };
