"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useCallback, useEffect } from "react";
import { formSchema } from "./cep/schema";
import { AddressProps, FormProps } from "./cep/types";
import {useCep} from './cep/useCep';

export default function Home() {
  const {errors, handleSubmit, handleFormSubmit, register} = useCep();
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
