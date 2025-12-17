import { User } from "./user";



export interface Ticket {
    id: number;
    title: string;
    description: string;
    answer?: string;
    status: tickets_status_enum;
    user: User ; 
    replier? : User
}



export enum tickets_status_enum {
    opened = "opened",
    closed = "closed",
    faq = "faq"
}