import LongText from "@/components/long-text"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Carousel, CarouselApi, CarouselContent, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { useIsMobile } from "@/hooks/use-mobile"
import { useRouter } from "@/i18n/navigation"
import { Property, PropertyImage, PropertyType } from "@/lib/property"
import { cn } from "@/lib/utils"
import { useAuth } from "@/providers/auth-provider"
import api from "@/services/api"
import axios from "axios"
import { BedDouble, HeartIcon, Layers2, MapPin, ShowerHead } from "lucide-react"
import { useTranslations } from "next-intl"
import { useCallback, useEffect, useMemo, useState } from "react"



interface Props {
    property: Property;
    orientation?: "horizontal" | "vertical";
    propertyTypes?: PropertyType[]
}


const AdCard: React.FC<Props> = ({ property, orientation = "vertical", propertyTypes }) => {
    const [liked, setLiked] = useState<boolean>(property.favorites?.length > 0);
    const [images, setImages] = useState<string[]>([]);
    const [propertyType, setPropertyType] = useState<PropertyType | undefined>(undefined);

    const { user, openAuthDialog } = useAuth();

    useEffect(() => {
        const flatTypes: PropertyType[] | undefined = propertyTypes?.flatMap((propertyType: PropertyType) => propertyType.other_property_types);

        setPropertyType(
            flatTypes?.find((type: PropertyType) => type.id == property.property_type_id)
        )
    }, [propertyTypes]);


    useEffect(() => {
        const imageExtensions = /\.(jpg|jpeg|png|gif|webp|bmp|svg)$/i;
        const urls: string[] = property.property_images.map((propertyImage: PropertyImage) => propertyImage.image_url as string);


        const imageUrls = urls.filter((url: any) => imageExtensions.test(url));

        setImages(imageUrls);
    }, [property.property_images])

    const t = useTranslations("components.card")


    const onLike = useCallback(async (like: boolean) => {
        if (!user) {
            openAuthDialog("signin")
            return;
        }

        try {
            const response = await api.put('property/favorite/' + property.id)

        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error(error);
            }
        }
        setLiked(like);
    }, [property, user]);

    const router = useRouter();

    const isMobile = useIsMobile();
    const [crouselApi, setApi] = useState<CarouselApi | null>(null)

    return (

        <a href={orientation == "horizontal" ? "/property/" + property.slug : undefined}
            className="group"
        >

            <Card className={cn("w-72 p-0 rounded-lg overflow-hidden relative  flex gap-0 shadow-md my-2",
                (orientation == "horizontal" && !isMobile) && "w-full flex flex-row mt-0 !mb-4 hover:shadow-lg", {
                "w-full": isMobile
            })}>
                {

                    <Carousel className={cn("w-full relative", { "w-120": orientation == "horizontal" && !isMobile })}
                        opts={{
                            align: "start",
                        }}
                        orientation={"horizontal"}

                        dir="ltr"
                        setApi={setApi}
                        onClick={(event : any) => {
                            event.preventDefault() ; 
                        }}


                    >
                        <CarouselContent className="-mt-1 " >
                            {
                                images.map((image: string) => (

                                    <img
                                        src={image as string}
                                        alt='Banner'
                                        className={cn('aspect-video h-60 w-full object-cover shrink-0', (orientation == "horizontal" && !isMobile) && "w-full")}
                                    />
                                ))
                            }
                        </CarouselContent >
                        <CarouselPrevious className="absolute top-[50%] left-2 -translate-Y-[50%] flex lg:hidden group-hover:flex" onClick={(event: any) => {
                            crouselApi?.scrollPrev();
                            event.preventDefault();
                        }} />
                        <CarouselNext className="absolute top-[50%] right-2 -translate-Y-[50%] flex lg:hidden group-hover:flex" onClick={(event: any) => {
                            crouselApi?.scrollNext();
                            event.preventDefault();
                        }} />
                    </Carousel>
                }
                {
                    orientation == "vertical" &&
                    <Badge className="absolute top-50 right-2 rounded-sm backdrop-blur-sm bg-primary/40 dark:text-white" variant={"default"}>
                        {property.add_type == "sale" ? t("for_sale") : t("to_rent")}
                    </Badge>
                }

                <CardContent className=" h-full p-0 rounded-sm   bg-transparent overflow-hidden p-3 w-full">

                    <div className="text-primary flex items-center justify-between ">
                        <div className=" shrink-0 text-primary  font-semibold">
                            {property.price} DA
                        </div>
                        <Button
                            size='icon'
                            onClick={(event: any) => { event.preventDefault(); onLike(!liked) }}
                            className='bg-primary/10 hover:bg-primary/20  w-8 h-8 rounded-full '
                        >
                            <HeartIcon className={cn('size-4', liked ? 'fill-destructive stroke-destructive' : 'stroke-primary')} />
                            <span className='sr-only'>Like</span>
                        </Button>


                    </div>
                    <LongText className="font-bold w-full">
                        {property.title}
                    </LongText>
                    <div className="text-muted-foreground flex items-center gap-1 text-sm ">
                        <MapPin className="w-4  h-4 shring-0 min-w-4 " />
                        <LongText className={cn("w-full max-w-60", orientation == "horizontal" && "!max-w-full")}>
                            {property.address}
                        </LongText>
                    </div>
                    {
                        orientation == "horizontal" &&
                        <div className="text-muted-foreground flex items-center gap-1 text-sm py-2 border-b mb-2">
                            <div dangerouslySetInnerHTML={{ __html: property.description as string }} className="h-20 max-h-20 overflow-hidden" />

                        </div>
                    }
                    <div className="flex py-1 gap-2">
                        {
                            propertyType && orientation == "horizontal" &&

                            <div >
                                <Badge variant={"default"} className="bg-primary/10 text-primary">
                                    {propertyType.name} / {property.add_type == "sale" ? t("for_sale") : t("to_rent")}

                                </Badge>
                            </div>
                        }
                        <Badge variant={"outline"}>
                            <Layers2 />
                            {property.area_sq_meters} {t("area_unit")}
                        </Badge>
                        <Badge variant={"outline"}>
                            <BedDouble />
                            {property.num_rooms}

                        </Badge>
                        <Badge variant={"outline"}>
                            <ShowerHead />
                            {property.bethrooms}

                        </Badge>
                    </div>

                    {
                        orientation == "vertical" &&

                        <div className="flex py-1 gap-2 items-center justify-between ">
                            <Button
                                variant={"default"}
                                className="w-full dark:text-white"
                                onClick={() => router.push(`/property/${property.slug}`)}
                            >
                                {t("view_details")}

                            </Button>

                        </div>
                    }
                </CardContent>
            </Card>
        </a >


    )
}


export default AdCard