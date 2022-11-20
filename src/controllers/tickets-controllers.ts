import { AuthenticatedRequest } from "@/middlewares";
import ticketServices from "@/services/tickets-service";
import { Response } from "express";
import httpStatus from "http-status";

export async function getTickets(req: AuthenticatedRequest, res: Response) {
  const { userId } = req as AuthenticatedRequest;

  try {
    const tickets = await ticketServices.getTicketByUserId(userId);

    return res.status(httpStatus.OK).send(tickets);
  } catch (error) {
    if (error.name === "NotFoundError") {
      return res.send(httpStatus.NOT_FOUND);
    }
  }
}

export async function insertTickets(req: AuthenticatedRequest, res: Response) {
  const ticketTypeId: number = req.body.ticketTypeId;
  const { userId } = req as AuthenticatedRequest;

  try {
    const tickets = await ticketServices.insertTickets(ticketTypeId, userId);

    return res.status(httpStatus.OK).send(tickets);
  } catch (error) {
    if (error.name === "invalidDataError") return res.send(httpStatus.BAD_REQUEST);
    if (error.name === "NotFoundError") return res.send(httpStatus.NOT_FOUND);
  }
}
