"use client"

import MaxWidthWrapper from "@/components/max-width-wrapper"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Ticket } from "@/lib/ticket"
import TicketCard from "./ticket-card"

interface Props {
    tickets: Ticket[];
    allowOptions?: boolean
    onChange?: () => void,
    openReply?: (ticket: Ticket) => void
}



const TicketsList: React.FC<Props> = ({ tickets, allowOptions, onChange, openReply }) => {
    return (
        <ScrollArea>
            <MaxWidthWrapper>
                <>
                    {
                        tickets.map((ticket: Ticket) => <TicketCard
                            onChange={onChange}
                            allowOptions={allowOptions}
                            key={ticket.id}
                            ticket={ticket}
                            openReply={() => openReply && openReply(ticket)}
                            hideInfo={!allowOptions}
                        />
                        )
                    }
                </>
            </MaxWidthWrapper>
        </ScrollArea>

    )
}

export default TicketsList; 