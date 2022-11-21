import { invalidDataError, notFoundError, unauthorizedError } from "@/errors";
import paymentRepository from "@/repositories/payment-repository";
import { paymentBody } from "@/protocols";

export async function ValidadePayment(body: paymentBody, userId: number) {
  if(!body.cardData) throw invalidDataError;
  if(!body.ticketId) throw invalidDataError;
  
  const ticket = await paymentRepository.findTicketById(body.ticketId);
  if (!ticket) throw notFoundError();
  
  const validTicket = await paymentRepository.findEnrolmentByUserId(userId);
  if(validTicket.Ticket.length === 0) throw unauthorizedError();
  
  return ticket;
}
