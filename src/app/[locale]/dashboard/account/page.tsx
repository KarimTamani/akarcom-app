"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLocale, useTranslations } from "next-intl";
import AccountSettingForm from "./components/account-setting-form";
import LoginSettingForm from "./components/login-setting-form";
import NotificationsSettingForm from "./components/notifications-settings-form";
import { useEffect, useState } from "react";
import { NotificationSetting, User } from "@/lib/user";
import api from "@/services/api";
import axios from "axios";
import { toast } from "sonner";
import AccountLoadingSkeleton from "./components/account-loading-skeleton";


const AccountPage: React.FC = ({ }) => {
    const t = useTranslations("account");

    const [loading, setLoading] = useState<boolean>(true);
    const [user, setUser] = useState<User | undefined>(undefined)

    useEffect(() => {
        (async () => {
            setLoading(true)
            try {
                const response = await api.get("/auth/me");
                const { data } = response.data;

                setUser(data.user);
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    toast(t("errors.failed_to_load"), {
                        description: t("errors.failed_to_load_description"),
                        className: "!text-destructive",
                        descriptionClassName: "!text-destructive"
                    })
                }
            } finally {
                setLoading(false)
            }
        })()
    }, [])

    const onUserChange = (updatedUser: User) => {
 
        setUser(
            updatedUser
        )
    }

    const onNotificationsSettingsChange = (setting: NotificationSetting) => {
        setUser({
            ...user,
            notification_settings: setting
        } as User)
    }

    const locale = useLocale() ; 
    
    return (
        <div className=" h-full p-4" >
            {
                loading &&
                <AccountLoadingSkeleton />
            }
            {
                !loading && user &&
                < Tabs defaultValue="account" className="w-full space-y-2" 
                    dir={locale == "ar" ? "rtl" : "ltr"}>
                    <div className=" flex ">
                        <TabsList >
                            <TabsTrigger className="min-w-32 px-8" value="account">{t("account")}</TabsTrigger>
                            <TabsTrigger className="min-w-32 px-8" value="login_setting">{t("login_settings")}</TabsTrigger>
                            <TabsTrigger className="min-w-32 px-8" value="notifications">{t("notifications")}</TabsTrigger>
                        </TabsList>
                    </div>


                    <TabsContent value="account" >
                        <AccountSettingForm user={user} onChange={onUserChange} />
                    </TabsContent>

                    <TabsContent value="login_setting"  >
                        <LoginSettingForm />
                    </TabsContent>

                    <TabsContent value="notifications"  >
                        <NotificationsSettingForm defaultSettings={user.notification_settings} onChange={onNotificationsSettingsChange} />
                    </TabsContent>
                </Tabs>

            }
        </div >
    )
}


export default AccountPage; 