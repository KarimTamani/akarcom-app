"use client"

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import { redirect, usePathname } from "next/navigation";


const AuthButtons: React.FC = () => {
    const pathname = usePathname()
    const t = useTranslations("auth") ; 

    return (
        <div className="flex ">

            <Button
                size={"lg"}
                variant={pathname.endsWith("sign-up") ? "default" : "outline"}
                className={cn("rounded-r-none rtl:!rounded-r-md rtl:!rounded-l-none w-30", !pathname.endsWith("sign-up") && "!text-primary")}
                onClick={() => {
                    redirect("/auth/sign-up")
                }}
            >
                {t("sign_up")}
            </Button>
            <Button
                className={cn("rounded-l-none w-30 rtl:!rounded-l-md rtl:!rounded-r-none", !pathname.endsWith("sign-in") && "!text-primary")}
                size={"lg"}
                variant={pathname.endsWith("sign-in") ? "default" : "outline"}
                onClick={() => {
                    redirect("/auth/sign-in")
                }}
            >
                {t("sign_in")}
            </Button>
        </div>
    )
}


export default AuthButtons; 
