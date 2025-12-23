"use client"
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useState } from "react";
import CreatePlanDialog from "./componenets/create-plan-dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/providers/auth-provider";
import { UserType } from "@/lib/user";
import SubscriptionPlanTable from "./componenets/subscription-plan-table/subscription-plan-table";
import SubscriptionPlansProvider from "./context/subscription-plan-context";




const SubscriptionPage: React.FC = ({ }) => {
    const t = useTranslations("subscriptions");
    const [open, setOpen] = useState<boolean>(false);

    const locale = useLocale();

    const { user } = useAuth();

    const isAdmin = user?.user_type == UserType.admin;


    const wrapper = (nodes : React.ReactNode) => {
        if ( isAdmin) 
        return(
            
        <SubscriptionPlansProvider>
            {nodes}
        </SubscriptionPlansProvider>
        )
    }

    return (
        wrapper(
            <div className="flex flex-col gap-4 h-full p-4">
                <div className='mb-2 flex flex-wrap items-center justify-between space-y-2'>
                    <div>
                        <h2 className='text-2xl font-bold tracking-tight'>{t("title")} </h2>
                        <p className='text-muted-foreground'>
                            {t("description")}
                        </p>
                    </div>
                    <Button
                        onClick={() => setOpen(true)}
                    >
                        {t("create_action")}
                        <PlusIcon />
                    </Button>
                </div>
                {
                    isAdmin ?
                        <Tabs defaultValue="plans" className="w-full space-y-2"
                            dir={locale == "ar" ? "rtl" : "ltr"}>
                            <div className=" flex w-full justify-between mb-4 border-b-1 pb-4">
                                <TabsList >
                                    <TabsTrigger className="min-w-32 px-8" value="subscriptions">{t("subscriptions")}</TabsTrigger>
                                    <TabsTrigger className="min-w-32 px-8" value="plans">{t("plans")}</TabsTrigger>
                                </TabsList>
                            </div>
                            <TabsContent value="subscriptions" >

                            </TabsContent>
                            <TabsContent value="plans">
                                <SubscriptionPlanTable />
                            </TabsContent>
                        </Tabs>
                        : <></>
                }


                <CreatePlanDialog
                    open={open}
                    setOpen={setOpen}
                />
            </div> 
        )

    )
}


export default SubscriptionPage; 