"use client"
import AvatarUpload from "@/components/avatar-upload";
import CoverUpload from "@/components/cover-uploader";
import { DatePicker } from "@/components/date-picker";
import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { FileWithPreview } from "@/hooks/use-file-upload";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocale, useTranslations } from "next-intl";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { cn } from "@/lib/utils";
import uploadFile from "@/services/upload";
import api from "@/services/api";
import { toast } from "sonner";
import { BusinessAccount, User, UserType } from "@/lib/user";
import axios from "axios";
import useFormSchema from "../hooks/use-account-form-schema";
import CreateBusinessAccount from "./create-business-account";


interface Props {
    user: User,
    onChange?: (user: User) => void
}

const AccountSettingForm: React.FC<Props> = ({ user, onChange }) => {

    const [loading, setLoading] = useState<boolean>(false);

    const t = useTranslations("account");
    const editUserSchema = useFormSchema(user);
    const [isBusiness, setIsBusiness] = useState<boolean>((user.user_type == UserType.agency || user.user_type == UserType.developer || user.user_type == UserType.admin))

    useEffect(() => {
        setIsBusiness((user.user_type == UserType.agency || user.user_type == UserType.developer || user.user_type == UserType.admin));
    }, [user])


    const defaultValues = useMemo(() => {
        return {
            full_name: user.full_name,
            email: user.email,
            birthday: user.birthday ? new Date(user.birthday) : undefined,
            gender: user.gender || false,
            phone_number: user.phone_number,
            picture_url: user.picture_url ?? undefined,
            social_media: {
                facebook: user.social_media?.facebook ?? undefined,
                instagram: user.social_media?.instagram ?? undefined,
                tiktok: user.social_media?.tiktok ?? undefined,
                whatsapp: user.social_media?.whatsapp ?? undefined
            },
            business_accounts: isBusiness ? {
                agency_name: user.business_accounts?.agency_name ?? "",
                business_address: user.business_accounts?.business_address ?? "",
                cover_picture_url: user.business_accounts?.cover_picture_url ?? null,
            } : undefined
        } as any
    }, [isBusiness])

    const form = useForm<z.infer<typeof editUserSchema>>({
        resolver: zodResolver(editUserSchema as any),
        defaultValues,
    });


    useEffect(() => {
        form.reset(defaultValues)
    }, [defaultValues])

    const saveChanges = useCallback(async (userInput: z.infer<typeof editUserSchema>) => {

        setLoading(true);

        if (userInput.picture_url instanceof File) {
            userInput.picture_url = await uploadFile(userInput.picture_url as File);
        }
        if (userInput.business_accounts?.cover_picture_url instanceof File) {
            userInput.business_accounts.cover_picture_url = await uploadFile(userInput.business_accounts.cover_picture_url as File);
        }

        try {
            const response = await api.put("/users", userInput);
            const { data } = response.data;

            onChange && onChange(data)
            if (response.data && response.status == 200) {
                toast(t("success.profile_updated"), {
                    description: t("success.profile_updated_description"),
                    className: "!text-primary",
                    descriptionClassName: "!text-primary/80"
                });
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                toast(t("errors.failed_to_load"), {
                    description: t("errors.failed_to_load_description"),
                    className: "!text-destructive",
                    descriptionClassName: "!text-destructive"
                })
            }
        } finally {
            setLoading(false);
        }
    }, [])

    return (
        <div className="flex flex-col gap-4 ">
            <Form {...form} >
                <form
                    onSubmit={form.handleSubmit(saveChanges)}
                    className={cn(' grid gap-4  ')}
                >

                    <div className="py-4 border-b-1 ">
                        <h3 className="text-xl font-medium  shrink-0 ">
                            {t("profile_info")}
                        </h3>
                        <p className="text-muted-foreground text-sm leading-snug">
                            {t("profile_info_description")}
                        </p>
                    </div>

                    <div className="flex border-b-1 pb-4 gap-4 flex-col lg:flex-row">
                        <div className="flex flex-col gap-2 flex-1  ">
                            <Label className="font-medium">
                                {t("profile_picture")}
                            </Label>
                            <Label className="text-muted-foreground leading-snug">
                                {t('profile_picture_description')}
                            </Label>
                        </div>
                        <div className="flex-4  flex  ">
                            <AvatarUpload defaultAvatar={user.picture_url} onFileChange={(file: FileWithPreview | null) => form.setValue("picture_url", file ? (file.file as File) : null)} />
                        </div>
                    </div>

                    <div className="flex border-b-1 pb-4 gap-4 flex-col lg:flex-row ">
                        <div className="flex flex-col gap-2 flex-1  ">
                            <Label className="font-medium ">
                                {t('personal_info')}
                            </Label>
                            <Label className="text-muted-foreground leading-snug">
                                {t('personal_info_description')}
                            </Label>
                        </div>
                        <div className="flex-4 flex">
                            <div className="flex-col space-y-4 w-full lg:max-w-[420px] sm:max-w-full ">
                                <div className="space-y-2 " >
                                    <FormField
                                        control={form.control}
                                        name='full_name'
                                        render={({ field }) => (
                                            <FormItem >
                                                <FormLabel htmlFor="full_name" >{t("form.fullname")}</FormLabel>
                                                <FormControl>
                                                    <Input placeholder={t("form.fullname_placeholder")} id="full_name"    {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className="flex gap-4">
                                    <div className="space-y-2 w-full">
                                        <FormField
                                            control={form.control}
                                            name='email'
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>{t("form.email")}</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder={t("form.email_placeholder")}  {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <div className="space-y-2  w-full">
                                        <FormField
                                            control={form.control}
                                            name='phone_number'
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>{t("form.phone_number")}</FormLabel>
                                                    <FormControl>
                                                        <Input type="phone" placeholder={t("form.phone_number_placeholder")} {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="space-y-2  w-full">
                                        <FormField
                                            control={form.control}
                                            name='gender'
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>{t("form.gender")}</FormLabel>
                                                    <FormControl>
                                                        <Select
                                                            onValueChange={(value: string) => field.onChange(value == "true")}
                                                            value={String(field.value)}
                                                            defaultValue={String(field.value)}
                                                        >
                                                            <SelectTrigger className="w-full">
                                                                <SelectValue placeholder={t("form.gender_placeholder")} />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                <SelectGroup>
                                                                    <SelectItem value={"true"}>{t("form.male")}</SelectItem>
                                                                    <SelectItem value={"false"}>{t("form.female")}</SelectItem>
                                                                </SelectGroup>
                                                            </SelectContent>
                                                        </Select>

                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <div className="space-y-2  w-full">
                                        <FormField
                                            control={form.control}
                                            name='birthday'
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>{t("form.birthday")}</FormLabel>
                                                    <FormControl>
                                                        <DatePicker
                                                            onValueChange={field.onChange}
                                                            defaultValue={field.value}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex border-b-1 pb-4 gap-4  flex-col lg:flex-row  ">
                        <div className="flex flex-col gap-2 flex-1  ">
                            <Label className="font-medium ">
                                {t('business_info')}
                            </Label>
                            <Label className="text-muted-foreground leading-snug">
                                {t('business_info_description')}
                            </Label>
                        </div>

                        <div className="flex-4 flex items-start  ">
                            <div className="  space-y-2  lg:max-w-[420px] sm:max-w-full w-full">
                                {
                                    !isBusiness && !(user.user_type == UserType.admin || user.user_type == UserType.employee) &&
                                    <CreateBusinessAccount onChange={onChange} />
                                }
                                {
                                    isBusiness && <>

                                        <div className="space-y-2 w-full">
                                            <FormField
                                                control={form.control}
                                                name='business_accounts.agency_name'
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>{t("form.business_name")}</FormLabel>
                                                        <FormControl>
                                                            <Input placeholder={t("form.business_name_placeholder")}  {...field} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>
                                        <div className="space-y-2 w-full">
                                            <FormField
                                                control={form.control}
                                                name='business_accounts.business_address'
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>{t("form.address")}</FormLabel>
                                                        <FormControl>
                                                            <Textarea placeholder={t("form.address_placeholder")}  {...field} className="max-h-[128px]" />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>
                                        <div className="space-y-2 w-full">
                                            <Label>
                                                {t("form.cover_picture")}
                                            </Label>
                                            <CoverUpload defaultImage={user.business_accounts?.cover_picture_url} onImageChange={(file: File | null) => form.setValue("business_accounts.cover_picture_url", file)} />
                                        </div>

                                    </>
                                }
                            </div>
                        </div>
                    </div>


                    <div className="flex  pb-4 gap-4  flex-col lg:flex-row ">
                        <div className="flex flex-col gap-2 flex-1">
                            <Label className="font-medium ">
                                {t('social_media')}
                            </Label>
                        </div>
                        <div className="flex-4 flex items-start  ">
                            <div className=" space-y-2 lg:!max-w-[420px] sm:max-w-full   w-full ">
                                <div className="space-y-2 w-full">
                                    <FormField
                                        control={form.control}
                                        name='social_media.whatsapp'
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>{t("form.whatsapp")}</FormLabel>
                                                <FormControl>
                                                    <Input placeholder={t("form.whatsapp")} {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className="space-y-2 w-full">
                                    <FormField
                                        control={form.control}
                                        name='social_media.facebook'
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>{t("form.facebook")}</FormLabel>
                                                <FormControl>
                                                    <Input placeholder={t("form.facebook")} {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className="space-y-2 w-full">
                                    <FormField
                                        control={form.control}
                                        name='social_media.instagram'
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>{t("form.instagram")}</FormLabel>
                                                <FormControl>
                                                    <Input placeholder={t("form.instagram")} {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className="space-y-2 w-full">
                                    <FormField
                                        control={form.control}
                                        name='social_media.tiktok'
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>{t("form.tiktok")}</FormLabel>
                                                <FormControl>
                                                    <Input placeholder={t("form.tiktok")} {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex  pb-4 gap-4  flex-col lg:flex-row ">
                        <div className="flex flex-col gap-2 flex-1  "></div>
                        <div className="flex-4 flex items-start  ">
                            <div className="space-y-2  flex justify-end lg:!max-w-[420px] sm:max-w-full ">
                                <Button size={"sm"} variant={"default"} type="submit" disabled={loading}>
                                    {t("form.save")}
                                </Button>
                            </div>
                        </div>
                    </div>

                </form>
            </Form>
        </div>
    )
}

export default AccountSettingForm; 