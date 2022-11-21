import { invalidDataError, notFoundError, unauthorizedError } from "@/errors";
import paymentRepository from "@/repositories/payment-repository";
import { Ticket } from "@prisma/client";

async function getPaymentsByTicketId(ticketId: number, userId: number) {
  if(!ticketId) throw invalidDataError;

  const ticket = await paymentRepository.findTicketById(ticketId);
  if (!ticket) throw notFoundError();

  const validTicket = await paymentRepository.findEnrolmentByUserId(userId);
  if(validTicket.Ticket.length === 0) throw unauthorizedError();

  const payment = await paymentRepository.findPaymentByTicketId(ticketId);
  return payment;
}

const paymentServices = {
  getPaymentsByTicketId
};
export default paymentServices;
