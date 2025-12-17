"use client"
import { DatePicker } from "@/components/date-picker";
import { Label } from "@/components/ui/label";
import { CardSection } from "./componenets/card-section";
import Analytics from "./componenets/analaytics";
import { useTranslations } from "next-intl";
import { useAuth } from "@/providers/auth-provider";
import { useState } from "react";
import useGetStats from "./hooks/use-get-stats";
import { getPeriodBetweenDates, toLocalISODate } from "@/utils/analytics";
import { MONTH } from "@/lib/utils";

const StatisticsPage: React.FC = ({ }) => {

    const t = useTranslations("statistics")
    const { user } = useAuth();

    const currentDate = new Date();

    const [startDate, setStartDate] = useState<Date>(new Date(currentDate.getTime() - MONTH));
    const [endDate, setEndDate] = useState<Date>(new Date());

    const { stats, loading } = useGetStats(startDate, endDate);
    const { period, value } = getPeriodBetweenDates(startDate, endDate)
    
    return (

        <div className="flex flex-col  gap-4">
            <div className="flex flex-col items-start justify-between px-6 py-6 sm:flex-col sm:items-start gap-4 md:flex-row">
                <div className="space-y-1">
                    <h3 className="text-2xl font-semibold">
                        {t("welcome")} {user?.full_name} !
                    </h3>
                    <p className="text-muted-foreground text-md lg:flex md:hidden">
                        {t("welcome_message", {
                            from:
                                startDate ? toLocalISODate(startDate) : "-"
                            , to:
                                endDate ? toLocalISODate(endDate) : "-"
                        })}

                    </p>
                </div>
                <div className="flex gap-2">
                    <div className="space-y-2">
                        <Label>
                            {t('from_date')}
                        </Label>
                        <DatePicker
                            onValueChange={(date: Date | undefined) => {
                                if (date != undefined)
                                    setStartDate(date)
                            }}
                            defaultValue={startDate}
                            disbaleEmptyDate
                        />
                    </div>
                    <div className="space-y-2">
                        <Label>
                            {t('to_date')}
                        </Label>
                        <DatePicker

                            onValueChange={(date: Date | undefined) => {
                                if (date != undefined)
                                    setEndDate(date)
                            }}
                            defaultValue={endDate}
                            disbaleEmptyDate
                        />
                    </div>
                </div>
            </div>
            <div className="flex flex-1 flex-col">
                <div className="@container/main flex flex-1 flex-col gap-2">
                    <div className="flex flex-col gap-4 md:gap-6  ">
                        {
                            stats &&
                            <CardSection
                                stats={stats}
                                value={value} 
                                period={period as any }
                            />
                        }
                        <Analytics />
                    </div>
                </div>
            </div>


        </div>

    )
}

export default StatisticsPage; 