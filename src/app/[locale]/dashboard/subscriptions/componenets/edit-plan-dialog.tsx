import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useForm } from "react-hook-form";
import useCreatePlanForm from "../data/use-create-plan-form";
import z from "zod";
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from "next-intl";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useState } from "react";
import api from "@/services/api";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Combobox } from "@/components/ui/combobox";
import useGetFeatures from "../data/use-get-features";
import { RadioGroup } from "@radix-ui/react-dropdown-menu";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { cn } from "@/lib/utils";
import { SubscriptionPlan } from "@/lib/subscriptions";
import { useSubscriptionPlan } from "../context/subscription-plan-context";
import { toast } from "sonner";

interface Props {
    open: boolean,
    setOpen: (value: boolean) => void,
    defaultValue?: SubscriptionPlan
}


const EditPlanDialog: React.FC<Props> = ({ open, setOpen, defaultValue }) => {

    const t = useTranslations("subscriptions.create_plan");
    const [loading, setLoading] = useState<boolean>(false);
    const createSubscriptionPlanForm = useCreatePlanForm();
    const { updatePlan } = useSubscriptionPlan()

    const form = useForm<z.infer<typeof createSubscriptionPlanForm>>({
        resolver: zodResolver(createSubscriptionPlanForm) as any,
        defaultValues: !defaultValue ? {
            name: "",
            description: "",
            price: 0,
            max_properties: 1,
            features: [] as string[]
        } : defaultValue,
    });

    const features = useGetFeatures();

    const onSubmit = async (values: z.infer<typeof createSubscriptionPlanForm>) => {


        if (defaultValue) {

            setLoading(true)
            try {
                const response = await api.put('/subscription/subscription_plan/' + defaultValue.id, values);
                if (response && response.status == 200) {

                    toast(t("toast.edit.title"), {
                        description: t("toast.edit.description"),
                        className: "!text-primary",
                        descriptionClassName: "!text-primary/80"
                    });
                    const { data } = response.data;

                    updatePlan(data.id, data);
                    form.reset();
                    setOpen(false);

                }



            } catch (error) {
                if (axios.isAxiosError(error)) {
                    const response = error.response;

                }
            } finally {
                setLoading(false);
            }
        }
    }

    return (
        <Dialog
            open={open}
            onOpenChange={(state) => {
                form.reset()
                setOpen(state)
            }}

        >
            <DialogContent className='sm:max-w-lg'>
                <DialogHeader className='text-left'>
                    <DialogTitle>{defaultValue ? t("edit_title") : t("title")} </DialogTitle>
                    {
                        !defaultValue &&
                        <DialogDescription>
                            {t("description")}
                        </DialogDescription>
                    }
                </DialogHeader>
                <div className='-mr-4  h-fit   w-full overflow-y-auto py-1 '>
                    <Form {...form}>
                        <form
                            id='user-form'
                            onSubmit={form.handleSubmit(onSubmit)}
                            className='space-y-4 p-0.5'
                        >
                            <FormField
                                control={form.control}
                                name='name'
                                render={({ field }) => (
                                    <FormItem >
                                        <FormLabel className=' text-right'>
                                            {t("name")}
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder={t("name_placeholder")}
                                                autoComplete='off'
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name='description'
                                render={({ field }) => (
                                    <FormItem >
                                        <FormLabel className='text-right'>
                                            {t("plan_description")}
                                        </FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder={t("plan_description_placeholder")}
                                                autoComplete='off'
                                                {...field}
                                                value={field.value as string}
                                                onChange={field.onChange}

                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name='price'
                                render={({ field }) => (
                                    <FormItem >
                                        <FormLabel className='text-right'>
                                            {t("price")}
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder={t("price_placeholder")}
                                                type="number"
                                                autoComplete='off'
                                                {...field}
                                                value={field.value}
                                                onChange={field.onChange}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name='max_properties'
                                render={({ field }) => (
                                    <FormItem >
                                        <FormLabel className='text-right'>
                                            {t("max_properties")}
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder={t("max_properties_placeholder")}
                                                type="number"
                                                autoComplete='off'
                                                {...field}
                                                value={field.value}
                                                onChange={field.onChange}

                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />


                            <FormField
                                control={form.control}
                                name='features'
                                render={({ field }) => (
                                    <FormItem >
                                        <FormLabel className='text-right'>
                                            {t("features")}
                                        </FormLabel>
                                        <FormControl>

                                            <ToggleGroup type="multiple" className="w-full"  {...field} value={field.value ?? [] as string[]} onValueChange={field.onChange} >
                                                <div className="grid grid-cols-2 gap-2  w-full">

                                                    {features.map((feature: any, index: number) =>
                                                        <ToggleGroupItem key={feature.id} className={cn("w-full border-1 rounded-sm data-[state=on]:bg-primary data-[state=on]:text-white", { "col-span-2": index == features.length - 1 })} value={feature.id}>{feature.label}</ToggleGroupItem>
                                                    )}
                                                </div>

                                            </ToggleGroup>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                        </form>
                    </Form>
                </div>
                <DialogFooter>
                    <Button type='submit' form='user-form' disabled={loading}>
                        {defaultValue ? t("edit") : t("create")}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}


export default EditPlanDialog; 