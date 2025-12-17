

import { ProgressSegments } from "@/components/progress-segments"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { FileText, House, Mails, TrendingDown, TrendingUp } from "lucide-react"
import { useLocale, useTranslations } from "next-intl"
import { Stats } from "../hooks/use-get-stats"

import { cn } from "@/lib/utils"
import { getGrowth, getPeriodBetweenDates } from "@/utils/analytics"
import { useAuth } from "@/providers/auth-provider"
import { UserType } from "@/lib/user"


interface Props {
  stats: Stats,
  period: "day" | "week" | "month" | "year";
  value: number
}

const colors = [
  undefined,
  "bg-[#56CDAD]",
  "bg-[#26A4FF]",
  "bg-[#FFB836]",
  "bg-[#FF6550]",
]



export const CardSection: React.FC<Props> = ({ stats, period, value }) => {

  const t = useTranslations("statistics");

  const { user } = useAuth();

  let other_total: number | undefined = undefined;
  let all_total: number = 0;


  stats.new_properties?.map((stat: any) => all_total += stat.count);
  if (stats.new_properties) {

    stats.new_properties = stats.new_properties?.sort((a, b) => b.count - a.count)

    if (all_total)
      stats.new_properties = stats.new_properties.map((stat: any, currenIndex: number) => {
        let previous_percentage = 0;
        for (let index = 0; index < currenIndex; index++) {
          previous_percentage += stats.new_properties?.[index].count ? (stats.new_properties?.[index].count / all_total) : 0
        }
        stat.percentage = previous_percentage + (stat.count / all_total);
        return stat;
      })
    if (stats.new_properties.length > 5) {
      other_total = 0;
      stats.new_properties.slice(5).forEach((stat: any) => other_total += stat.count)
    }
    stats.new_properties = stats.new_properties?.slice(0, 5);

  }

  const pending_properties_growth: number | null = getGrowth(stats.pending_properties, stats.previous_pending);
  const pending_messages_growth: number | null = getGrowth(stats.pending_messages, stats.previous_messages);


  const isAdmin = user?.user_type == UserType.admin || user?.user_type == UserType.employee;


  const locale = useLocale();

  return (
    <div className={cn("grid  gap-4 px-4 ", {
      "grid-rows-2 lg:grid-rows-1 lg:[grid-template-columns:25%_1fr]" : isAdmin , 
      "!grid-cols-1": !isAdmin,

    })}>

      <div className={cn(  isAdmin ?  "grid grid-rows-2 gap-2" : "grid gap-2 md:grid-cols-2 grid-rows-1" )}>
        <div >
          <Card className="@container/card relative overflow-hidden">
            <CardHeader >
              <CardDescription>{t("pending_ads")}</CardDescription>
              <CardTitle className="!text-4xl font-semibold tabular-nums @[250px]/card:text-3xl">
                {stats.pending_properties}
              </CardTitle>
              {
                pending_properties_growth &&
                <CardAction>
                  <Badge variant={"default"} className={cn({ "bg-chart-1": pending_properties_growth < 0 })} >
                    {pending_properties_growth > 0 ? <TrendingUp /> : <TrendingDown />}
                    {pending_properties_growth * 100}%
                  </Badge>
                </CardAction>
              }
            </CardHeader>

            <CardFooter className="flex items-stretch justify-between gap-1.5 text-sm h-12">
              {
                pending_properties_growth &&
                <div>
                  <div className="line-clamp-1 flex gap-2 font-medium ">
                    {pending_properties_growth > 0 ? t("tending_up") : t("tending_down")} {t(period)} <TrendingUp className="size-4" />
                  </div>
                  <div className="text-muted-foreground">
                    {t("comparison", { key: t("ads"), value, period: t(period) })}
                  </div>
                </div>
              }
              <div>
                <FileText className="size-18 absolute ltr:right-4 -bottom-4 text-secondary rtl:left-4" />
              </div>
            </CardFooter>

          </Card>
        </div>
        <div >
          <Card className="@container/card  relative overflow-hidden">
            <CardHeader>
              <CardDescription>{t("pending_messages")}</CardDescription>
              <CardTitle className="!text-4xl font-semibold tabular-nums @[250px]/card:text-3xl">
                {stats.pending_messages}
              </CardTitle>
              {
                pending_messages_growth &&
                <CardAction>
                  <Badge variant={"default"} className={cn({ "bg-chart-1": pending_messages_growth < 0 })} >
                    {pending_messages_growth > 0 ? <TrendingUp /> : <TrendingDown />}
                    {pending_messages_growth * 100}%
                  </Badge>
                </CardAction>
              }
            </CardHeader>
            <CardFooter className="flex-col items-start gap-1.5 text-sm h-12">
              {
                pending_messages_growth &&
                <div>
                  <div className="line-clamp-1 flex gap-2 font-medium">
                    {pending_messages_growth > 0 ? t("tending_up") : t("tending_down")} {t(period)} <TrendingUp className="size-4" />
                  </div>
                  <div className="text-muted-foreground">
                    {t("comparison", { key: t("messages"), value, period: t(period) })}
                  </div>
                </div>
              }
              <div>
                <Mails className="size-18 absolute ltr:right-4 -bottom-4 text-secondary rtl:left-4" />
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>

      {
        isAdmin &&
        <div className="lg:w-[50%] md:w-full w-full">
          <Card className="@container/card  relative overflow-hidden h-full">
            <CardHeader>
              <CardDescription >{t("new_ads")}</CardDescription>
              <CardTitle className="!text-6xl font-semibold tabular-nums @[250px]/card:text-3xl ">
                {all_total}
              </CardTitle>

            </CardHeader>
            <CardFooter className="flex-col items-start gap-4 text-sm">
              <ProgressSegments
                className="h-4 rounded-md bg-secondary"
                segments={

                  stats.new_properties?.map((stat: any, index: number) => {
                    return { value: stat.percentage * 100, color: colors[index] } as any
                  }) as any ?? []
                }
              />

              <div className="grid grid-cols-2 grid-rows-3 gap-4 p-4">

                {
                  stats.new_properties?.map((stat: any, index: number) => (

                    <div >
                      <div className="flex gap-2 items-center">
                        <Badge
                          className={cn(" w-6 h-6 rounded-sm ", colors[index] == undefined ? "bg-primary" : colors[index])}
                        />
                        <span className="text-muted-foreground">
                          {locale == "en" ? stat.type.name : (locale == "ar" ? stat.type.name_ar : stat.type.name_fr)} : <b className="text-foreground">{stat.count}</b>
                        </span>
                      </div>
                    </div>
                  ))
                }

                {
                  other_total &&
                  <div >
                    <div className="flex gap-2 items-center">
                      <Badge
                        className="bg-secondary w-6 h-6 rounded-sm"
                      />
                      <span className="text-muted-foreground">
                        {t("others")} : <b className="text-foreground">{other_total}</b>
                      </span>
                    </div>
                  </div>
                }
              </div>


            </CardFooter>
            <House className="size-24 absolute ltr:right-4 -bottom-4 text-secondary rtl:left-4" />
          </Card>
        </div>
      }

    </div>

  )
}
