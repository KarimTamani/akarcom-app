

"use client" 
import { useTranslations } from "next-intl";
import { useMemo } from "react";
import z from "zod";





const useTicketFormSchema = () => {

    const t = useTranslations("help.create.form");



    const createTicketSchema = useMemo(() => {
        return z.object({
            title: z
                .string()
                .min(1, t("required")),

            description: z
                .string()
                .min(20, t("max_length")),
        });
    } , [t])
    return createTicketSchema;
 

 
}


export default useTicketFormSchema; 