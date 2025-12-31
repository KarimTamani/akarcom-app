"use client"
import { Card, CardAction, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"


import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import { ChartConfig, ChartContainer } from "@/components/ui/chart"
import { Badge } from "@/components/ui/badge"
import { Eye, TrendingDown, TrendingUp, Users } from "lucide-react"
import { useTranslations } from "next-intl"
import useGetGeneralStats from "../hooks/use-get-general-stat"
import { useEffect, useState } from "react"
import { AnalyticalPeriod, cn, DAY, fillPropertiesIntoGraph, fillViewsIntoGraph, Graph, graphEntiresToChartData, GraphEntry, initEmptyGraph, MONTH } from "@/lib/utils"
import { getGrowth } from "@/utils/analytics"
import { useAuth } from "@/providers/auth-provider"
import { UserType } from "@/lib/user"
const chartData = [
    { month: "January", desktop: 186, mobile: 80 },
    { month: "February", desktop: 305, mobile: 200 },
    { month: "March", desktop: 237, mobile: 120 },
    { month: "April", desktop: 73, mobile: 190 },
    { month: "May", desktop: 209, mobile: 130 },
    { month: "June", desktop: 214, mobile: 140 },
]
const chartConfig = {
    desktop: {
        label: "Desktop",
        color: "var(--primary)",
    },
    mobile: {
        label: "Mobile",
        color: "var(--chart-3)",
    },
} satisfies ChartConfig




const Analytics: React.FC = ({ }) => {

    const t = useTranslations("statistics");

    //
    const currentDate = new Date();
    const [startDate, setStartDate] = useState<Date | undefined>(undefined);
    const [endDate, setEndDate] = useState<Date | undefined>(currentDate);

    const [period, setPeriod] = useState<AnalyticalPeriod>("week");

    const [adsData, setAdsData] = useState<any[]>([]);
    const [viewsData, setViewsData] = useState<any[]>([]);


    useEffect(() => {
        if (!endDate)
            return;
        if (period == "week") {
            setStartDate(new Date(endDate.getTime() - (7 * DAY)))
        }
        if (period == "month") {
            setStartDate(new Date(endDate.getTime() - MONTH))
        }

        if (period == "year") {
            setStartDate(new Date(endDate.getTime() - 365 * DAY))
        }
    }, [period])

    const { stats, loading } = useGetGeneralStats(startDate, endDate);

    useEffect(() => {
        let views: Graph | undefined;
        let ads: Graph | undefined;

        if (!startDate || !endDate || !stats)
            return;

        let viewsGraph: Graph = initEmptyGraph(startDate, endDate, period);

        let propertiesGraph: Graph = initEmptyGraph(startDate, endDate, period);

        ads = fillPropertiesIntoGraph(stats.previous_properties, stats.current_properties, propertiesGraph);
        views = fillViewsIntoGraph(stats.previous_views, stats.currnet_views, viewsGraph);

        setAdsData(graphEntiresToChartData(ads.current, ads.previous))
        setViewsData(graphEntiresToChartData(views.current, views.previous))


    }, [stats]);


    const user_count_growth: number | undefined = getGrowth(stats?.user_count ?? 0, stats?.previous_user_count ?? 0) ?? undefined;

    let total_views: number | undefined = undefined;
    let views_growth: number | undefined = undefined;
    if (viewsData.length > 0) {
        total_views = 0;
        let previous_total: number = 0;
        viewsData.forEach((value: any) => total_views += value.current);
        viewsData.forEach((value: any) => previous_total += value.previous);

        views_growth = getGrowth(total_views, previous_total) ?? undefined
      
    } else {
        total_views = undefined
    }

    const { user } = useAuth();

    const isAdmin = user?.user_type == UserType.admin || user?.user_type == UserType.employee;


    return (
        <div className="p-4">
            <Card className="@container/card  relative overflow-hidden h-full">
                <CardHeader className=" flex flex-col   lg:flex-row lg:justify-between">
                    <div>
                        <CardTitle className="!text-2xl font-semibold ">
                            {t("general_statistics")}
                        </CardTitle>
                        <CardDescription >
                            {t("general_statistics_message")}
                        </CardDescription>
                    </div>
                    <CardAction >
                        <ToggleGroup type="single" variant={"outline"} value={period} onValueChange={setPeriod as any}>
                            <ToggleGroupItem className="h-10 min-w-24 capitalize" value="week">{t("week")}</ToggleGroupItem>
                            <ToggleGroupItem className="h-10 min-w-24 capitalize" value="month">{t("month")} </ToggleGroupItem>
                            <ToggleGroupItem className="h-10 min-w-24 capitalize" value="year">{t("year")} </ToggleGroupItem>
                        </ToggleGroup>
                    </CardAction>
                </CardHeader>

                <CardFooter className="flex-col items-start gap-4 text-sm   ">

                    <Tabs defaultValue="ads" className="w-full ">
                        <div className=" flex rtl:justify-end">
                            <TabsList >
                                <TabsTrigger className="min-w-24" value="ads">{t("ads")}</TabsTrigger>
                                <TabsTrigger className="min-w-24" value="views">{t("views")}</TabsTrigger>
                                {

                                    //<TabsTrigger className="min-w-24" value="revenue">{t("revenue")}</TabsTrigger>
                                }
                            </TabsList>
                        </div>

                        <div className="grid grid-rows-2 lg:grid-rows-1 lg:[grid-template-columns:25%_1fr] gap-4 py-4 pb-0 mt-2 border-t-1 rtl:grid-cols-[1fr_25%] ">

                            <div className="grid grid-rows-2 gap-4 rtl:order-2">
                                <Card className="@container/card relative overflow-hidden">
                                    <CardHeader >
                                        <CardDescription>{t("views")}</CardDescription>
                                        <CardTitle className="!text-4xl font-semibold tabular-nums @[250px]/card:text-3xl">
                                            {total_views}
                                        </CardTitle>
                                        <CardAction>
                                            <Eye />
                                        </CardAction>
                                    </CardHeader>
                                    <CardFooter className="flex items-stretch justify-between gap-1.5 text-sm ">
                                        <div>
                                            <div className="line-clamp-1 flex gap-2 font-medium ">
                                                {t("this")} {t(period)}
                                                {
                                                    views_growth !== undefined && views_growth != 0 &&
                                                    <Badge variant={"default"} className={cn({ "bg-chart-1": views_growth < 0 })} >
                                                        {views_growth > 0 ? <TrendingUp /> : <TrendingDown />}
                                                        {views_growth * 100}%
                                                    </Badge>
                                                }
                                            </div>
                                        </div>
                                    </CardFooter>
                                </Card>
                                {
                                    isAdmin && 
                                    <Card className="@container/card relative overflow-hidden">
                                        <CardHeader >
                                            <CardDescription>{t("sign_ups")}</CardDescription>
                                            <CardTitle className="!text-4xl font-semibold tabular-nums @[250px]/card:text-3xl">
                                                {stats?.user_count}
                                            </CardTitle>
                                            <CardAction>
                                                <Users />
                                            </CardAction>
                                        </CardHeader>
                                        <CardFooter className="flex items-stretch justify-between gap-1.5 text-sm ">
                                            <div>
                                                <div className="line-clamp-1 flex gap-2 font-medium ">
                                                    {t("this")} {t(period)}
                                                    {
                                                        user_count_growth !== undefined && user_count_growth != 0 &&
                                                        <Badge variant={"default"} className={cn({ "bg-chart-1": user_count_growth < 0 })} >
                                                            {user_count_growth > 0 ? <TrendingUp /> : <TrendingDown />}
                                                            {user_count_growth * 100}%
                                                        </Badge>
                                                    }
                                                </div>
                                            </div>
                                        </CardFooter>
                                    </Card>
                                }
                            </div>


                            <TabsContent value="ads" className="w-full min-h-[320px]  flex  items-center rtl:justify-end ">

                                <ChartContainer config={chartConfig} className="min-h-[320px] max-h-[320px] w-full  lg:max-w-[50%] w-full">
                                    <BarChart accessibilityLayer data={adsData}>
                                        <CartesianGrid vertical={false} />

                                        <Bar
                                            dataKey="current"
                                            stackId="a"
                                            fill="var(--color-desktop)"
                                            radius={[0, 0, 4, 4]}
                                            maxBarSize={48}
                                        />
                                        <Bar
                                            dataKey="previous"
                                            stackId="a"
                                            fill="var(--color-mobile)"
                                            radius={[4, 4, 0, 0]}
                                            maxBarSize={48}
                                        />
                                        <XAxis
                                            dataKey="month"
                                            tickLine={false}
                                            tickMargin={10}
                                            axisLine={false}

                                        />
                                    </BarChart>
                                </ChartContainer>


                            </TabsContent>
                            <TabsContent value="views" className="w-full min-h-[320px]  flex  items-center rtl:justify-end ">
                                <ChartContainer config={chartConfig} className="min-h-[320px] max-h-[320px] w-full  lg:max-w-[50%]  w-full">
                                    <BarChart accessibilityLayer data={viewsData}>
                                        <CartesianGrid vertical={false} />

                                        <Bar
                                            dataKey="current"
                                            stackId="a"
                                            fill="var(--color-desktop)"
                                            radius={[0, 0, 4, 4]}
                                            maxBarSize={48}
                                        />
                                        <Bar
                                            dataKey="previous"
                                            stackId="a"
                                            fill="var(--color-mobile)"
                                            radius={[4, 4, 0, 0]}
                                            maxBarSize={48}
                                        />
                                        <XAxis
                                            dataKey="month"
                                            tickLine={false}
                                            tickMargin={10}
                                            axisLine={false}

                                        />
                                    </BarChart>
                                </ChartContainer>

                            </TabsContent>

                        </div>
                    </Tabs>
                </CardFooter>
            </Card>
        </div>
    )
}


export default Analytics 