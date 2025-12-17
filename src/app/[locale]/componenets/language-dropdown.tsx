"use client"
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { usePathname } from "@/i18n/navigation";
import { Check, Languages } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";



export function setLanguage(lang: string) {
    document.cookie = `NEXT_LOCALE=${lang}; path=/; max-age=31536000`;
    window.location.reload(); // required so next-intl loads new locale
}



const LanguageDropDown: React.FC = ({ }) => {
    const pathname = usePathname();
    const locale = useLocale();
    const t = useTranslations("components.languages");



    const router = useRouter();
 
    const changeLanguage = (lang: string) => {

        router.replace(`/${lang}${pathname}`)
    };




    return (
        <DropdownMenu >
            <DropdownMenuTrigger className="w-9 h-9 hover:bg-accent hover:text-accent-foreground  flex items-center justify-center rounded-sm hover:!bg-accent/20">
                <Languages className="w-4 h-4 " />
            </DropdownMenuTrigger>
            <DropdownMenuContent className=" z-[99px]">
                <DropdownMenuItem onClick={() => changeLanguage("ar")} className="flex justify-between">
                    {t("ar")}
                    {locale == "ar" && <Check />}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => changeLanguage("en")} className="flex justify-between">
                    {t("en")}
                    {locale == "en" && <Check />}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => changeLanguage("fr")} className="flex justify-between">
                    {t("fr")}
                    {locale == "fr" && <Check />}
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}


export default LanguageDropDown; 