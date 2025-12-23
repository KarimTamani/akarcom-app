export enum SubscriptionFeatures {
    properties = "properties",
    faqs = "faqs",
    tickets = "tickets",
    chat = "chat",
    virtual_visit = "virtual_visit"
}

export interface SubscriptionPlan {
    id: number;
    name: string;
    description?: string;

    price: number;
    max_properties: number;
    features: SubscriptionFeatures[] ; 
    created_at : string ; 
    is_active : boolean 
}

export interface UserSusbcription {
    id: number;
    plan_id: number;
    payment_details?: string;
    proof_of_payment?: string;
    period : number ; 
    start_date : Date ; 
}