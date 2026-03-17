import { z } from "zod";

export const ticketQuantitySchema = z.number().int().min(1).max(10);

const ticketTypeSchema = z.object({
  typeId: z.string(),
  quantity: ticketQuantitySchema
});

export const reservationSchema = z.object({
  eventId: z.string(),
  clientId: z.string().optional(),
  tickets: z.array(ticketTypeSchema).min(1),
  paymentMethod: z.enum(["card", "cash", "paypal"]).default("card"),
  reservedAt: z.string().optional()
});

export type ReservationRequest = z.infer<typeof reservationSchema>;

export const qrTokenSchema = z.object({
  ticketId: z.string(),
  eventId: z.string(),
  issuedAt: z.string(),
  factor: z.string().length(6)
});

export type QrToken = z.infer<typeof qrTokenSchema>;
