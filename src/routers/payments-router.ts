import { Router } from "express";
import { getPayments, PostPayment } from "@/controllers";
import { authenticateToken } from "@/middlewares";

const paymentsRouter = Router();

paymentsRouter
  .all("/*", authenticateToken)
  .get("/", getPayments)
  .post("/process", PostPayment);
export { paymentsRouter };
