import { Router } from "express";
import { authenticateToken } from "@/middlewares";
import { getTickets, insertTickets } from "@/controllers/tickets-controllers";

const ticketRouter = Router();

ticketRouter
  .all("/*", authenticateToken)
  .get("/", getTickets)
  .post("/", insertTickets)
  .get("/types");

export { ticketRouter };
