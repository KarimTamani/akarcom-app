"use client"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useCallback, useEffect, useMemo, useState } from "react";
import useCreatePropertySchema, { PropertyImageInput } from "./hooks/use-create-properrty-schema";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, useWatch } from "react-hook-form"
import { z } from "zod"
import FormRow from "@/components/form-row";
import { Input } from "@/components/ui/input";
import { useTranslations } from "next-intl";
import { MinimalTiptap } from "@/components/ui/shadcn-io/minimal-tiptap";
import { Commune, PropertyImage, PropertyPropertyTag, PropertyType, Wilaya } from "@/lib/property";
import usePropertyQuery from "../hooks/use-get-property-types";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Checkbox } from "@/components/ui/checkbox";
import PropertyTags from "./components/property-tags";
import AddressAutoComplete, { Location } from "@/components/address-autocomplete";
import Map from "@/components/map-view";
import MultiFileUplaod from "@/components/multi-file-uploader";
import { FileMetadata, FileWithPreview } from "@/hooks/use-file-upload";
import { Button } from "@/components/ui/button";
import api from "@/services/api";
import uploadFile from "@/services/upload";
import axios from "axios";
import FileUploadCompact from "@/components/file-uploader";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "sonner";
import useGetPropertyById from "../hooks/use-get-property-by-id";
import SkeletonPropertyForm from "../components/property-form-skeleton";
import mime from 'mime-types';
import { useRouter } from "next/navigation";
import useLocations from "@/hooks/use-locations";
import { Combobox } from "@/components/ui/combobox";
import { Stepper, StepperContent, StepperDescription, StepperIndicator, StepperItem, StepperNav, StepperPanel, StepperSeparator, StepperTitle, StepperTrigger } from "@/components/ui/stepper";
import { Check, LoaderCircleIcon } from "lucide-react";
import { DatePicker } from "@/components/date-picker";


interface PropertyFormProps {
    id?: number
}

const CreatePropertyPage: React.FC<PropertyFormProps> = ({ id }) => {

    const { propertyTypes, propertyTags, isLoading: isFetchingTypes } = usePropertyQuery();
    const [step, setStep] = useState<number>(1);
 
    const [wilayaDefaultValue, setWialayaDefaultValue] = useState<Wilaya | undefined>(undefined)
    const isEdit = id !== undefined;
    const [mount, setMount] = useState<boolean>(false);
    const { property, isFetching: isFetchingProperty } = useGetPropertyById(id);

    const t = useTranslations("ads.create");
    const createPropertySchema = useCreatePropertySchema();
    const [loading, setLoading] = useState<boolean>(false);

    type CreatePropertyInput = z.infer<typeof createPropertySchema>
    const router = useRouter();

    const saveChanges = useCallback(async (propertyInput: CreatePropertyInput) => {

        setLoading(true);
        try {
            if (propertyInput.image_360_url && propertyInput.image_360_url instanceof File) {

                propertyInput.image_360_url = await uploadFile(propertyInput.image_360_url as File, true) as string;
            }

            if (propertyInput.property_images.length > 0) {
                for (let index = 0; index < propertyInput.property_images.length; index++) {
                    if (propertyInput.property_images[index].image_url instanceof File) {
                        propertyInput.property_images[index].image_url = await uploadFile(propertyInput.property_images[index].image_url as File) as string;
                    }
                }
            }

            if (!isEdit)
                await api.post("/property", propertyInput);
            else
                await api.put("/property/" + id, propertyInput);

            toast(t("toast.success.title"), {
                description: t("toast.success.description"),
                className: "!text-primary",
                descriptionClassName: "!text-primary/80"
            });
            router.replace("/dashboard/ads");

        } catch (error) {
            if (axios.isAxiosError(error)) {
                toast(t("toast.error.title"), {
                    description: t("toast.error.description"),
                    className: "!text-destructive",
                    descriptionClassName: "!text-destructive"
                })
            }
        } finally {
            setLoading(false)
        }
        //api.post("/property")
    }, [isEdit, id]);


    const defaultValues: Partial<CreatePropertyInput> = {
        title: property?.title ?? "",
        property_type_id: undefined,
        add_type: "sale",
        rent_period: "monthly",
        price: 0,
        address: "",
        city: "",
        condition: "3",
        postal_code: "",
        furnished: false,
        ownership_book: false,
        description: "",
        property_tags: [],
        property_images: [],

    }

    const form = useForm<CreatePropertyInput>({
        resolver: zodResolver(createPropertySchema as any),
        defaultValues: defaultValues,
        mode: "onTouched",
    });

    const onAddressChange = (location: Location | undefined) => {
        if (location) {
            form.setValue("address", location.address);
            form.setValue("city", location.city ?? "");
            form.setValue("postal_code", location.postal_code ?? "");
            form.setValue("latitude", location.latitude);
            form.setValue("longitude", location.longitude);
        }
    }
    // 👀 Watch the fields that influence the computed one
    const latitude = useWatch({ control: form.control, name: "latitude" });
    const longitude = useWatch({ control: form.control, name: "longitude" });
    const ad_type = useWatch({ control: form.control, name: "add_type" });
    const wilaya_id = useWatch({ control: form.control, name: "wilaya_id" });
    const commune_id = useWatch({ control: form.control, name: "commune_id" });

    const { wilayas, communes, isLoading: loadingWilayas, loadingCommune } = useLocations(wilaya_id);

    useEffect(() => {
        form.resetField("commune_id")
    }, [wilaya_id]);

    useEffect(() => {
        if (!commune_id)
            return;
        const commune: Commune | undefined = communes.find((commune: Commune) => commune.id == commune_id)

        if (commune) {
            form.setValue("postal_code", commune.postal_code)
        }

    }, [commune_id, communes])


    const isFetching = isFetchingTypes || isFetchingProperty || loadingWilayas


    let coordinates = undefined;

    if (latitude && longitude) {
        coordinates = {
            latitude,
            longitude
        }
    }
    useEffect(() => {
        if (isEdit && property && !isFetching) {

            setWialayaDefaultValue(wilayas.find((wilaya: Wilaya) => wilaya.id == property.commune?.wilaya_id));

            form.reset({
                ...property,
                property_tags: property.property_property_tags.map((property_property_tag: PropertyPropertyTag) => property_property_tag.property_tags),
                wilaya_id: wilayas.find((wilaya: Wilaya) => wilaya.id == property.commune?.wilaya_id)?.id , 
                buit_date :    property.buit_date ? new Date(property.buit_date) : undefined
                
            });

            setMount(true)
        } else if (!isEdit && !isFetching) {
            setMount(true);
        }
    }, [isEdit, property, isFetching, wilayas]);



    const defaultImages: FileMetadata[] = useMemo(() => {
        return (isEdit && property) ?
            property.property_images.map((image: PropertyImage) => {
                const url: string = (image.image_url as string);
                const name: string | undefined = url.split("/").pop()
                const type: string | false = mime.lookup(url);

                return {
                    id: image.id,
                    name: name,
                    type: type ?? "image/png",
                    url: image.image_url as string,

                } as any

            }) : []
    }, [property, isEdit])


    const steps = [
        {
            title: t("steps.step_1"), description: t("steps.step_1_description"), fields: ["title", "description", "property_type_id", "add_type", "rent_period", "price", "condition",
                "area_sq_meters", "num_rooms", "bethrooms", "furnished", "schools", "mosques", "ownership_book", "property_tags"
            ] as const,
        },
        {
            title: t("steps.step_2"), description: t("steps.step_2_description"), fields: [
                "latitude", "longitude", "address", "wilaya_id", "commune_id", "city", "postal_code"
            ] as const
        },
        {
            title: t("steps.step_3"), description: t("steps.step_3_description"), fields: [
                "image_360_url", "property_images"
            ] as const
        },
    ];

    const nextStep = async () => {
        const fields = steps[step - 1].fields;

        const isValid = await form.trigger(fields);


        if (!isValid) return;

        if (step < 3)
            setStep(step + 1);
        else {
            const data = createPropertySchema.parse(form.getValues())
            saveChanges( data as any  ) ; 
        }
    }

    if (!mount)
        return <SkeletonPropertyForm />;


    return (

        <Form {...form} >
            <form
                onSubmit={form.handleSubmit(saveChanges)}
                className={cn(' grid gap-4  ')}
            >
                <Stepper
                    defaultValue={step}
                    value={step}
                    indicators={{
                        completed: <Check className="size-4" />,
                        loading: <LoaderCircleIcon className="size-4 animate-spin" />,
                    }}
                    className="space-y-8 flex-col space-y-4 w-full  sm:max-w-full "
                >
                    <StepperNav className=" w-full lg:max-w-[860px] mt-4">
                        {steps.map((step, index) => (
                            <StepperItem key={index} step={index + 1} className="relative flex-1 items-start">
                                <StepperTrigger className="flex flex-col gap-2.5" onClick={undefined} type="button">
                                    <StepperIndicator>{index + 1}</StepperIndicator>
                                    <StepperTitle>{step.title}</StepperTitle>
                                    <StepperDescription>{step.description}</StepperDescription>
                                </StepperTrigger>

                            </StepperItem>
                        ))}
                    </StepperNav>

                    <StepperPanel>

                        <StepperContent value={1} className="flex flex-col gap-4 p-4 ">

                            <FormRow
                                label={t("ad_title")}
                                description={t("ad_title_description")}
                                className="border-b-1"
                            >
                                <FormField
                                    control={form.control}
                                    name='title'
                                    render={({ field }) => (
                                        <FormItem >
                                            <FormLabel htmlFor="title" >{t("ad_title")}</FormLabel>
                                            <FormControl>
                                                <Input placeholder={t("ad_title_placeholder")} id="title"    {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </FormRow>
                            <FormRow
                                label={t("ad_desc")}
                                description={t("ad_desc_description")}
                                className="border-b-1"
                            >
                                <FormField
                                    control={form.control}
                                    name='description'
                                    render={({ field }) => (
                                        <FormItem >
                                            <FormLabel >{t("ad_desc")}</FormLabel>
                                            <FormControl>
                                                <MinimalTiptap
                                                    content={field.value || ""}
                                                    onChange={field.onChange}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </FormRow>

                            <FormRow
                                label={t("property_type")}
                                description={t("property_type_description")}
                            >
                                <FormField
                                    control={form.control}
                                    name='property_type_id'
                                    render={({ field }) => (
                                        <FormItem >
                                            <FormLabel >{t("property_type")}</FormLabel>
                                            <FormControl>
                                                <Select
                                                    onValueChange={(value: string) => field.onChange(Number(value))}
                                                    value={field.value ? String(field.value) : ""}

                                                >
                                                    <SelectTrigger className="w-full">
                                                        <SelectValue placeholder={t("property_type_placeholder")} />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {
                                                            propertyTypes.map((propertyType: PropertyType) => (
                                                                <SelectGroup key={propertyType.id}>
                                                                    <SelectLabel>{propertyType.name}</SelectLabel>
                                                                    {
                                                                        propertyType.other_property_types.map((childType: PropertyType) => (
                                                                            <SelectItem key={childType.id} value={String(childType.id)}>{childType.name}</SelectItem>
                                                                        ))
                                                                    }
                                                                </SelectGroup>
                                                            ))
                                                        }
                                                    </SelectContent>
                                                </Select>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </FormRow>

                            <FormRow
                                label={t("ad_type")}
                                description={t("ad_type_description")}>
                                <FormField
                                    control={form.control}
                                    name='add_type'
                                    render={({ field }) => (
                                        <FormItem >
                                            <FormLabel>{t("ad_type")}</FormLabel>
                                            <FormControl>
                                                <ToggleGroup type="single" variant={"outline"} className="w-full" {...field} onValueChange={field.onChange} >
                                                    <ToggleGroupItem value="sale">{t("sale")}</ToggleGroupItem>
                                                    <ToggleGroupItem value="rent">{t("rent")}</ToggleGroupItem>
                                                </ToggleGroup>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </FormRow>

                            <FormRow
                                label={t("price")}
                                description={t("price_description")}>
                                <div className="flex gap-4">
                                    <div className="w-full">
                                        <FormField
                                            control={form.control}
                                            name='price'
                                            render={({ field }) => (
                                                <FormItem >
                                                    <FormLabel >{t("price")}</FormLabel>
                                                    <FormControl>
                                                        <Input type="number" placeholder={t("price_placeholder")}  {...field as any} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    {
                                        ad_type == "rent" &&
                                        <div className="w-full">
                                            <FormField
                                                control={form.control}
                                                name='rent_period'
                                                render={({ field }) => (
                                                    <FormItem >
                                                        <FormLabel >{t("rent_period")}</FormLabel>
                                                        <FormControl>
                                                            <Select
                                                                onValueChange={(value: string) => field.onChange(value)}
                                                                value={field.value ? String(field.value) : undefined}
                                                            >
                                                                <SelectTrigger className="w-full">
                                                                    <SelectValue placeholder={t("rent_period_placeholder")} />
                                                                </SelectTrigger>
                                                                <SelectContent>
                                                                    <SelectItem key={"monthly"} value={"monthly"}>{t("monthly")}</SelectItem>
                                                                    <SelectItem key={"yearly"} value={"yearly"}>{t("yearly")}</SelectItem>
                                                                </SelectContent>
                                                            </Select>
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>
                                    }
                                </div>

                            </FormRow>

                            <FormRow
                                label={t("condition")}
                                description={t("condition_description")}>
                                <FormField
                                    control={form.control}
                                    name='condition'
                                    render={({ field }) => (
                                        <FormItem >
                                            <FormLabel >{t("condition")}</FormLabel>
                                            <FormControl>
                                                <Select
                                                    onValueChange={(value: string) => field.onChange(value)}
                                                    value={field.value ? field.value : undefined}
                                                >
                                                    <SelectTrigger className="w-full">
                                                        <SelectValue placeholder={t("condition_placeholder")} />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem key="1" value="1">{t("conditions.new")}</SelectItem>
                                                        <SelectItem key="2" value="2">{t("conditions.excellent")}</SelectItem>
                                                        <SelectItem key="3" value="3">{t("conditions.good")}</SelectItem>
                                                        <SelectItem key="4" value="4">{t("conditions.needs_renovation")}</SelectItem>
                                                        <SelectItem key="5" value="5">{t("conditions.damaged")}</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </FormRow>
                            <FormRow
                                label={t("num_rooms")}
                                description={t("num_rooms_description")}>
                                <FormField
                                    control={form.control}
                                    name='num_rooms'
                                    render={({ field }) => (
                                        <FormItem >
                                            <FormLabel >{t("num_rooms")}</FormLabel>
                                            <FormControl>
                                                <Input type="number" placeholder={t("num_rooms_placeholder")}  {...field as any} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </FormRow>
                            <FormRow
                                label={t("bethrooms")}
                                description={t("bethrooms_description")}>
                                <FormField
                                    control={form.control}
                                    name='bethrooms'
                                    render={({ field }) => (
                                        <FormItem >
                                            <FormLabel >{t("bethrooms")}</FormLabel>
                                            <FormControl>
                                                <Input type="number" placeholder={t("bethrooms_placeholder")}  {...field as any} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </FormRow>
                            <FormRow
                                label={t("area")}
                                description={t("area_description")}>
                                <FormField
                                    control={form.control}
                                    name='area_sq_meters'
                                    render={({ field }) => (
                                        <FormItem >
                                            <FormLabel >{t("area")}</FormLabel>
                                            <FormControl>
                                                <Input type="number" placeholder={t("area_placeholder")}  {...field as any} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </FormRow>
                            <FormRow
                                label={t("schools")}
                                description={t("schools_description")}>
                                <FormField
                                    control={form.control}
                                    name='schools'
                                    render={({ field }) => (
                                        <FormItem >
                                            <FormLabel >{t("schools")}</FormLabel>
                                            <FormControl>
                                                <Input type="number" placeholder={t("schools_placeholder")}  {...field as any} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </FormRow>
                            <FormRow
                                label={t("mosques")}
                                description={t("mosques_description")}>
                                <FormField
                                    control={form.control}
                                    name='mosques'
                                    render={({ field }) => (
                                        <FormItem >
                                            <FormLabel >{t("mosques")}</FormLabel>
                                            <FormControl>
                                                <Input type="number" placeholder={t("mosques_placeholder")}  {...field as any} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </FormRow>
                            <FormRow>
                                <FormField
                                    control={form.control}
                                    name='furnished'
                                    render={({ field }) => (
                                        <FormItem className="flex justify-between">
                                            <FormLabel htmlFor="furnished">{t("furnished")}</FormLabel>
                                            <FormControl>
                                                <Checkbox id="furnished" {...field as any}
                                                    checked={!!field.value}
                                                    onCheckedChange={(checked) => field.onChange(checked)} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </FormRow>

                            <FormRow>
                                <FormField
                                    control={form.control}
                                    name='gaz'
                                    render={({ field }) => (
                                        <FormItem className="flex justify-between">
                                            <FormLabel htmlFor="gaz">{t("gaz")}</FormLabel>
                                            <FormControl>
                                                <Checkbox id="gaz" {...field as any}
                                                    checked={!!field.value}
                                                    onCheckedChange={(checked) => field.onChange(checked)} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </FormRow>


                            <FormRow>
                                <FormField
                                    control={form.control}
                                    name='water'
                                    render={({ field }) => (
                                        <FormItem className="flex justify-between">
                                            <FormLabel htmlFor="water">{t("water")}</FormLabel>
                                            <FormControl>
                                                <Checkbox id="water" {...field as any}
                                                    checked={!!field.value}
                                                    onCheckedChange={(checked) => field.onChange(checked)} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </FormRow>

                            <FormRow>
                                <FormField
                                    control={form.control}
                                    name='electricity'
                                    render={({ field }) => (
                                        <FormItem className="flex justify-between">
                                            <FormLabel htmlFor="electricity">{t("electricity")}</FormLabel>
                                            <FormControl>
                                                <Checkbox id="electricity" {...field as any}
                                                    checked={!!field.value}
                                                    onCheckedChange={(checked) => field.onChange(checked)} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </FormRow>
                            <FormRow>
                                <FormField
                                    control={form.control}
                                    name='visitability'
                                    render={({ field }) => (
                                        <FormItem className="flex justify-between">
                                            <FormLabel htmlFor="visitability">{t("visitability")}</FormLabel>
                                            <FormControl>
                                                <Checkbox id="visitability" {...field as any}
                                                    checked={!!field.value}
                                                    onCheckedChange={(checked) => field.onChange(checked)} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </FormRow>
                            <FormRow >
                                <FormField
                                    control={form.control}
                                    name='ownership_book'
                                    render={({ field }) => (
                                        <FormItem className="flex justify-between">
                                            <FormLabel htmlFor="ownership_book">{t("ownership_book")}</FormLabel>

                                            <FormControl>
                                                <Checkbox id="ownership_book"
                                                    checked={!!field.value}
                                                    onCheckedChange={(checked) => field.onChange(checked)} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </FormRow>
                            <FormRow

                                label={t("buit_date")}
                            >
                                <FormField
                                    control={form.control}
                                    name='buit_date'
                                    render={({ field }) => (
                                        <FormItem >

                                            <FormControl>
                                                <DatePicker
                                                    onValueChange={field.onChange}
                                                    defaultValue={field.value as Date | undefined }
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </FormRow>
                            <FormRow
                                label={t("property_tags")}
                                description={t("property_tags_description")}
                                className="border-b-1"
                            >
                                <FormField
                                    control={form.control}
                                    name='property_tags'
                                    render={({ field }) => (
                                        <FormItem >
                                            <FormControl>
                                                <PropertyTags
                                                    defaultTags={propertyTags}
                                                    placeholder={t("property_tags_placeholder")}
                                                    {...field as any} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </FormRow>
                        </StepperContent>

                    </StepperPanel>
                    <StepperContent value={2} className="flex flex-col gap-4 p-4 ">
                        <FormRow
                            label={t("location")}
                            description={t("location_description")}>
                            <div className="flex flex-col gap-4">
                                <AddressAutoComplete
                                    onChange={onAddressChange}
                                />
                                <FormField
                                    control={form.control}
                                    name='address'
                                    render={({ field }) => (
                                        <FormItem >
                                            <FormLabel>{t("address")}</FormLabel>
                                            <FormControl>
                                                <Input type="text" {...field} placeholder={t("address_placeholder")} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <div className="flex gap-4">
                                    <div className="w-full">
                                        <FormField
                                            control={form.control}
                                            name='wilaya_id'
                                            render={({ field }) => (
                                                <FormItem >
                                                    <FormLabel>{t("wilaya_id")}</FormLabel>
                                                    <Combobox
                                                        items={wilayas}
                                                        label="name"
                                                        selectedItem={wilayaDefaultValue?.name}
                                                        placeholder={t("wilaya_placeholder")}
                                                        onSelectionChange={(name: string) => {
                                                            field.onChange(wilayas.find((wilaya: Wilaya) => wilaya.name == name)?.id)
                                                        }}
                                                        onBlur={field.onBlur}
                                                    />
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <div className="w-full">
                                        <FormField
                                            control={form.control}
                                            name='commune_id'
                                            render={({ field }) => (
                                                <FormItem >
                                                    <FormLabel>{t("commune_id")}</FormLabel>
                                                    <FormControl>

                                                        <Combobox
                                                            items={communes}

                                                            selectedItem={communes.find((commune: Commune) => commune.id == field.value)?.name}
                                                            label="name"
                                                            placeholder={t("commune_placeholder")}
                                                            onSelectionChange={(name: string) => {
                                                                field.onChange(communes.find((commune: Commune) => commune.name == name)?.id)
                                                            }}
                                                            onBlur={field.onBlur}
                                                            isLoading={wilaya_id !== undefined && loadingCommune}
                                                            isDisabled={!wilaya_id}
                                                        />

                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="w-full">
                                        <FormField
                                            control={form.control}
                                            name='city'

                                            render={({ field }) => (
                                                <FormItem >
                                                    <FormLabel>{t("city")}</FormLabel>
                                                    <FormControl>
                                                        <Input type="text" {...field} placeholder={t("city_placeholder")} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <div className="w-full">

                                        <FormField
                                            control={form.control}
                                            name='postal_code'
                                            render={({ field }) => (
                                                <FormItem >
                                                    <FormLabel>{t("postal_code")}</FormLabel>
                                                    <FormControl>
                                                        <Input type="text" {...field} placeholder={t("postal_code_placeholder")} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                    </div>
                                </div>

                                <FormItem >
                                    <FormLabel>{t("map")}</FormLabel>
                                    <FormControl>
                                        <Map
                                            coordinates={coordinates}
                                            onChange={(location: number[]) => {
                                                form.setValue("latitude", location[0])
                                                form.setValue("longitude", location[1])
                                            }}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>



                            </div>

                        </FormRow>
                    </StepperContent>

                    <StepperContent value={3} className="flex flex-col gap-4 p-4  ">
                        <FormRow
                            label={t("property_images")}
                            description={t("property_images_description")}>

                            <FormField
                                control={form.control}
                                name='property_images'
                                render={({ field }) => (
                                    <FormItem >
                                        <FormLabel>{t("property_images")}</FormLabel>
                                        <FormControl>
                                            <MultiFileUplaod
                                                onFilesChange={(files: FileWithPreview[]) => {
                                                    field.onChange(files.map((file: FileWithPreview) => {
                                                        if (file.file instanceof File)
                                                            return { image_url: file.file as File }
                                                        else
                                                            return { id: Number(file.file.id), image_url: file.file.url };
                                                    }));
                                                }}
                                                defaultFiles={defaultImages}
                                                className="min-w-0"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                        </FormRow>

                        <FormRow
                            label={t("virtual_visit")}
                            description={t("virtual_visit_description")}>

                            <FormField
                                control={form.control}
                                name='image_360_url'
                                render={({ field }) => (
                                    <FormItem >
                                        <FormLabel>{t("virtual_visit")}</FormLabel>
                                        <FormControl>
                                            <FileUploadCompact accept=".zip,.rar,.7z,.tar,.gz"
                                                onFilesChange={(files: any) => {
                                                    if (files.length == 1) {
                                                        field.onChange(files[0].file)
                                                    } else {
                                                        field.onChange(undefined);
                                                    }
                                                }}
                                                maxSize={1024 * 1024 * 1024}
                                                placeholder={property?.image_360_url ?
                                                    <a href={property.image_360_url as string} target="_blank" className="underline">
                                                        {property.image_360_url as string}
                                                    </a> : t("virtual_visit_placeholder")}

                                                className="min-w-0 overflow-hidden"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                        </FormRow>

                    </StepperContent>



                </Stepper>

                <div className={cn("flex  pb-4 gap-4 flex-row px-4 ")}>


                    <div className="flex flex-col gap-2 flex-1  ">
                        <Button className="w-fit" variant={"outline"} type="button" disabled={step == 1} onClick={() => {
                            if (step && step !== 1)
                                setStep(step - 1);
                        }}>
                            Previous
                        </Button>
                    </div>

                    <div className="flex-4 flex">
                        <div className="flex space-y-4 w-full lg:max-w-[420px] sm:max-w-full  justify-end ">
                            {

                                <Button type={"button"} onClick={nextStep} disabled={loading}>
                                    {step == 3 ? t("save") : "Next"}
                                    {
                                        loading && <Spinner />
                                    }
                                </Button>


                            }

                        </div>
                    </div>
                </div>
            </form>
        </Form>

    )
}


export default CreatePropertyPage; 