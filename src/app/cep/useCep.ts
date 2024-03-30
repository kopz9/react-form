import { useForm } from "react-hook-form";
import { AddressProps, FormProps } from "./types";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema } from "./schema";
import { useCallback, useEffect } from "react";
import axios from "axios";

export const useCep = () => {
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

  const handleSetData = useCallback(
    (data: AddressProps) => {
      setValue("address.city", data.localidade);
      setValue("address.district", data.bairro);
      setValue("address.complement", data.complemento);
      setValue("address.street", data.logradouro);
    },
    [setValue]
  );

  const handleFormSubmit = (data: FormProps) => {
    console.log(data);
  };

  const zipCode = watch("address.zipCode");

  const handleFetchAddress = useCallback(
    async (zipCode: string) => {
      const response = await axios.get(
        `https://viacep.com.br/ws/${zipCode}/json/`
      );
      const data = await response.data;
      handleSetData(data);
    },
    [handleSetData]
  );

  useEffect(() => {
    setValue("address.zipCode", zipCode);
    if (zipCode.length !== 9) return;
    handleFetchAddress(zipCode);
  }, [handleFetchAddress, setValue, zipCode]);
  return {
    register,
    errors,
    handleFormSubmit,
    handleSubmit
  };
};
