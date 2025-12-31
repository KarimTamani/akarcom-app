

"use client"
import { useTranslations } from "next-intl";
import { useMemo } from "react";
import z from "zod";




export const propertyTagSchema = z.object({
    id: z.coerce.number().optional(),
    name: z.string().optional(),
});


const propertyImageSchema = z.object({
    id: z.coerce.number().optional(),
    image_url: z.union([
        z.instanceof(File),
        z.string().url().nullable(), // allow existing URLs if editing a profile
        z.null(),
    ])
        .optional()
})

export type PropertyTagInput = z.infer<typeof propertyTagSchema>
export type PropertyImageInput = z.infer<typeof propertyImageSchema>

const useCreatePropertySchema = () => {

    const t = useTranslations("ads.create.errors");
    const createPropertySchema = useMemo(() => {



        return z.object({
            title: z.string().min(1, t("title_required")),
            description: z.string().nullable().optional(),
            image_360_url: z.union([
                z.instanceof(File),
                z.string().url().nullable(), // allow existing URLs if editing a profile
                z.null(),
            ])
                .optional(),
            property_type_id: z.number(t("property_type_required")),
            add_type: z.string().min(1, t("add_type_invalid")),
            rent_period: z.string().default("monthly").nullable().optional(),
            price: z.coerce.number(t("price_required")).min(1, t("price_required")),
            condition: z.string().optional().default("3"),
            latitude: z.coerce.number().nullable().optional(),
            longitude: z.coerce.number().nullable().optional(),
            address: z.string().min(1, t("address_required")),
            wilaya_id: z.number(t("wilaya_required")),
            commune_id: z.number(t("commune_required")),
            city: z.string().min(1, t("city_required")),
            postal_code: z.string().optional(),
            area_sq_meters: z.coerce.number().nullable().optional(),
            num_rooms: z.coerce.number().optional().nullable(),
            bethrooms: z.coerce.number().optional().nullable(),
            furnished: z.boolean().default(true),
            schools: z.coerce.number().nullable().optional(),
            mosques: z.coerce.number().nullable().optional(),
            gaz: z.boolean().default(false).optional().nullable(),
            electricity: z.boolean().default(false).optional().nullable(),
            water: z.boolean().default(false).optional().nullable(),
            visitability : z.boolean().default(false).optional().nullable(), 
            buit_date: z.date().optional().nullable(),
            project_plan: z.string().url(t("project_plan_invalid")).optional().nullable(),
            ownership_book: z.boolean().nullable().optional().default(false),
            property_images: z
                .array(/* propertyImageSchema */ z.any())
                .min(1, t("property_images_required")),
            property_tags: z.array(/* propertyTagSchema */ z.any()).optional().nullable(),
        });
    }, [t]);

    return createPropertySchema;
}


export default useCreatePropertySchema; 