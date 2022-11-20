import { prisma } from "@/config";
import { Ticket } from "@prisma/client";

async function findEnrolmentByUserId(userId: number) {
  return prisma.enrollment.findFirst({
    where: { userId },
    include: {
      Ticket: true,
    }
  });
}

async function findTicketInfo(id: number) {
  return prisma.ticket.findFirst({
    where: { id },
  }); 
}

async function findTicketTypeInfo(id: number) {
  return prisma.ticketType.findFirst({
    where: { id },
  });
}

async function createTicket(ticket: Omit<Ticket, "id" | "createdAt">) {
  const newTicket = await prisma.ticket.create({
    data: ticket,
    include: {
      TicketType: true,
    },
  });

  return newTicket;
}

const ticketRepository = {
  findEnrolmentByUserId,
  findTicketInfo,
  findTicketTypeInfo,
  createTicket
};

export default ticketRepository;
