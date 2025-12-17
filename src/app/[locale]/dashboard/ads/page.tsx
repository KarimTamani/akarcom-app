
"use client"
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { redirect, useRouter } from "next/navigation";
import { PropertiesTable } from "./components/properties-table";
import PropertiesProvider from "./context/property-context";
import { PropertyDialogs } from "./components/property-dialogs";


interface Props {
    children: React.ReactNode
}

const AdsPage: React.FC<Props> = ({ }) => {

    const t = useTranslations("ads");
    const router = useRouter();

    const openCreateForm = () => {
        router.push("ads/create")
    }

    return (
        <PropertiesProvider>

            <div className="flex flex-col gap-4 h-full p-4">
                <div className='mb-2 flex flex-wrap items-center justify-between space-y-2'>
                    <div>
                        <h2 className='text-2xl font-bold tracking-tight'>{t("ads_title")} </h2>
                        <p className='text-muted-foreground'>
                            {t("ads_description")}
                        </p>
                    </div>
                    <Button
                        onClick={openCreateForm}
                    >
                        {t("create_action")}
                        <PlusIcon />
                    </Button>

                </div>
                <PropertiesTable

                />
                <PropertyDialogs/>
            </div>
        </PropertiesProvider>
    )
}


export default AdsPage; 