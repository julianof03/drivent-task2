import { prisma } from "@/config";
import { Payment, Ticket } from "@prisma/client";

async function findTicketById(id: number) {
  return prisma.ticket.findFirst({
    where: { id },
  });
}

async function findEnrolmentByUserId(userId: number) {
  return prisma.enrollment.findFirst({
    where: { userId },
    include: {
      Ticket: true,
    }
  });
}

async function updateTicket(ticketId: number) {
  return prisma.ticket.update({
    where: {
      id: ticketId,
    },
    data: {
      status: "PAID",
    },
  });
}

async function findPaymentByTicketId(ticketId: number) {
  return prisma.payment.findFirst({
    where: { ticketId },
  });
}

async function createPayment(paymentData: Omit<Payment, "id" | "createdAt">) {
  return prisma.payment.create({
    data: paymentData,
  });
}

const paymentRepository = {
  findTicketById,
  findEnrolmentByUserId,
  findPaymentByTicketId,
  createPayment,
  updateTicket
};

export default paymentRepository;
