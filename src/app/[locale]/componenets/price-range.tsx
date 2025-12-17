import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useTranslations } from "next-intl";
import { useEffect, useMemo, useState } from "react";




interface Props {
    onChange?: (min: number | undefined, max: number | undefined) => void;
    minPrice?: number | undefined;
    maxPrice?: number | undefined;

}


const PriceRange: React.FC<Props> = ({ onChange, minPrice, maxPrice }) => {
    const t = useTranslations("components.price_range")
    const [open, setOpen] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);
    const [range, setRange] = useState<{ min: number | undefined, max: number | undefined }>({
        min: undefined,
        max: undefined
    });

    useEffect(() => {
        setRange({
            ...range,
            min: minPrice
        })
    }, [minPrice])

    useEffect(() => {
        setRange({
            ...range,
            max: maxPrice
        })
    }, [maxPrice]);


    const clear = () => {
        setRange({
            min: undefined,
            max: undefined
        });
        onChange && onChange(undefined, undefined);
        setOpen(false)
    }

    useEffect(() => {
        if (range.min == undefined || range.max == undefined) {
            setError(false);
            return;
        }
        setError(range.max < range.min)
    }, [range]);



    const onOpenChange = (value: boolean) => {
        
        
        if (open && !value) {
            onChange && onChange(range.min , range.max)
            
        }

        setOpen(value) ; 
    }
    return (
        <Popover
            open={open}
            onOpenChange={onOpenChange}
        >
            <PopoverTrigger asChild>
                <Button variant="outline" className="bg-transparent w-full text-start hover:bg-transparent">
                    <span className="w-full">
                        {
                            range.min && !range.max && !error &&
                            t("min_price") + " : " + range.min
                        }
                        {
                            !range.min && range.max && !error &&
                            t("max_price") + " : " + range.max
                        }
                        {
                            range.min && range.max && !error &&
                            `${range.min} DA - ${range.max} DA`
                        }
                        {
                            ((!range.min && !range.max) || error) &&
                            t("placeholder")
                        }
                    </span>
                </Button>
            </PopoverTrigger>
            <PopoverContent className="min-w-[360px]">
                <div className="flex gap-2">
                    <div className="space-y-2 items-center gap-4">
                        <Label htmlFor="min">{t('min_price')}</Label>
                        <Input
                            id="min"
                            type="number"
                            className="col-span-2 h-8"
                            value={range.min}
                            onChange={(event: any) => {
                                setRange({
                                    ...range,
                                    min: event.target.value == 0 ? undefined : Number(event.target.value)
                                })
                            }}
                            placeholder={t('input_placeholder')}

                        />
                    </div>
                    <div className="space-y-2 items-center gap-4">
                        <Label htmlFor="max">{t('max_price')}</Label>
                        <Input
                            id="max"
                            type="number"
                            value={range.max}

                            className="col-span-2 h-8"
                            onChange={(event: any) => {
                                setRange({
                                    ...range,
                                    max: event.target.value == 0 ? undefined : Number(event.target.value)
                                })
                            }}
                            placeholder={t('input_placeholder')}

                        />
                    </div>

                </div>
                {
                    error &&
                    <p className="mt-2 text-sm text-destructive">
                        {t("error")}
                    </p>
                }
                <div className="flex justify-between mt-4">
                    <Button variant={"outline"} className="w-24" onClick={clear}>
                        {t("clear")}
                    </Button>
                    <Button className="w-24" onClick={() => onOpenChange(false)} disabled={error}>
                        {t("done")}
                    </Button>
                </div>
            </PopoverContent>
        </Popover>
    )
}


export default PriceRange; 