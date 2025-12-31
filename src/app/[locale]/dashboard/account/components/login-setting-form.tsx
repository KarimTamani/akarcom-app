"use client"
import { PasswordInput } from "@/components/password-input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { api } from "@/services/api";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";


const LoginSettingForm: React.FC = ({ }) => {
    const t = useTranslations();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | undefined>(undefined);


    const formSchema = z
        .object({
            new_password: z
                .string()
                .min(1, t("auth.errors.password_required"))
                .min(7, t("auth.errors.password_length")),

            old_password: z
                .string()
                .min(1, t("auth.errors.password_required"))
                .min(7, t("auth.errors.password_length")),
            confirm_password: z.string().min(1, t("auth.errors.confirm_password_required")),
        })
        .refine((data) => data.new_password === data.confirm_password, {
            message: t("auth.errors.password_match"),
            path: ['confirm_password'],
        });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            old_password: '',
            confirm_password: '',
            new_password: ""
        },
    }) ; 

    const onSubmit = async (data: z.infer<typeof formSchema>) => {

        setIsLoading(true);
        setError(undefined) ; 
        try {
            const response = await api.put("/users/password", data);
            const response_data = response.data.data;
            const token = response_data.token;
            localStorage.setItem("token", token);

            form.reset() ; 
            toast(t("account.success.password_reset"), {
                description: t("account.success.password_reset_description"),
                className: "!text-primary" , 
                descriptionClassName : "!text-primary/80"
            }) ; 


        } catch (error) {
            if (axios.isAxiosError(error)) {
                setError(t("account.errors.invalid_old_password"));
            }
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="flex   flex-col  ">
            <h3 className="text-xl font-medium  shrink-0 my-4">
                {t("account.reset_password")}
            </h3>
            <div className="w-full md:w-[420px]">
                <Form {...form} >
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className={cn('grid gap-4 ')}
                    >
                        <FormField
                            control={form.control}
                            name='old_password'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{t("account.old_password")}</FormLabel>
                                    <FormControl>
                                        <PasswordInput placeholder={t("auth.password_placeholder")}  {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name='new_password'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{t("account.new_password")}</FormLabel>
                                    <FormControl>
                                        <PasswordInput placeholder={t("auth.password_placeholder")}  {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name='confirm_password'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{t("account.confirm_new_password")} </FormLabel>
                                    <FormControl>
                                        <PasswordInput placeholder={t("auth.confirm_password_placeholder")}  {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {
                            error &&
                            <Alert variant="destructive" className="bg-destructive/10 ">
                                <AlertDescription >
                                    <span className="w-full">
                                        {error}
                                    </span>
                                </AlertDescription>
                            </Alert>
                        }

                        <div className="flex  justify-end">
                            <Button disabled={isLoading} >
                                {t("account.save")}
                            </Button>
                        </div>
                    </form>
                </Form>

            </div>
        </div>
    )
}

export default LoginSettingForm; 