

"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLocale, useTranslations } from "next-intl";
import { CreateTicketDialog } from "./componenets/create-ticket";
import useGetTickets from "./hooks/use-get-tickets";
import { useState } from "react";
import TicketsList from "./componenets/tickets-list";
import { useAuth } from "@/providers/auth-provider";
import { UserType } from "@/lib/user";
import { ReplyTicketDialog } from "./componenets/replay-ticket";
import { Ticket } from "@/lib/ticket";
import { Spinner } from "@/components/ui/spinner";


const PAGE_SIZE = 10;
const DEFAULT_PAGINATION = {
    offset: 0,
    limit: PAGE_SIZE
}

const HelpPage: React.FC = ({ }) => {

    const locale = useLocale();
    const t = useTranslations("help");

    const [selectedTicket, setSelectedTicket] = useState<Ticket | undefined>(undefined)
    const [questionsPagination, setQuestionPagination] = useState<any>(DEFAULT_PAGINATION);
    const [faqsPagination, setFaqsPagination] = useState<any>(DEFAULT_PAGINATION);

    const { tickets: questions, loading, count: countTickets } = useGetTickets(questionsPagination);
    const { tickets: faqs, loading: loadingFaqs, count: countFaqs } = useGetTickets(faqsPagination, true);

    const reloadMyQuestions = () => {
        setQuestionPagination({ ...DEFAULT_PAGINATION });
    }

    const reloadFaqs = () => {
        setFaqsPagination({ ...DEFAULT_PAGINATION });
    }

    const { user } = useAuth();

    const allowOptions = user?.user_type == UserType.admin || user?.user_type == UserType.employee

    const loadMoreFaqs = () => {
        setFaqsPagination({
            offset: faqsPagination.offset + PAGE_SIZE,
            limit: PAGE_SIZE
        })
    }
    const loadMoreQuestions = () => {
        setQuestionPagination({
            offset: questionsPagination.offset + PAGE_SIZE,
            limit: PAGE_SIZE
        })
    }

    const isAdmin = user?.user_type == UserType.admin || user?.user_type == UserType.employee; 

    return (
        <div className=" h-full p-4" >
            {
                < Tabs defaultValue="faq" className="w-full space-y-2"
                    dir={locale == "ar" ? "rtl" : "ltr"}>
                    <div className=" flex w-full justify-between mb-4 border-b-1 pb-4">
                        <TabsList >
                            <TabsTrigger className="min-w-32 px-8" value="faq">{t("faq")}</TabsTrigger>
                            <TabsTrigger className="min-w-32 px-8" value="my_questions">{ !isAdmin ? t("my_questions") : t("all_questions")}</TabsTrigger>
                        </TabsList>
                        { !isAdmin && <CreateTicketDialog onAdd={reloadMyQuestions} />}
                    </div>
                    <TabsContent value="faq" >
                        <TicketsList
                            tickets={faqs}
                        />
                        {
                            countFaqs !== undefined  && faqs.length < countFaqs &&
                            <button className='underline text-primary py-4 cursor-pointer w-full flex items-center justify-center' disabled={loadingFaqs} onClick={loadMoreFaqs}>
                                {!loadingFaqs ? t("load_more") : <Spinner />}
                            </button>
                        }
                    </TabsContent>
                    <TabsContent value="my_questions">
                        <TicketsList
                            tickets={questions}
                            allowOptions={allowOptions}
                            onChange={() => {
                                reloadMyQuestions(); reloadFaqs();
                            }}
                            openReply={(ticket) => {
                                setSelectedTicket(ticket)
                            }}
                        />
                        {
                            countTickets !== undefined  && questions.length < countTickets &&
                            <button className='underline text-primary py-4 cursor-pointer w-full flex items-center justify-center' disabled={loading} onClick={loadMoreQuestions}>
                                {!loading ? t("load_more") : <Spinner />}
                            </button>
                        }
                    </TabsContent>


                </Tabs>

            }
            <ReplyTicketDialog
                onReplay={reloadMyQuestions}
                ticket={selectedTicket}
                onClose={() => setSelectedTicket(undefined)}
            />
        </div >
    )
}

export default HelpPage; 