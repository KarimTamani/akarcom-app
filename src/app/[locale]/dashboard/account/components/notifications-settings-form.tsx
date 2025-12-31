"use client"
import { useTranslations } from "next-intl";

import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button";
import { useState } from "react";
import api from "@/services/api";
import { toast } from "sonner";
import { NotificationSetting } from "@/lib/user";
import axios from "axios";

interface Props {
    defaultSettings?: NotificationSetting
    onChange?: (setting: NotificationSetting) => void;
}


const NotificationsSettingForm: React.FC<Props> = ({ defaultSettings , onChange }) => {

    const t = useTranslations("account");
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [settings, setSettings] = useState<any>({
        ads: defaultSettings?.ads === undefined ?  true : defaultSettings?.ads,
        messages: defaultSettings?.messages === undefined ?  true : defaultSettings?.messages,
    });

    const onSubmit = async () => {
        try {
            setIsLoading(true);
            const response = await api.put("/users/notification-settings", settings)
            const { data } = response.data;
 
            onChange && onChange( data ) ; 
            toast(t("success.notifications_updated"), {
                description: t("success.notifications_updated_description"),
                className: "!text-primary",
                descriptionClassName: "!text-primary/80"
            });
        } catch (error) {
            if (axios.isAxiosError(error)) {

            }
        } finally {
            setIsLoading(false);

        }

    }
    return (
        <div className="flex flex-col gap-4">
            <div className="py-4 border-b-1">
                <h3 className="text-xl font-medium  shrink-0 ">
                    {t("notifications")}
                </h3>
                <p className="text-muted-foreground text-sm">
                    {t("notifications_header")}
                </p>
            </div>
            <div className="w-full md:w-[420px]">
                <div className="flex flex-col gap-6">
                    <div className="flex items-start gap-3">
                        <Checkbox id="ads" onCheckedChange={(checked: any) => setSettings({ ...settings, ads: checked })} checked={settings.ads} />
                        <div className="grid gap-2">
                            <Label htmlFor="ads">
                                {t("ads_notifications")}
                            </Label>
                            <p className="text-muted-foreground text-sm">
                                {t("ads_notifications_description")}
                            </p>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <Checkbox id="messages" onCheckedChange={(checked: any) => setSettings({ ...settings, messages: checked })} checked={settings.messages} />
                        <div className="grid gap-2">
                            <Label htmlFor="messages">
                                {t("messages_notifications")}

                            </Label>
                            <p className="text-muted-foreground text-sm">
                                {t("messages_notifications_description")}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="flex  justify-end">
                    <Button disabled={isLoading} onClick={onSubmit} >
                        {t("save")}
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default NotificationsSettingForm; 