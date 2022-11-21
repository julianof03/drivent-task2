import { prisma } from "@/config";
import { Ticket } from "@prisma/client";

async function findTicketTypes() {
  return prisma.ticketType.findMany();
}

async function findTicketById(id: number) {
  return prisma.ticket.findFirst({
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

async function findEnrolmentByUserId(userId: number) {
  return prisma.enrollment.findFirst({
    where: { userId },
    include: {
      Ticket: true,
    }
  });
}

async function findPaymentByTicketId(ticketId: number) {
  return prisma.payment.findFirst({
    where: { ticketId },
  });
}

const paymentRepository = {
  findTicketById,
  createTicket,
  findTicketTypes,
  findEnrolmentByUserId,
  findPaymentByTicketId
};

export default paymentRepository;
