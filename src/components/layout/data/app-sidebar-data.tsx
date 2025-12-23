


import type { SidebarData } from '../types';
import { useMemo } from 'react';
import { FileSpreadsheetIcon, GitCompareArrowsIcon, HeadsetIcon, HeartIcon, HouseIcon, MessageSquareTextIcon, SettingsIcon, UserIcon, WalletIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useAuth } from '@/providers/auth-provider';
import { UserType } from '@/lib/user';


export const useSidebarData = () => {

    const t = useTranslations("sidebar");
    const { user } = useAuth();


    const operations: any[] = [
        {
            title: t("statistics"),
            url: '/dashboard/statistics',
            icon: HouseIcon,
            label: "statistics",
        },
        {
            title: t("messages"),
            url: '/dashboard/chats',
            icon: MessageSquareTextIcon,
            label: "chats",
        },
        {
            title: t("users"),
            url: "/dashboard/users",
            icon: UserIcon,
            label: "users",
        },
        {
            title: t("ads"),
            url: '/dashboard/ads',
            icon: FileSpreadsheetIcon,
            label: "ads",
        },

        {
            title: t("favorite"),
            url: '/dashboard/favorite',
            icon: HeartIcon,
            label: "favorite",
        },
        {
            title: t("subscriptions"),
            url: '/dashboard/subscriptions',
            icon: WalletIcon,
            label: "subscriptions",
        },
    ];

    if (user?.user_type !== UserType.admin && user?.user_type !== UserType.employee) {
        operations.splice(2, 1);
    }
    const sidebarData: SidebarData = useMemo(() => ({
        navGroups: [
            {
                title: t("operations"),
                items: operations,
            },
            {
                title: t("settings"),
                items: [
                    {
                        title: t("account"),
                        url: '/dashboard/account',
                        icon: SettingsIcon,
                        label: "account"
                    },
                    {
                        title: t("help"),
                        url: '/dashboard/help',
                        icon: HeadsetIcon,
                        label: "help"
                    },

                ],
            },
        ],
    }), [t, operations])

    return sidebarData;
}
