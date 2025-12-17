import { locales } from "@/config";
import { defineRouting } from "next-intl/routing";


export const routing = defineRouting({
    locales : locales , 
    defaultLocale : "ar" , 
    localePrefix : "always"
})