"use client"
import { Calendar, Home, Inbox, Search, Settings } from "lucide-react"

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import { useIsMobile } from "@/hooks/use-mobile"

import Link from "next/link"
import { useTranslations } from "next-intl"
import { Separator } from "@/components/ui/separator"
import { PropertyType } from "@/lib/property"
import usePropertyQuery from "../../dashboard/ads/hooks/use-get-property-types"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

// Menu items.
const items = [
    {
        title: "Home",
        url: "#",
        icon: Home,
    },
    {
        title: "Inbox",
        url: "#",
        icon: Inbox,
    },
    {
        title: "Calendar",
        url: "#",
        icon: Calendar,
    },
    {
        title: "Search",
        url: "#",
        icon: Search,
    },
    {
        title: "Settings",
        url: "#",
        icon: Settings,
    },
]

export function HomeSidebar() {

    const isMobile = useIsMobile();


    const t = useTranslations("components.navbar");

    const { propertyTypes, isLoading: isFetching } = usePropertyQuery(true);


    if (!isMobile)
        return;



    return (
        <Sidebar variant="inset" collapsible='icon' >
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>

                            <SidebarMenuItem  >
                                <SidebarMenuButton asChild>
                                    <Link href="/"   >{t("home")}</Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem  >
                                <SidebarMenuButton asChild>
                                    <Link href="/search?ad_type=sale"  >{t("sale")}</Link>

                                </SidebarMenuButton>
                            </SidebarMenuItem>

                            <SidebarMenuItem  >
                                <SidebarMenuButton asChild>
                                    <Link href="/search?ad_type=rent"   >{t("rent")}</Link>

                                </SidebarMenuButton>
                            </SidebarMenuItem>

                            <SidebarMenuItem  >
                                <SidebarMenuButton asChild>
                                    <Link href="/search"  >{t("search")}</Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>

                            {
                                propertyTypes.map((type: PropertyType, index: number) => (
                                    <Collapsible className="group/collapsible">

                                        <SidebarMenuItem key={type.id}  >
                                            <CollapsibleTrigger asChild>
                                                <SidebarMenuButton >
                                                    {type.name}
                                                </SidebarMenuButton>
                                            </CollapsibleTrigger>
                                            <CollapsibleContent>
                                                <SidebarMenuSub>
                                                    {
                                                        type.other_property_types.map((childType: PropertyType) => (

                                                            <SidebarMenuSubItem key={childType.id}>
                                                                <Link href={`/search?property_type_ids=${childType.id}`} key={childType.id}>{childType.name}</Link>
                                                            </SidebarMenuSubItem>

                                                        ))
                                                    }
                                                </SidebarMenuSub>
                                            </CollapsibleContent>
                                        </SidebarMenuItem>
                                    </Collapsible>
                                ))
                            }



                            <SidebarMenuItem>
                                <ul className="grid w-[200px] gap-2 max-h-[360px] overflow-auto">
                                    {

                                    }

                                </ul>
                            </SidebarMenuItem>

                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    )
}