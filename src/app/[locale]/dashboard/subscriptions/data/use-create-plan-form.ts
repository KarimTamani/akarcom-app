import { useTranslations } from "next-intl"
import { useMemo } from "react";
import z from "zod";





const useCreatePlanForm = () => {
    const t = useTranslations("subscriptions.create_plan.errors");


    const createPlanForm = useMemo(() => {

        const subscriptionPlanSchema = z.object({
            name: z.string().min(1, t("name_required")),
            description: z.string().optional().nullable(),
            price: z.coerce.number().min(0, t("price")).default(0),
            max_properties: z.coerce.number().min(1, t("property_min")).default(1) ,
            features: z.array(z.string()).optional().nullable(),
        }) ; 

        return  subscriptionPlanSchema ; 
    }, [t])

    return createPlanForm;
}

export default useCreatePlanForm ; 