import { z } from "zod";

export const DCompassRole = {
  ADMIN: "admin",
  PARTNER: "partner",
  CLIENT: "client",
  SCANNER: "scanner"
} as const;

export type DCompassRole = (typeof DCompassRole)[keyof typeof DCompassRole];

export const dCompassRoleSchema = z.enum([
  DCompassRole.ADMIN,
  DCompassRole.PARTNER,
  DCompassRole.CLIENT,
  DCompassRole.SCANNER
]);

export const partnerProfileSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
  company: z.string().optional()
});

export type PartnerProfile = z.infer<typeof partnerProfileSchema>;

export const eventStatusSchema = z.enum(["draft", "published", "closed"]);
export type EventStatus = z.infer<typeof eventStatusSchema>;

export const eventCreateSchema = z.object({
  name: z.string(),
  startsAt: z.string(),
  partnerId: z.string(),
  status: eventStatusSchema.default("draft")
});

export type EventCreate = z.infer<typeof eventCreateSchema>;
