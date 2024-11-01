import { z } from "zod";

export const campaignSchema = z.object({
  user_id: z
    .number()
    .int()
    .positive("El ID de usuario debe ser un número positivo."),
  name: z.string().min(1, "El nombre de la campaña no puede estar vacío."),
  process_date: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "La fecha de proceso debe estar en formato válido AAAA-MM-DD.",
  }),
  process_hour: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/, {
    message: "La hora de proceso debe estar en formato válido HH:MM:SS.",
  }),
  process_status: z.enum(["1", "2", "3"], {
    message:
      "El estado de proceso debe ser '1' (pendiente), '2' (en proceso) o '3' (finalizada).",
  }),
  phone_list: z
    .string()
    .refine(
      (value) => value.split("|").every((phone) => /^\+\d{10,15}$/.test(phone)),
      {
        message:
          "La lista de teléfonos debe contener números en formato internacional, separados por palote.",
      }
    ),
  message_text: z.string().min(1, "El mensaje no puede estar vacío."),
});

export type CampaignData = z.infer<typeof campaignSchema>;

export const campaignIdSchema = z.object({
  id: z.string().regex(/^\d+$/, {
    message: "El ID de la campaña debe ser un número entero válido.",
  }),
});

export type CampaignIdParams = z.infer<typeof campaignIdSchema>;

export const dateRangeSchema = z
  .object({
    startDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
      message: "Fecha de inicio debe estar en formato válido AAAA-MM-DD.",
    }),
    endDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
      message: "Fecha de fin debe estar en formato válido AAAA-MM-DD.",
    }),
    // campaignIdNumber: z
    //   .number()
    //   .int()
    //   .positive("El ID de la campaña debe ser un número positivo."),
  })
  .refine((data) => new Date(data.endDate) >= new Date(data.startDate), {
    message: "La fecha de fin debe ser igual o posterior a la fecha de inicio.",
    path: ["endDate"],
  });

export type DateRangeParams = z.infer<typeof dateRangeSchema>;
