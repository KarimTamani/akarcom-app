

"use client"
import { useTranslations } from "next-intl";
import { useMemo } from "react";
import z from "zod";





const useCreateUserFormSchema = () => {

    const t = useTranslations();
    const createUserSchema = useMemo(() => {
        const phoneNumberField = z
            .string()
            .trim()
            .optional()
            .refine(
                (val) => !val || /^0\d{9}$/.test(val),
                { message: t("account.errors.phone_number.invalid") }
            );

 
        return z.object({
            full_name: z.string().min(1, { message: t("account.errors.full_name.required") }),
            email: z.string().email({ message: t("account.errors.email.invalid") }).min(1, { message: t("account.errors.email.required") }),

            picture_url: z
                .union([
                    z.instanceof(File),
                    z.string().url().nullable(), // allow existing URLs if editing a profile
                    z.null(),
                ])
                .optional(),

            phone_number: phoneNumberField,

            birthday: z.date().min(1).optional(),
            gender: z.boolean().optional(),
            user_type : z.string().min(1 , "User type is required") , 
            password: z
                .string()
                .min(1, t("auth.errors.password_required"))
                .min(7, t("auth.errors.password_length")),


            confirm_password: z.string().min(1, t("auth.errors.confirm_password_required")),
        }).refine((data) => data.password === data.confirm_password, {
            message: t("auth.errors.password_match"),
            path: ['confirm_password'],
        })

    }, [t]);

    return createUserSchema;
}


export default useCreateUserFormSchema; 