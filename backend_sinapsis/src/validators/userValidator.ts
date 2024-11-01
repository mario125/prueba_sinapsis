import { z } from "zod";

export const userSchema = z.object({
  id: z
    .number()
    .int()
    .positive("El ID debe ser un número entero positivo.")
    .optional(),
  customer_id: z
    .number()
    .int()
    .positive("El ID del cliente debe ser un número entero positivo."),
  username: z
    .string()
    .min(1, "El nombre de usuario no puede estar vacío.")
    .max(255, "El nombre de usuario no puede exceder los 255 caracteres."),
  status: z
    .boolean({ required_error: "El estado es obligatorio." })
    .refine((val) => typeof val === "boolean", {
      message: "El estado debe ser un valor booleano.",
    }),
});

export type UserData = z.infer<typeof userSchema>;

export const customerIdValidator = z.object({
  id: z
    .number()
    .int()
    .positive("El ID de customer debe ser un número entero positivo."),
});

export type CustomerId = z.infer<typeof customerIdValidator>;
