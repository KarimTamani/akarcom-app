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
import { useCallback, useEffect, useMemo, useState } from "react"
import z from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { cn } from "@/lib/utils"
import { toast } from "sonner"
import api from "@/services/api"
import { Ticket } from "@/lib/ticket"


interface Props {
    onReplay?: () => void,
    ticket?: Ticket
    onClose?: () => void

}

export const ReplyTicketDialog: React.FC<Props> = ({ onReplay, ticket, onClose }) => {

    const t = useTranslations("help.create");
    const editTicketSchema = useMemo(() => {
        return z.object({

            answer: z
                .string()
                .min(20, t("form.max_length")),
        });
    }, [t])
    const [open, setOpen] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const form = useForm<z.infer<typeof editTicketSchema>>({
        resolver: zodResolver(editTicketSchema as any),
        defaultValues: {
            answer: ""
        },
    });

    const saveChanges = useCallback(async (ticketInput: z.infer<typeof editTicketSchema>) => {
        setLoading(true);
        try {
            const response = await api.put('/ticket/' + ticket?.id,  {
                answer : ticketInput.answer , 
                
            });
            if (response && response.status == 200) {
                toast(t("form.success.title"), {
                    description: t("form.success.description"),
                    className: "!text-primary",
                    descriptionClassName: "!text-primary/80"
                });
                setOpen(false);
                onReplay && onReplay()
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
    }, [ticket]);

    useEffect(() => {
        if (open)
            form.reset()
        if (!open)
            onClose && onClose()
    }, [open]);


    useEffect(() => {
        if (ticket)
            setOpen(true);
    }, [ticket])
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <form>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>{t("reply_ticket")}</DialogTitle>

                    </DialogHeader>

                    <Form {...form} >
                        <form
                            onSubmit={form.handleSubmit(saveChanges)}
                            className={cn(' grid gap-4  ')}
                        >
                            <h3 className="font-semibold">
                                {ticket?.title}
                            </h3>
                            <p className="text-muted-foreground">
                                {ticket?.description}
                            </p>

                            <div className="grid gap-3">
                                <FormField
                                    control={form.control}
                                    name='answer'
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>{t("form.answer")}</FormLabel>
                                            <FormControl>
                                                <Textarea placeholder={t("form.answer_placeholder")} {...field} className="min-h-[260px]" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

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
