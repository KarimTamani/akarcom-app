"use client"
import { Property, PropertyImage, PropertyType } from "@/lib/property"
import useGetPropertyBySlug from "../../hooks/use-get-property-by-slug";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { BedDouble, Check, Heart, HeartIcon, Layers2, Mail, MessageCircleIcon, Phone, School, Share, Share2, ShowerHead, University } from "lucide-react";
import Gallery from "./gallery";
import { useCallback, useEffect, useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import PropertiesMap from "@/app/[locale]/componenets/layout/properties-map";
import { useGeoLocation } from "@/hooks/use-get-location";
import VirtualVisit from "./virtual-visit";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import api from "@/services/api";
import axios from "axios";
import PropertySkeleton from "./property-skelton";
import WhatsappIcon from "@/components/icons/whatsapp";
import FacebookIcon from "@/components/icons/facebook";
import InstagramIcon from "@/components/icons/instagram";
import TikTokIcon from "@/components/icons/tiktok";
import AdsList from "@/app/[locale]/componenets/ads-list";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/providers/auth-provider";
import usePropertyQuery from "@/app/[locale]/dashboard/ads/hooks/use-get-property-types";
import MediaDialog from "./media-dialog";




interface PropertyProps {
    slug: string;
}


const PropertyView: React.FC<PropertyProps> = ({ slug }) => {

    const { property, loading, notFound } = useGetPropertyBySlug(slug);
    const [galleryImages, setGalleryImages] = useState<any[]>([]);

    const [liked, setLiked] = useState<boolean>(false);
    const { user, openAuthDialog } = useAuth();

    const [open, setOpen] = useState<boolean>(false);
    const [urls, setUrls] = useState<string[]>([])

    const { propertyTypes, isLoading: isFetchingTypes } = usePropertyQuery(true);
    useEffect(() => {
        setLiked(property != undefined && property.favorites?.length > 0);
    }, [property]);

    useEffect(() => {
        let firstImage: any | undefined;
        let gridImages: any[] = [];

        if (!property?.property_images)
            return;


        const imageExtensions = /\.(jpg|jpeg|png|gif|webp|bmp|svg)$/i;

        const allImages = property.property_images.filter((propertyImage: PropertyImage) => imageExtensions.test(propertyImage.image_url as string));

        firstImage = { src: allImages[0].image_url, alt: property.title };

        for (let index = 1; index < Math.min(allImages.length, 5); index++) {
            gridImages.push({
                src: allImages[index].image_url,
                alt: property.title
            })
        }
        const images: any[] = [];

        if (firstImage) {
            images.push({
                images: [firstImage]
            })
        }
        if (gridImages.length > 0) {
            images.push({
                type: "grid",
                images: gridImages
            })
        }
        setGalleryImages(images);
    }, [property?.property_images])

    useEffect(() => {

        if (!property?.id)
            return;
        (async () => {

            try {
                api.put("/property/view/" + property.id)
            } catch (error) {
                console.error(error)
            }

        })()

    }, [property?.id])
    const t = useTranslations("property");

    const onLike = useCallback(async (like: boolean) => {
        if (!user) {
            openAuthDialog("signin")
            return;
        }
        try {
            const response = await api.put('property/favorite/' + property?.id)

        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error(error);
            }
        }
        setLiked(like);
    }, [property]);

    const pathname = usePathname();
    const searchParams = useSearchParams();

    const sendWhatsApp = () => {

        let phone: string | undefined = property?.users.social_media?.whatsapp;
        if (phone?.startsWith("0"))
            phone = "+213" + phone.slice(1);

        const fullUrl =
            typeof window !== "undefined"
                ? window.location.origin + pathname + (searchParams?.toString() ? `?${searchParams}` : "")
                : "";

        let message = `
            مرحبًا، شاهدت إعلانك على عقاركم. وأرغب في معرفة المزيد وربما تحديد موعد للزيارة إن أمكن.
            ${fullUrl}
            `

        message = encodeURIComponent(message);
        window.open(`https://wa.me/${phone}?text=${message}`, "_blank");
    };

    const router = useRouter();

    const openMassanger = () => {
        if (!user) {
            openAuthDialog("signin")
            return;
        }
        router.push(`/dashboard/chats/?user_id=${property?.users.id}&property_id=${property?.id}`)

    }

    const general_info_t = useTranslations("ads.create")


    useEffect(() => {
        if (property?.property_images) {
            setUrls(property.property_images.map((propertyImage: PropertyImage) => propertyImage.image_url as string));
        }
    }, [property?.property_images])
    if (loading || !property || isFetchingTypes)
        return <PropertySkeleton />;


    const flatTypes: PropertyType[] | undefined = propertyTypes?.flatMap((propertyType: PropertyType) => propertyType.other_property_types);
    const propertyType = flatTypes?.find((type: PropertyType) => type.id == property.property_type_id);

    const openDialog = (image: string) => {

        setUrls([
            image,
            ...urls.filter((value: string) => value != image)
        ])
        setOpen(true)

    }
    return (
        <div className="h-full flex flex-col gap-2" >
            <div className='mb-2 flex flex-wrap items-center justify-between space-y-2 '>
                <div>
                    <h2 className='text-2xl font-bold tracking-tight'>{property.title} </h2>
                    <p className='text-muted-foreground'>
                        {property.address}
                    </p>
                </div>
                <div className="flex gap-2">
                    {
                        /*
                    <Button>
                        {t("share")}
                        <Share2 />
                    </Button>*/
                    }
                    <Button
                        variant={"outline"}
                        onClick={(event: any) => { event.preventDefault(); onLike(!liked) }}
                        className="border-primary text-primary hover:text-primary"
                    >
                        {t("favorite")}

                        <HeartIcon className={cn('size-4', liked ? 'fill-destructive stroke-destructive' : 'stroke-primary')} />
                    </Button>
                </div>
            </div>
            <div className="-mx-2" >
                <Gallery
                    sections={galleryImages}
                    onClick={openDialog}
                />
            </div>
            <div className="grid   grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[2fr_1fr]  gap-4 ">
                <Card className="p-2 grid  rounded-md gap-0">
                    <CardHeader className="p-2 ">
                        <Label className="text-xl font-semibold">
                            {t("description")}
                        </Label>
                    </CardHeader>
                    <CardContent className="px-2 gap-3 flex flex-col">
                        <div className="flex   flex-wrap gap-2">
                            <Badge variant={"outline"} >
                                <BedDouble className="text-primary" />
                                {t("num_rooms")} {property.num_rooms}
                            </Badge>
                            <Badge variant={"outline"}>
                                <ShowerHead className="text-primary" />
                                {t("bethrooms")} {property.bethrooms}
                            </Badge>
                            <Badge variant={"outline"}>
                                <Layers2 className="text-primary" />
                                {t("area")} {property.area_sq_meters}
                            </Badge>


                            <Badge variant={"outline"} >
                                <School className="text-primary" />
                                {t("mosques")} {property.mosques}
                            </Badge>
                            <Badge variant={"outline"}>
                                <University className="text-primary" />
                                {t("schools")} {property.schools}
                            </Badge>
                        </div>
                        {
                            (property.ownership_book || property.furnished) && <>
                                <Label className="font-semibold">
                                    {t("furnisher_title")}
                                </Label>
                                <div className="flex   flex-wrap gap-2">
                                    {
                                        property.furnished &&
                                        <Badge  >
                                            {t("furnished")} <Check />
                                        </Badge>
                                    }
                                    {
                                        property.ownership_book && <Badge>
                                            {t("ownership_book")} <Check />
                                        </Badge>

                                    }
                                </div>
                            </>
                        }
                        <Label >
                            {t("condition")} : <Badge variant={"outline"}> {t(`conditions.${property.condition as string}`)} </Badge>

                        </Label>
                        <Separator />
                        <div className="text-muted-foreground flex items-center gap-1 text-sm  max-h-[320px] overflow-auto">
                            <div dangerouslySetInnerHTML={{ __html: property.description as string }} />

                        </div>
                        <Separator />
                        <div className="grid  grid-cols-1 sm:grid-cols-2 gap-4">

                            <PropertiesMap
                                properties={[property]}

                                height="300px"
                                className="rounded-md overflow-hidden border-2 border-background ring-1 ring-border "

                            />
                            <div className="px-2 space-y-2 h-full  ">

                                <div className="flex flex-col justify-evenly  h-full min-h-0">
                                    <h3 className="font-semibold">
                                        {t("general_info")}
                                    </h3>
                                    <div className=" flex justify-between ">
                                        <Label>
                                            {t("created_at")}
                                        </Label>
                                        <span className="font-semibold">{new Date(property.created_at).toLocaleDateString('en-US')} </span>
                                    </div>
                                    <div className=" flex justify-between ">
                                        <Label>
                                            {t("visitability")}
                                        </Label>
                                        <span className="font-semibold">{
                                            property.visitability ? t("yes") : t("no")
                                        } </span>
                                    </div>

                                    <div className=" flex justify-between ">
                                        <Label>
                                            {general_info_t("property_type")}
                                        </Label>
                                        <span className="font-semibold">{
                                            propertyType ? propertyType?.name : t("no")
                                        } </span>
                                    </div>
                                    <div className=" flex justify-between ">
                                        <Label>
                                            {general_info_t("buit_date")}
                                        </Label>
                                        <span className="font-semibold">{property.buit_date ? new Date(property.buit_date).toLocaleDateString('en-US') : t("no")} </span>
                                    </div>
                                    <div className=" flex justify-between ">
                                        <Label>
                                            {general_info_t("gaz")}
                                        </Label>
                                        <span className="font-semibold">{
                                            property.gaz ? t("yes") : t("no")
                                        } </span>
                                    </div>
                                    <div className=" flex justify-between ">
                                        <Label>
                                            {general_info_t("electricity")}
                                        </Label>
                                        <span className="font-semibold">{
                                            property.electricity ? t("yes") : t("no")
                                        } </span>
                                    </div>
                                    <div className=" flex justify-between ">
                                        <Label>
                                            {general_info_t("water")}
                                        </Label>
                                        <span className="font-semibold">{
                                            property.water ? t("yes") : t("no")
                                        } </span>
                                    </div>
                                </div>


                            </div>
                        </div>




                    </CardContent>
                </Card>
                <Card className=" p-2 rounded-md gap-2">
                    <CardHeader className="p-2 gap-0 pb-0">
                        <div>
                            {
                                property.add_type == "sale" &&

                                <Label className="text-xl font-semibold">
                                    {t("sale_price")}
                                </Label>

                            }
                            {
                                property.add_type == "rent" &&
                                <Label className="text-xl font-semibold">
                                    {t("rent_price")}
                                </Label>
                            }
                            <Label className="text-primary font-semibold text-md">
                                {property.price} {t("currency")} {property.add_type == "rent" ? "/" + t(property.rent_period as string) : ""}
                            </Label>
                        </div>

                    </CardHeader>
                    <Separator className="m-0" />
                    <CardContent className="px-2 gap-3 flex flex-col">
                        {
                            property.image_360_url &&
                            <VirtualVisit
                                url={property.image_360_url as string | undefined}
                            />
                        }
                        <div className="space-y-2">
                            <div className="flex gap-4 items-center ">
                                <Avatar className="h-10 w-10 border-1">
                                    <AvatarImage src={property.users.picture_url} />
                                    <AvatarFallback>{property.users.full_name.slice(0, 2).toLocaleUpperCase()}</AvatarFallback>
                                </Avatar>
                                <div>
                                    <h2 className="font-semibold">
                                        {property.users.full_name}
                                    </h2>
                                    <Label className="text-muted-foreground">
                                        {t(`user_types.${property.users.user_type}`)}
                                    </Label>
                                </div>

                            </div>
                            <Separator />
                            <div className="flex flex-col gap-2">

                                <div className="flex  items-center gap-2  truncate">
                                    <Mail className="w-8 h-8 shrink-0 text-primary bg-primary/10  p-1.5 rounded-full" />
                                    <span >
                                        {property.users.email}
                                    </span>
                                </div>
                                {
                                    property.users.phone_number &&
                                    <div className="flex  items-center gap-2">
                                        <Phone className="w-8 h-8 shrink-0 text-primary bg-primary/10  p-1.5 rounded-full" />
                                        <span>
                                            {property.users.phone_number}
                                        </span>
                                    </div>
                                }
                            </div>
                            <Button className="w-full" onClick={openMassanger}>
                                {t("message")}
                                <MessageCircleIcon />
                            </Button>
                            {
                                property.users.social_media?.whatsapp &&

                                <Button className="w-full bg-primary/20 text-primary ring-1  ring-primary hover:bg-primary/20" onClick={sendWhatsApp}>
                                    {t("whatsapp")}
                                    <WhatsappIcon
                                        className="fill-primary"
                                    />
                                </Button>
                            }
                            {
                                (property.users.social_media?.facebook || property.users.social_media?.instagram || property.users.social_media?.tiktok) &&
                                <>
                                    <Separator />

                                    <div className="flex flex-col items-center gap-4">
                                        <Label >
                                            {t("social_media")}
                                        </Label>
                                        <div className="flex w-full  justify-evenly fill-muted-foreground  ">
                                            {
                                                property.users.social_media?.facebook &&
                                                <a className=" transition-all duration-200 hover:fill-foreground" href={property.users.social_media?.facebook} target="_blank">
                                                    <FacebookIcon />
                                                </a>
                                            }
                                            {
                                                property.users.social_media?.instagram &&
                                                <a className=" transition-all duration-200 hover:fill-foreground" href={property.users.social_media?.instagram} target="_blank">
                                                    <InstagramIcon />
                                                </a>
                                            }
                                            {
                                                property.users.social_media?.tiktok &&
                                                <a className=" transition-all duration-200 hover:fill-foreground" href={property.users.social_media?.tiktok} target="_blank">
                                                    <TikTokIcon />
                                                </a>
                                            }
                                        </div>
                                    </div>

                                </>
                            }
                        </div>
                    </CardContent>
                </Card>
            </div>
            <div className="mt-20">
                <AdsList />
            </div>
            <MediaDialog
                open={open}
                onOpen={setOpen}
                urls={urls}
            />
        </div>
    )


}


export default PropertyView; 