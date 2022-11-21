import { invalidDataError, notFoundError, unauthorizedError } from "@/errors";
import paymentRepository from "@/repositories/payment-repository";
import ticketRepository from "@/repositories/ticket-repository";
import { paymentBody } from "@/protocols";
import { Payment } from "@prisma/client";
import { ValidadePayment } from "./payment-validade";

async function getPaymentsByTicketId(ticketId: number, userId: number): Promise<Payment> {
  if(!ticketId) throw invalidDataError;

  const ticket = await paymentRepository.findTicketById(ticketId);
  if (!ticket) throw notFoundError();

  const validTicket = await paymentRepository.findEnrolmentByUserId(userId);
  if(validTicket.Ticket.length === 0) throw unauthorizedError();

  const payment = await paymentRepository.findPaymentByTicketId(ticketId);
  return payment;
}

async function CreatePayment(body: paymentBody, userId: number): Promise<Payment> {
  const Result = await ValidadePayment(body, userId);
  const ticketType = await ticketRepository.findTicketTypeInfo(Result.ticketTypeId);

  const lastDigits = String(body.cardData.number).slice(String(body.cardData.number).length - 4);
  
  const paymentData: Omit<Payment, "id" | "createdAt"> = {
    ticketId: body.ticketId,
    value: ticketType.price,
    cardIssuer: body.cardData.issuer,
    cardLastDigits: lastDigits,
    updatedAt: new Date(),
  };

  await paymentRepository.updateTicket(body.ticketId);
  const payment = await paymentRepository.createPayment(paymentData);
  return payment;
}

const paymentServices = {
  getPaymentsByTicketId,
  CreatePayment
};
export default paymentServices;
