

"use client"
import { User, UserType } from "@/lib/user";
import { useAuth } from "@/providers/auth-provider";
import { useTranslations } from "next-intl";
import { useMemo } from "react";
import z from "zod";





const useAccountFormSchema = (user : User) => {

    const t = useTranslations("account");
    
    

    const editUserSchema = useMemo(() => {
        const phoneNumberField = z.coerce
            .string()
            .trim()
            .optional()
            .refine(
                (val) => !val || /^0\d{9}$/.test(val),
                { message: t("errors.phone_number.invalid") }
            );
        const socialMediaSchema = z.object({
            facebook: z.coerce
                .string()
                .trim()
                .optional()
                .refine(
                    (val) => !val || z.string().url().safeParse(val).success,
                    { message: t("errors.social_media.facebook") }
                ),

            instagram: z.coerce
                .string()
                .trim()
                .optional()
                .refine(
                    (val) => !val || z.string().url().safeParse(val).success,
                    { message: t("errors.social_media.instagram") }
                ),
            tiktok: z.coerce
                .string()
                .trim()
                .optional()
                .refine(
                    (val) => !val || z.string().url().safeParse(val).success,
                    { message: t("errors.social_media.tiktok") }
                ),

            whatsapp: phoneNumberField,
        });
        const businessAccountSchema = z.object({

            agency_name: z.string().min(1, { message: t("errors.business_accounts.agency_name.required") }),
            business_address: z.string().min(1, { message: t("errors.business_accounts.business_address.required") }),

            cover_picture_url: z
                .union([
                    z.instanceof(File),
                    z.string().url().nullable(), // allow existing URLs if editing a profile
                    z.null(),
                ])
                .optional(),

        });

        let userEditSchema = z.object({
            full_name: z.string().min(1, { message: t("errors.full_name.required") }),
            email: z.string().email({ message: t("errors.email.invalid") }).min(1, { message: t("errors.email.required") }),

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
            social_media: socialMediaSchema.optional(),
            business_accounts: (user?.user_type == UserType.agency || user?.user_type == UserType.developer) ?  businessAccountSchema.required() : businessAccountSchema.optional() 
        })
        return userEditSchema;
    }, [t , user]);

    return editUserSchema;
}


export default useAccountFormSchema; 