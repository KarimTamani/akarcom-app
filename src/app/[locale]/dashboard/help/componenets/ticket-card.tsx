"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Ticket, tickets_status_enum } from "@/lib/ticket";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
 
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuShortcut, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { CircleQuestionMark, Ellipsis, Pencil, Reply } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { toast } from "sonner";
import axios from "axios";
import api from "@/services/api";
import { Label } from "@/components/ui/label";

interface TicketCardProps {
    ticket: Ticket;
    allowOptions?: boolean;
    onChange?: () => void;
    openReply?: () => void;
    hideInfo?: boolean
}

export default function TicketCard({ ticket, allowOptions, onChange, openReply, hideInfo }: TicketCardProps) {



    const [loading, setLoading] = useState<boolean>(false);

    const t = useTranslations("help.card")

    const markAsFaq = async () => {

        setLoading(true);
        try {

            const response = await api.put('/ticket/' + ticket.id, {
                status: tickets_status_enum.faq
            });

            if (response && response.status == 200) {
                onChange && onChange();
                toast(t("create.form.success.title"), {
                    description: t("create.form.success.description"),
                    className: "!text-primary",
                    descriptionClassName: "!text-primary/80"
                });
            }

        } catch (error) {
            if (axios.isAxiosError(error))
                toast(t("form.error.title"), {
                    description: t("create.form.error.description"),
                    className: "!text-destructive",
                    descriptionClassName: "!text-destructive"
                })
        } finally {
            setLoading(false)
        }
    }

    const user = ticket.user;
    const replier = ticket.replier


    return (
        <Card className="w-full  shadow-none rounded-sm gap-2 mb-4">
            <CardHeader className="flex flex-row items-start justify-between gap-4">
                <div className="space-y-1">
                    <CardTitle className="text-xl font-semibold">
                        {ticket.title}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">
                        {t("ticket")} #{ticket.id}
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <Badge variant={ticket.status == tickets_status_enum.opened ? "default" : "outline"} className="max-h-6 rounded-sm">
                        {t("status."+ ticket.status)}
                    </Badge>
                    {
                        allowOptions &&
                        <div className="w-8 ">
                            {
                                (!ticket.answer || ticket.status != tickets_status_enum.faq) &&
                                <DropdownMenu modal={false}>
                                    <DropdownMenuTrigger asChild>
                                        <Button
                                            variant='ghost'
                                            className='data-[state=open]:bg-muted flex h-8 w-8 p-0'
                                        >
                                            {
                                                !loading ? <Ellipsis className='h-4 w-4' /> : <Spinner className='w-4 h-4' />
                                            }
 
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align='end' className='w-[160px]'>
                                        {
                                            !ticket.answer &&
                                            <DropdownMenuItem
                                                onClick={openReply}
                                            >
                                                {t("replay")}
                                                <DropdownMenuShortcut>
                                                    <Reply size={16} />
                                                </DropdownMenuShortcut>
                                            </DropdownMenuItem>
                                        }
                                        {
                                            ticket.status != tickets_status_enum.faq &&
                                            <DropdownMenuItem
                                                onClick={markAsFaq}
                                            >
                                                {t("mark_faq")}
                                                <DropdownMenuShortcut>
                                                    <CircleQuestionMark size={16} />
                                                </DropdownMenuShortcut>
                                            </DropdownMenuItem>

                                        }
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            }
                        </div>
                    }
                </div>
            </CardHeader>

            <CardContent className="space-y-2">
                {/* Description */}
                <div className="flex flex-col gap-2">
                    <p className="text-sm text-muted-foreground whitespace-pre-line">
                        {ticket.description}
                    </p>
                    {ticket.answer && (
                        <>
                            <div>
                                <h4 className="text-sm font-semibold mb-1">Answer</h4>
                                <p className="text-sm whitespace-pre-line text-muted-foreground">
                                    {ticket.answer}
                                </p>
                            </div>
                        </>
                    )}
                </div>
                {
                    !hideInfo &&
                    <>
                        <Separator />

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                            <div>
                                <Label className="font-medium ">{t("submitted_by")}</Label>

                                <div className="flex items-center gap-2 mt-2">
                                    <Avatar className='h-8 w-8'>
                                        <AvatarImage src={user?.picture_url ? user?.picture_url : undefined} alt={user?.full_name} />
                                        <AvatarFallback>{
                                            user?.full_name ? user?.full_name.charAt(0).toUpperCase() : undefined
                                        }</AvatarFallback>
                                    </Avatar>
                                    <p className="font-medium">{user?.full_name}</p>
                                </div>
                            </div>

                            {ticket.replier && ticket.answer && (
                                <div>
                                    <Label className="font-medium ">{t("answered_by")}</Label>
                                    <div className="flex items-center gap-2 mt-2">
                                        <Avatar className='h-8 w-8'>
                                            <AvatarImage src={replier?.picture_url ? replier?.picture_url : undefined} alt={replier?.full_name} />
                                            <AvatarFallback>{
                                                replier?.full_name ? replier?.full_name.charAt(0).toUpperCase() : undefined
                                            }</AvatarFallback>
                                        </Avatar>
                                        <p className="font-medium">{replier?.full_name}</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </>
                }
            </CardContent>
        </Card>
    );
}

