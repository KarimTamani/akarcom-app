"use client"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useTranslations } from "next-intl"
import useTicketFormSchema from "../hooks/use-get-ticket-form"
import { Textarea } from "@/components/ui/textarea"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useCallback, useEffect, useState } from "react"
import z from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { cn } from "@/lib/utils"
import { toast } from "sonner"
import api from "@/services/api"


interface Props {
    onAdd?: () => void
}

export const CreateTicketDialog: React.FC<Props> = ({ onAdd }) => {

    const t = useTranslations("help.create");
    const ticketFormSchema = useTicketFormSchema();
    const [open, setOpen] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const form = useForm<z.infer<typeof ticketFormSchema>>({
        resolver: zodResolver(ticketFormSchema as any),
        defaultValues: {
            title: "",
            description: ""
        },
    });

    const saveChanges = useCallback(async (ticketInput: z.infer<typeof ticketFormSchema>) => {
        setLoading(true);
        try {
            const response = await api.post('/ticket', ticketInput);
            if (response && response.status == 200) {
                toast(t("form.success.title"), {
                    description: t("form.success.description"),
                    className: "!text-primary",
                    descriptionClassName: "!text-primary/80"
                });
                setOpen(false);
                onAdd && onAdd()
            }

        } catch (error) {

            toast(t("form.error.title"), {
                description: t("form.error.description"),
                className: "!text-destructive",
                descriptionClassName: "!text-destructive"
            })


        } finally {
            setLoading(false)
        }
    }, []);

    useEffect(() => {
        if (open)
            form.reset()
    }, [open])
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <form>
                <DialogTrigger asChild>
                    <Button variant="default">{t("new_ticket")}</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>{t("new_ticket")}</DialogTitle>
                        <DialogDescription>
                            {t("description")}
                        </DialogDescription>
                    </DialogHeader>

                    <Form {...form} >
                        <form
                            onSubmit={form.handleSubmit(saveChanges)}
                            className={cn(' grid gap-4  ')}
                        >

                            <div className="grid gap-4">
                                <div className="grid gap-3">
                                    <FormField
                                        control={form.control}
                                        name='title'
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>{t("form.title")}</FormLabel>
                                                <FormControl>
                                                    <Input placeholder={t("form.title_placeholder")} {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                </div>
                                <div className="grid gap-3">
                                    <FormField
                                        control={form.control}
                                        name='description'
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>{t("form.description")}</FormLabel>
                                                <FormControl>
                                                    <Textarea placeholder={t("form.description_placeholder")} {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                </div>
                            </div>
                            <DialogFooter>
                                <DialogClose asChild>
                                    <Button variant="outline">{t("form.close")}</Button>
                                </DialogClose>
                                <Button type="submit" disabled={loading}>{t("form.submit")}</Button>
                            </DialogFooter>
                        </form>
                    </Form>

                </DialogContent>
            </form>
        </Dialog>
    )
}
