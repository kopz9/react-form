"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useCallback, useEffect } from "react";
export default function Home() {
  const formSchema = z.object({
    address: z.object({
      zipCode: z.string().min(7, { message: "Mínimo 7 caracteres" }),
      street: z.string().min(5, { message: "Mínimo 5 caracteres" }),
      district: z.string().min(5, { message: "Mínimo 5 caracteres" }),
      complement: z.string().min(5, { message: "Mínimo 5 caracteres" }),
      city: z.string().min(5, { message: "Mínimo 5 caracteres" }),
      state: z.string().min(5, { message: "Mínimo 5 caracteres" }),
    }),
  });

  type FormProps = z.infer<typeof formSchema>;
  type AddressProps = {
    bairro: string;
    complemento: string;
    logradouro: string;
    uf: string;
    localidade: string;
  }

  const {
    handleSubmit,
    register,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormProps>({
    criteriaMode: "all",
    mode: "all",
    resolver: zodResolver(formSchema),
    defaultValues: {
      address: {
        zipCode: "",
        street: "",
        district: "",
        complement: "",
        city: "",
        state: "",
      },
    },
  });

  const handleSetData = useCallback((data: AddressProps) => {
    setValue('address.city', data.localidade)
    setValue('address.district', data.bairro)
    setValue('address.complement', data.complemento)
    setValue('address.street', data.logradouro)
  }, [setValue])

  const handleFormSubmit = (data: FormProps) => {
    console.log(data);
  };

  const zipCode = watch("address.zipCode");

  const handleFetchAddress = useCallback(async (zipCode: string) => {
    const response = await axios.get(
      `https://viacep.com.br/ws/${zipCode}/json/`
    );
    const data = await response.data;
    handleSetData(data);
  }, [handleSetData]);

  useEffect(() => {
    setValue("address.zipCode", zipCode);
    if (zipCode.length !== 9) return;
    handleFetchAddress(zipCode);
  }, [handleFetchAddress, setValue, zipCode]);

  return (
    <>
      <h2 className="p-12 text-3xl text-center">CEP</h2>
      <div className="flex justify-center ">
        <form className="w-[500px]" onSubmit={handleSubmit(handleFormSubmit)}>
          <Input
            {...register("address.zipCode")}
            type="text"
            placeholder="CEP"
            maxLength={9}
          />
          {errors.address?.zipCode?.message && (
            <p className="mb-2 text-sm text-red-500">
              {errors.address?.zipCode?.message}
            </p>
          )}
          <Input
            {...register("address.street")}
            type="text"
            placeholder="Rua"
            maxLength={9}
          />
          {errors.address?.street?.message && (
            <p className="mb-2 text-sm text-red-500">
              {errors.address?.street?.message}
            </p>
          )}
          <Input
            {...register("address.district")}
            type="text"
            placeholder="Bairro"
            maxLength={9}
          />
          {errors.address?.district?.message && (
            <p className="mb-2 text-sm text-red-500">
              {errors.address?.district?.message}
            </p>
          )}
          <Input
            {...register("address.complement")}
            type="text"
            placeholder="Complemento"
            maxLength={9}
          />
          {errors.address?.complement?.message && (
            <p className="mb-2 text-sm text-red-500">
              {errors.address?.complement?.message}
            </p>
          )}
          <Input
            {...register("address.city")}
            type="text"
            placeholder="Cidade"
            maxLength={9}
          />
          {errors.address?.city?.message && (
            <p className="mb-2 text-sm text-red-500">
              {errors.address?.city?.message}
            </p>
          )}
          <Input
            {...register("address.state")}
            type="text"
            placeholder="Estado"
            maxLength={9}
          />
          {errors.address?.state?.message && (
            <p className="mb-2 text-sm text-red-500">
              {errors.address?.state?.message}
            </p>
          )}

          <Button className="w-full" type="submit">
            Enviar
          </Button>
        </form>
      </div>
    </>
  );
}
