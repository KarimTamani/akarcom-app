
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Popover, PopoverTrigger } from '@/components/ui/popover'
import { Bell } from 'lucide-react'

export function NotificationPopover() {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="outline" size={"icon"} className='relative'>
                    <Bell />
                    <span className='absolute w-3 h-3 bg-red-500 top-1 right-1 rounded-full border-3 border-background'></span>
                </Button>
            </PopoverTrigger>

        </Popover>
    )
}
