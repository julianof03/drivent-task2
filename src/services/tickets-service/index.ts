import { notFoundError } from "@/errors";
import ticketRepository from "@/repositories/ticket-repository";
import enrollmentRepository from "@/repositories/enrollment-repository";
import { Ticket } from "@prisma/client";

async function getTicketByUserId(userId: number): Promise<any> {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  if (!enrollment) throw notFoundError();
  const ticket = await getTicketInfo(enrollment.id);
  return ticket;
}

async function getTicketInfo(ticketId: number) {
  const ticket = await ticketRepository.findTicketInfo(ticketId);
  if (!ticket) throw notFoundError(); 
  const ticketType = await ticketRepository.findTicketTypeInfo(ticket.ticketTypeId);

  const ticketInfo = {
    id: ticket.id as number,
    status: ticket.status as string,
    ticketTypeId: ticket.ticketTypeId as number,
    enrollmentId: ticket.enrollmentId as number,
    TicketType: { 
      id: ticketType.id as number,
      name: ticketType.name as string,
      price: ticketType.price as number,
      isRemote: ticketType.isRemote as boolean,
      includesHotel: ticketType.includesHotel as boolean,
      createdAt: ticketType.createdAt as Date,
      updatedAt: ticketType.updatedAt as Date,
    },
    createdAt: ticket.createdAt as Date,
    updatedAt: ticket.updatedAt as Date,
  };
  return ticketInfo;
}

async function insertTickets(userId: number): Promise<any> {
  const oklook = 0 as number;
}

const ticketServices = {
  getTicketByUserId, insertTickets
};

export default ticketServices;
