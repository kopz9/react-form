import { z } from "zod";

export const formSchema = z.object({
  address: z.object({
    zipCode: z.string().min(7, { message: "Mínimo 7 caracteres" }),
    street: z.string().min(5, { message: "Mínimo 5 caracteres" }),
    district: z.string().min(5, { message: "Mínimo 5 caracteres" }),
    complement: z.string().min(5, { message: "Mínimo 5 caracteres" }),
    city: z.string().min(5, { message: "Mínimo 5 caracteres" }),
    state: z.string().min(5, { message: "Mínimo 5 caracteres" }),
  }),
});
