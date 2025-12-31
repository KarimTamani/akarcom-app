"use client"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
} from '@/components/ui/sidebar'
import { useSidebarData } from './data/app-sidebar-data'
import { NavGroup, NavItem } from './types';
import { ChevronsUpDown, LogOut, PlusIcon } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useAuth } from '@/providers/auth-provider';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { useIsMobile } from '@/hooks/use-mobile';
import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/navigation';
import { Button } from '../ui/button';

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {

    const sidebarData = useSidebarData();
    const pathname = usePathname();
    const isMobile = useIsMobile();
    const { user, logout } = useAuth();

    const t = useTranslations("sidebar");
     const ads_t = useTranslations("ads");
    const router = useRouter();

    const onLogOut = () => {
        logout()
        router.replace("/")
    }

    const backHome = () => {
        router.replace("/")
    }

    const openCreateForm = () => {
        router.push("ads/create")
    }

    return (
        <Sidebar collapsible='icon' variant="sidebar" {...props} >
            <SidebarHeader className='flex items-center '>
                <Button variant={"ghost"} className='w-full d py-6 cursor-pointer' onClick={backHome}>
                    <img src="/akarcom.png"
                        className='w-12'
                    >
                    </img>
                </Button>
            </SidebarHeader>
            <SidebarContent >
                {
                    sidebarData.navGroups.map((group: NavGroup) => (
                        <SidebarGroup key={group.title}>
                            <SidebarGroupLabel>
                                {group.title}
                            </SidebarGroupLabel>
                            <SidebarContent >
                                <SidebarMenu >
                                    {
                                        group.items.map((item: NavItem) => (
                                            <SidebarMenuItem key={item.title} className={pathname.includes(item.title.toLocaleLowerCase()) ? "m-0 ring-l-[1px]" : undefined}>
                                                <SidebarMenuButton asChild
                                                    className={cn(
                                                        pathname.includes(item.label.toLocaleLowerCase()) ? "text-primary bg-primary/10 hover:bg-primary/20 hover:text-primary" : undefined
                                                    )}
                                                >
                                                    <a href={item.url}>
                                                        <item.icon />
                                                        <span>{item.title}</span>
                                                    </a>
                                                </SidebarMenuButton>
                                            </SidebarMenuItem>
                                        ))
                                    }
                                </SidebarMenu>
                            </SidebarContent>
                        </SidebarGroup>

                    ))
                }
                {
                    isMobile &&
                    <div className='px-2 w-full flex '>
                        <Button
                            onClick={openCreateForm}
                            className='w-full'
                        >
                            {ads_t("create_action")}
                            <PlusIcon />
                        </Button>
                    </div>
                }
            </SidebarContent>

            <SidebarFooter>
                {
                    user &&
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <SidebarMenuButton
                                size='lg'
                                className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'
                            >
                                <Avatar className='h-8 w-8 rounded-lg'>
                                    <AvatarImage src={user?.picture_url} alt={user?.full_name} />
                                    <AvatarFallback className='rounded-lg'>{user?.full_name.slice(0, 2).toLocaleUpperCase()}</AvatarFallback>
                                </Avatar>
                                <div className='grid flex-1 text-left text-sm leading-tight'>
                                    <span className='truncate font-semibold'>{user?.full_name}</span>
                                    <span className='truncate text-xs'>{user?.email}</span>
                                </div>
                                <ChevronsUpDown className='ml-auto size-4' />
                            </SidebarMenuButton>

                        </DropdownMenuTrigger>

                        <DropdownMenuContent
                            className='w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg'
                            side={isMobile ? 'bottom' : 'right'}
                            align='end'
                            sideOffset={4}
                        >
                            <DropdownMenuLabel className='p-0 font-normal'>
                                <div className='flex items-center gap-2 px-1 py-1.5 text-left text-sm'>
                                    <Avatar className='h-8 w-8 rounded-lg'>
                                        <AvatarImage src={user.picture_url} alt={user.full_name} />
                                        <AvatarFallback className='rounded-lg'>{user?.full_name.slice(0, 2).toLocaleUpperCase()}</AvatarFallback>
                                    </Avatar>
                                    <div className='grid flex-1 text-left text-sm leading-tight'>
                                        <span className='truncate font-semibold'>{user.full_name}</span>
                                        <span className='truncate text-xs'>{user.email}</span>
                                    </div>
                                </div>
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator />

                            <DropdownMenuItem className='text-destructive hover:!text-destructive hover:!bg-destructive/20' onClick={onLogOut}>
                                <LogOut className='text-destructive' />
                                {t("logout")}
                            </DropdownMenuItem>
                        </DropdownMenuContent>


                    </DropdownMenu>
                }
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    )
}
