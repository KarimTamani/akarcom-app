"use client"
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { NotificationPopover } from "./notification-popover";
import ThemeSwitcher from "./theme-switcher";
import { useNavbar } from "@/providers/navbar-context";
import LanguageDropDown from "../../componenets/language-dropdown";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { useIsMobile } from "@/hooks/use-mobile";

const NavBar: React.FC = ({ }) => {

    const { title } = useNavbar();
    const t = useTranslations("ads");
    const router = useRouter();

    const openCreateForm = () => {
        router.push("ads/create")
    }

    const pathname = usePathname();
    const isMobile = useIsMobile() ; 

    return (
        <div className=" sticky top-0  flex w-full items-center gap-4 bg-background justify-between p-4 border-b">
            <div className="flex items-center gap-4">
                <SidebarTrigger variant='outline' className='scale-125 sm:scale-100 size-8' />
                <Separator orientation='vertical' className='!h-6' />
                <h3 className="font-bold text-2xl">
                    {title}
                </h3>
            </div>
            <div className="flex gap-2">
                {
                    !isMobile && !pathname.includes("/ads") &&
                    <Button
                        onClick={openCreateForm}
                    >
                        {t("create_action")}
                        <PlusIcon />
                    </Button>
                }

                <LanguageDropDown />
                <ThemeSwitcher />

                {
                    ///   <NotificationPopover />
                }
            </div>
        </div>
    )
}


export default NavBar; 