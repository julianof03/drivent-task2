import { invalidDataError, notFoundError } from "@/errors";
import ticketRepository from "@/repositories/ticket-repository";
import enrollmentRepository from "@/repositories/enrollment-repository";
import { Ticket, TicketType } from "@prisma/client";

async function getTicketTypes(): Promise<TicketType[]> {
  return await ticketRepository.findTicketTypes();
}

async function getTicketByUserId(userId: number): Promise<Ticket> {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  if (!enrollment) throw notFoundError();

  const ticket = await ticketRepository.findTicketInfo(enrollment.id);
  if (!ticket) throw notFoundError();

  return ticket;
}

async function insertTickets(typeId: number, userId: number): Promise<Ticket> {
  if(!typeId) throw invalidDataError;

  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  if (!enrollment) throw notFoundError();
  
  const newTicket: Omit<Ticket, "id" | "createdAt"> = {
    ticketTypeId: typeId,
    enrollmentId: enrollment.id,
    status: "RESERVED",
    updatedAt: new Date(),
  };

  const createdTicket = await ticketRepository.createTicket(newTicket);

  return createdTicket;
}

const ticketServices = {
  getTicketByUserId, insertTickets,
  getTicketTypes
};
export default ticketServices;
