import { z } from "zod";
import { formSchema } from "./schema";

export type FormProps = z.infer<typeof formSchema>;
export type AddressProps = {
  bairro: string;
  complemento: string;
  logradouro: string;
  uf: string;
  localidade: string;
};
