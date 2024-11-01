import { z } from "zod";

export const customerSchema = z.object({
  id: z
    .number()
    .int()
    .positive("El ID debe ser un número entero positivo.")
    .optional(), // ID es opcional
  name: z
    .string()
    .min(1, "El nombre del customer no puede estar vacío.")
    .max(255, "El nombre del customer no puede exceder los 255 caracteres."),
  status: z
    .boolean({ required_error: "El estado es obligatorio." })
    .refine((val) => typeof val === "boolean", {
      message: "El estado debe ser un valor booleano.",
    }),
});

export type CustomerData = z.infer<typeof customerSchema>;
