


export interface UserSignIn {
    email: string;
    password: string;
}

export interface UserSignUp {
    full_name: string;
    password: string;
    confirm_password: string;
    email: string;
}


export interface SocialMedia {
    facebook?: string;
    instagram?: string;
    tiktok?: string;
    whatsapp?: string;
}

export interface BusinessAccount {
    agency_name: string;
    business_address: string;
    cover_picture_url?: string;
}



export interface User {
    id: number
    full_name: string;
    email: string;
    picture_url?: string;
    phone_number?: string;
    user_type: UserType;
    provider: string;
    birthday?: Date;
    gender: boolean
    created_at: Date;
    updated_at: Date;
    social_media?: SocialMedia;
    business_accounts?: BusinessAccount;
    notification_settings?: NotificationSetting ; 
}


export interface NotificationSetting { 
    ads: boolean ; 
    messages : boolean  
}

export enum UserType {
    individual = "individual",
    agency = "agency",
    developer = "developer",
    admin = "admin",
    employee = "employee",
}
