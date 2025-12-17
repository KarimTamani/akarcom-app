
"use client"
import { useTranslations } from "next-intl";
import { PropertiesTable } from "../ads/components/properties-table";
import PropertiesProvider from "../ads/context/property-context";




const Favorite: React.FC = ({ }) => {

    const t = useTranslations("favorite")
    return (
        <PropertiesProvider favorite >

            <div className="flex flex-col gap-4 h-full p-4">
                <div className='mb-2 flex flex-wrap items-center justify-between space-y-2'>
                    <div>
                        <h2 className='text-2xl font-bold tracking-tight'>{t("title")} </h2>
                        <p className='text-muted-foreground'>
                            {t("description")}
                        </p>
                    </div>

                </div>
                <PropertiesTable

                />

            </div>
        </PropertiesProvider>
    )
}


export default Favorite; 