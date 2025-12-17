
"use client"
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,

} from '@/components/ui/dropdown-menu'
import { useRouter } from '@/i18n/navigation';
import { useAuth } from '@/providers/auth-provider';
import { useLocale, useTranslations } from 'next-intl';

export function ProfileDropdown() {

    const { user , logout} = useAuth();
    const t = useTranslations("components.navbar");
    const locale = useLocale() ;
    const router = useRouter() ; 



    

    

    return (
        <DropdownMenu modal={false} >
            <DropdownMenuTrigger asChild>
                <Button variant='ghost' className='relative h-8 w-8 rounded-full'>
                    <Avatar className='h-8 w-8'>
                        <AvatarImage src={user?.picture_url ? user?.picture_url : undefined} alt={user?.full_name} />
                        <AvatarFallback>{
                            user?.full_name ? user?.full_name.charAt(0).toUpperCase() : undefined
                        }</AvatarFallback>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='w-56' align={locale == "ar" ? "start" : "end"} forceMount>
                <DropdownMenuLabel className='font-normal'>
                    <div className='flex flex-col space-y-1'>
                        <p className='text-sm leading-none font-medium'>{user?.full_name}</p>
                        <p className='text-muted-foreground text-xs leading-none'>
                            {user?.email}
                        </p>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem onClick={() => router.push("/dashboard")}>
                        {t("dashboard")}
                    </DropdownMenuItem>
                      
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem variant='destructive' onClick={ () => logout()} >
                    {t("logout")}
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
