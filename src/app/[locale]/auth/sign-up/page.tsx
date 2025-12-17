"use client"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/password-input";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import GoogleIcon from "@/components/icons/google";
import { useRouter } from "next/navigation";
import { useAuth } from "@/providers/auth-provider";
import axios from "axios";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface SignupLayoutProps {
    children: React.ReactNode
}

const SignupLayout: React.FC<SignupLayoutProps> = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | undefined>(undefined);

    const router = useRouter();
    const { signup } = useAuth()
    const t = useTranslations("auth");
    const formSchema = z
        .object({
            email: z.string()
                .min(1, t("errors.email_required"))
                .email({ message: t("errors.email_invalid") }),
            full_name: z.string().min(1, t("errors.fullname_required")),
            password: z
                .string()
                .min(1, t("errors.password_required"))
                .min(7, t("errors.password_length")),
            confirm_password: z.string().min(1, t("errors.confirm_password_required")),
        })
        .refine((data) => data.password === data.confirm_password, {
            message: t("errors.password_match"),
            path: ['confirm_password'],
        })


    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: '',
            password: '',
            confirm_password: '',
            full_name: ""
        },
    })

    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        setIsLoading(true)
        setError(undefined);
        try {
            await signup(data) ; 
            router.replace("/dashboard/statistics")
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const data = error.response?.data;
                if (data && data.errors && data.errors.code == "P2002") {
                    setError(t("errors.email_taken"))
                } else
                    setError(t("errors.invalid_data"))
            }
        } finally {
            setIsLoading(false)
        }
    }

    const redirectSignIn = () => {
        router.push('/auth/sign-in'); 
    };

    return (
        <div className="w-[360px] h-fit flex  flex-col gap-4 ">
            <div className="text-center flex-col space-y-2">
                <h1 className="text-3xl font-semibold ">
                    {t("sign_up_title")}
                </h1>
                <p className="text-muted-foreground">
                    {t("welcom_message")}
                </p>
            </div>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className={cn('grid gap-4 ')}
                >

                    <FormField
                        control={form.control}
                        name='full_name'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel >{t("fullname")}</FormLabel>
                                <FormControl>
                                    <Input className="h-10" placeholder={t("fullname_placeholder")}   {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name='email'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel htmlFor="email">{t("email")} </FormLabel>
                                <FormControl>
                                    <Input className="h-10" placeholder={t("email_placeholder")}    {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />



                    <FormField
                        control={form.control}
                        name='password'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>{t("password")}</FormLabel>
                                <FormControl>
                                    <PasswordInput placeholder={t("password_placeholder")}  {...field} />
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
                                <FormLabel>{t("confirm_password")} </FormLabel>
                                <FormControl>
                                    <PasswordInput placeholder={t("confirm_password_placeholder")}  {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button className='mt-2' disabled={isLoading} size={"lg"}>
                        {t("sign_up_action")}
                    </Button>


                </form>
            </Form>
            <Button
                //     onClick={() => handleLogin(googleProvider)}
                variant="outline"
                size={"lg"}
            >
                <span>
                    {t("create_account_via")}
                </span>
                <GoogleIcon />

            </Button>
            {
                error &&
                <Alert variant="destructive" className="bg-destructive/10 ">
                    <AlertDescription >
                        <span className="text-center w-full">
                            {error}
                        </span>
                    </AlertDescription>
                </Alert>
            }
            <p className="text-center text-muted-foreground text-sm">
                {t("have_account")}
                <span className="text-primary inline-block  mx-1 font-bold cursor-pointer" onClick={redirectSignIn}>
                    {t("sign_in")}
                </span>
            </p>
        </div>

    )
}


export default SignupLayout; 