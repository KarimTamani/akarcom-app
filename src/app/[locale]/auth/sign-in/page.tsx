"use client"
import GoogleIcon from "@/components/icons/google";
import { PasswordInput } from "@/components/password-input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useAuth } from "@/providers/auth-provider";
import { api } from "@/services/api";
import { zodResolver } from '@hookform/resolvers/zod'
import axios from "axios";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { GithubAuthProvider, GoogleAuthProvider, signInWithPopup, UserCredential } from "firebase/auth";


import { auth, googleProvider } from "../../../firebaseConfig";
interface SigninLayoutProps {
    children: React.ReactNode;
    dialogMode?: boolean
}

const SigninLayout: React.FC<SigninLayoutProps> = ({ children, dialogMode = false }) => {

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<boolean>(false);
    const { login, oAuth, openAuthDialog } = useAuth();
    const router = useRouter();
    const t = useTranslations("auth");

    const formSchema = z
        .object({
            email: z.string()
                .min(1, t("errors.email_required"))
                .email({ message: t("errors.email_invalid") }),
            password: z
                .string()
                .min(1, t("errors.password_required"))
                .min(7, t("errors.password_length")),
        })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    })

    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        setIsLoading(true)
        setError(false);


        try {
            await login(data);
            if (!dialogMode)
                router.replace("/dashboard/statistics")
            else
                openAuthDialog(false)
        } catch (error) {
            if (axios.isAxiosError(error)) {
                setError(true);
            }
        } finally {
            setIsLoading(false)
        }
    }

    const redirectSignUp = () => {
        if (!dialogMode)
            router.push('/auth/sign-up'); // redirect to /dashboard
        else
            openAuthDialog("signup")
    };



    const handleLogin = async (provider: typeof googleProvider) => {
        try {

            const result: UserCredential = await signInWithPopup(auth, provider);
            const idToken = await result.user.getIdToken();
            setIsLoading(true)
            await oAuth(idToken);
            setIsLoading(false)
            if (!dialogMode)
                router.replace("/dashboard/statistics")
            else
                openAuthDialog(false)
        } catch (error: any) {
            if (error.code === 'auth/account-exists-with-different-credential') {

                console.log(error)


            }
        }
    };

    return (

        <div className="w-[360px] h-fit flex  flex-col gap-4">
            <div className="text-center flex-col space-y-2">

                <h1 className="text-3xl font-semibold ">
                    {t("sign_in_title")}
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
                        name='email'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel htmlFor="email">{t("email")} </FormLabel>
                                <FormControl>
                                    <Input className="h-10" placeholder={t("email_placeholder")} id="email"  {...field} />
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


                    <Button className='mt-2' disabled={isLoading} size={"lg"}>
                        {t("sign_in_title")}
                    </Button>
                </form>
            </Form>

            <Button
                onClick={() => handleLogin(googleProvider)}
                variant="outline"
                size={"lg"}
            >
                <span>
                    {t("login_via")}
                </span>
                <GoogleIcon />
            </Button>
            {
                error &&
                <Alert variant="destructive" className="bg-destructive/10 ">
                    <AlertDescription >
                        <span className="text-center w-full">
                            {t("errors.wrong_credentials")}
                        </span>
                    </AlertDescription>
                </Alert>
            }
            {
                /*
            <a className="text-primary text-sm hover:underline text-center" href="/auth/reset-password">
                {t("forget_password")}
            </a>*/
            }
            <p className="text-center text-muted-foreground text-sm">
                {t("dont_have_account")}
                <span className="text-primary inline-block  mx-1 font-bold cursor-pointer" onClick={redirectSignUp}>
                    {t("sign_up")}
                </span>
            </p>
        </div>

    )
}


export default SigninLayout; 