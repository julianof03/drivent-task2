import { AuthenticatedRequest } from "@/middlewares";
import paymentServices from "@/services/payments-service";
import { Response } from "express";
import httpStatus from "http-status";

export async function getPayments(req: AuthenticatedRequest, res: Response) {
  const ticketId = req.query.ticketId as string;
  const { userId } = req as AuthenticatedRequest;

  try {
    const payment = await paymentServices.getPaymentsByTicketId(Number(ticketId), userId);

    return res.status(httpStatus.OK).send(payment);
  } catch (error) {
    if (error.name === "invalidDataError") return res.sendStatus(httpStatus.BAD_REQUEST);
    if (error.name === "NotFoundError") return res.sendStatus(httpStatus.NOT_FOUND);
    if (error.name === "UnauthorizedError") return res.sendStatus(httpStatus.UNAUTHORIZED);  
  }
}

export async function PostPayment(req: AuthenticatedRequest, res: Response) {
  const body = req.body;
  
  const { userId } = req as AuthenticatedRequest;

  try {
    const payment = await paymentServices.CreatePayment(body, userId);

    return res.status(httpStatus.OK).send(payment);
  } catch (error) {
    if (error.name === "invalidDataError") return res.sendStatus(httpStatus.BAD_REQUEST);
    if (error.name === "NotFoundError") return res.sendStatus(httpStatus.NOT_FOUND);
    if (error.name === "UnauthorizedError") return res.sendStatus(httpStatus.UNAUTHORIZED);  
  }
}

