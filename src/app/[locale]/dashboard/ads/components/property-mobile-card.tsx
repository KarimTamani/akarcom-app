"use client"
import { Card, CardAction, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Property, PropertyStatus, PropertyType } from "@/lib/property"
import React from "react"
import { DataTableRowActions } from "./data-table-row-actions"
import { Row } from "@tanstack/react-table"
import LongText from "@/components/long-text"
import { Label } from "@/components/ui/label"
import { useTranslations } from "next-intl"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { useProperty } from "../context/property-context"




interface Props {
    row: Row<Property>;
    propertyTypes: PropertyType[]
}




const PropertyMobileCard: React.FC<Props> = ({ row, propertyTypes }) => {

    const property: Property = row.original;

    const flatTypes: PropertyType[] = propertyTypes.flatMap((propertyType: PropertyType) => propertyType.other_property_types);
    const propertyType: PropertyType | undefined = flatTypes.find((type: PropertyType) => type.id == property.property_type_id) as PropertyType;



    const status = row.getValue("status");
    let bgClass: string | undefined;
    if (status == PropertyStatus.published) {
        bgClass = "bg-primary text-white"
    }

    if (status == PropertyStatus.closed) {
        bgClass = "bg-chart-4 text-white"
    }
    if (status == PropertyStatus.rejected) {
        bgClass = "bg-chart-1 text-white"
    }

    const { favorite } = useProperty();
    const t = useTranslations("ads.columns")
    return (
        <Card className="rounded-md p-4 gap-2">
            <CardHeader className="px-2 ">
                <CardTitle className=" h-8 flex items-center ">
                    <LongText className="w-full ">
                        {property.title}



                    </LongText>
                </CardTitle>
                <CardAction>
                    <DataTableRowActions row={row} />
                </CardAction>

            </CardHeader>
            <CardContent className="flex justify-between px-2 ">
                <div className="space-y-2">
                    <p className="text-muted-foreground">
                        {t("created_by")}
                    </p>
                    <Label className="font-semibold">
                        {property.users.full_name}
                    </Label>
                </div>

                <div className="space-y-2">
                    <p className="text-muted-foreground">
                        {t("property_type_id")}
                    </p>
                    <Label className="font-semibold">
                        {
                            propertyType ? propertyType.name : "Uknown type"
                        }
                    </Label>
                </div>

                <div className="space-y-2">
                    <p className="text-muted-foreground">
                        {t("add_type")}
                    </p>
                    <Label className="font-semibold">
                        {t(`ad_types.${property.add_type}`)}
                    </Label>
                </div>
            </CardContent>
            {
                !favorite &&
                <CardFooter className="flex justify-between px-2 mt-2">

                    <Badge className={cn('flex items-center gap-x-2 shrink-0 ', bgClass)} variant={"outline"}>
                        <span className='text-sm capitalize'> {t(`property_status.${row.getValue("status")}`)}    </span>
                    </Badge>
                </CardFooter>
            }
        </Card>
    )
}

export default React.memo(PropertyMobileCard); 