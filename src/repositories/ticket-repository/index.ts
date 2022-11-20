import { prisma } from "@/config";
import { Enrollment, Ticket, TicketType, User } from "@prisma/client";

async function findEnrolmentByUserId(userId: number) {
  return prisma.enrollment.findFirst({
    where: { userId },
    include: {
      Ticket: true,
    }
  });
}
async function verifyEnrollment(id: number) {
  return prisma.user.findFirst({
    where: { id },
    include: {
      Enrollment: true,
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

const ticketRepository = {
  findEnrolmentByUserId,
  findTicketInfo,
  findTicketTypeInfo,
  verifyEnrollment
};

export default ticketRepository;
