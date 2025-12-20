"use client";
//import MobileNavbar from "@/components/home/mobile-navbar";
import { Button, buttonVariants } from "@/components/ui/button";


import { LucideIcon, Moon, Sun, ZapIcon } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import AnimationContainer from "@/components/animation-container";
import MaxWidthWrapper from "@/components/max-width-wrapper";
import Image from "next/image";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";
import LanguageDropDown from "./language-dropdown";
//import { LINKS } from "@/utils/constants/nav-links";
import { useIsMobile } from "@/hooks/use-mobile";

import { CircleCheckIcon, CircleHelpIcon, CircleIcon } from "lucide-react"

import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { useLocale, useTranslations } from "next-intl";
import usePropertyQuery from "../dashboard/ads/hooks/use-get-property-types";
import { PropertyType } from "@/lib/property";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/providers/auth-provider";
import { ProfileDropdown } from "./profile-dropdown";




const Navbar = () => {
    const { resolvedTheme, setTheme } = useTheme();

    const [scroll, setScroll] = useState(false);
    const router = useRouter();

    const { user } = useAuth();
 
    const handleScroll = () => {

        if (window.scrollY > 8) {
            setScroll(true);
        } else {
            setScroll(false);
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const toggleTheme = () => {
        setTheme(resolvedTheme == "dark" ? "light" : "dark")
    }

    const isMobile = useIsMobile()
    const t = useTranslations("components.navbar");
    const { propertyTypes, isLoading: isFetching } = usePropertyQuery(true);

    const pathname = usePathname();

    const navLinkClassname: string = "text-foreground  dark:hover:bg-accent/20 hover:bg-accent/20 "
    const linkClassName: string = "focus:bg-transparent focus:text-primary ";

    if (pathname.includes("dashboard"))
        return;


    const locale = useLocale();
    return (
        <header
            className={cn(
                "fixed z-9 backdrop-blur-sm bg-background/20 inset-x-0 top-0  h-14 w-full select-none shadow-md ",
                scroll && "border-border  bg-background/40 backdrop-blur-md",
            )}
        >
            <AnimationContainer reverse delay={0.1} className="size-full ">
                <MaxWidthWrapper className="flex items-center justify-between">
                    <div className="flex items-center space-x-12 w-full">
                        <Link href="/">
                            <Image
                                src={`/akarcom.png`}
                                alt="Logo"
                                height={36}
                                width={46}
                                quality={100}
                            />
                        </Link>
                        <div className=" w-full hidden md:flex justify-center">
                            <NavigationMenu viewport={isMobile} >
                                <NavigationMenuList className="flex-wrap ">
                                    <NavigationMenuItem>
                                        <NavigationMenuLink asChild className={navLinkClassname}>

                                            <Link href="/" className={linkClassName} >{t("home")}</Link>
                                        </NavigationMenuLink>
                                    </NavigationMenuItem>

                                    <NavigationMenuItem >
                                        <NavigationMenuLink asChild className={navLinkClassname}>
                                            <Link href="/search?ad_type=sale" className={linkClassName}>{t("sale")}</Link>
                                        </NavigationMenuLink>
                                    </NavigationMenuItem>

                                    <NavigationMenuItem>
                                        <NavigationMenuLink asChild className={navLinkClassname}>
                                            <Link href="/search?ad_type=rent" className={linkClassName} >{t("rent")}</Link>
                                        </NavigationMenuLink>
                                    </NavigationMenuItem>
                                    <NavigationMenuItem>
                                        <NavigationMenuLink asChild className={navLinkClassname}>
                                            <Link href="/search" className={linkClassName}>{t("search")}</Link>
                                        </NavigationMenuLink>
                                    </NavigationMenuItem>
                                    {
                                        propertyTypes.length > 0 &&
                                        <NavigationMenuItem className={cn("hidden md:block")} >
                                            <NavigationMenuTrigger className={"bg-transparent hover:bg-accent/20  data-[state=open]:!bg-accent/20"}>{t("properties")}</NavigationMenuTrigger>
                                            <NavigationMenuContent dir={locale == "ar" ? "rtl" : "ltr"}>
                                                <ul className="grid w-[200px] gap-2 max-h-[360px] overflow-auto">
                                                    {
                                                        propertyTypes.map((type: PropertyType, index: number) => (
                                                            <li key={type.id} className="m-0 p-0 text-sm">
                                                                <p className="text-foreground font-semibold pl-2 pb-2 ">
                                                                    {type.name}
                                                                </p>
                                                                <Separator />
                                                                {
                                                                    type.other_property_types.map((childType: PropertyType) => (
                                                                        <NavigationMenuLink asChild key={childType.id}>
                                                                            <Link href={`/search?property_type_ids=${childType.id}`}>{childType.name}</Link>
                                                                        </NavigationMenuLink>
                                                                    ))
                                                                }
                                                            </li>
                                                        ))
                                                    }

                                                </ul>
                                            </NavigationMenuContent>
                                        </NavigationMenuItem>
                                    }
                                </NavigationMenuList>
                            </NavigationMenu>
                        </div>
                    </div>

                    <div className="items-center flex gap-2">
                        <LanguageDropDown />
                        <Button size="icon" variant="ghost" onClick={toggleTheme} className="hover:!bg-accent/20">
                            {
                                resolvedTheme != "dark" ?
                                    <Moon className=" size-4 " /> :
                                    <Sun className=" size-4 " />
                            }

                        </Button>
                        {
                            !user ? 
                            <Button
                                onClick={() => {
                                    router.push("/auth/sign-in")
                                }}
                                rel="noopener noreferrer "
                                className="min-w-24 "
                            >
                                {t("sign_in")}
                            </Button>
                            : 
                            <ProfileDropdown/>
                        }
                    </div>
                </MaxWidthWrapper>
            </AnimationContainer>
        </header>
    );
};

/*
const ListItem = React.forwardRef<
    React.ElementRef<"a">,
    React.ComponentPropsWithoutRef<"a"> & { title: string; icon: LucideIcon; comming?: boolean, newTab?: boolean }
>(({ className, title, href, icon: Icon, children, comming = false, newTab = false, ...props }, ref) => {
    return (
        <li>
            <NavigationMenuLink asChild
                onClick={(e) => comming && e.preventDefault()} // block navigation
                onSelect={(e) => comming && e.preventDefault()} // block menu close

            >
                <Link
                    href={href!}
                    ref={ref}
                    {...(newTab
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                    className={cn(
                        "block select-none space-y-1 rounded-lg p-3 leading-none no-underline outline-none transition-all duration-100 ease-out ",
                        className,
                        !comming ? "hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground" : "opacity-50"
                    )}
                    {...props}
                >
                    <div className="flex items-center space-x-2 neutral-700">
                        <Icon className="h-4 w-4 " />
                        <h6 className="!leading-none font-medium text-sm ">{title}</h6>
                        {
                            comming &&
                            <span className="ml-2 inline-block rounded-full bg-yellow-100 px-2 py-0.5 text-xs font-medium text-yellow-800">
                                Coming Soon
                            </span>
                        }
                    </div>
                    <p
                        title={children! as string}
                        className="line-clamp-1 text-muted-foreground text-sm leading-snug"
                    >
                        {children}
                    </p>
                </Link>
            </NavigationMenuLink>
        </li>
    );
});
ListItem.displayName = "ListItem";
*/
export default Navbar;
