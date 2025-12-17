import { User } from "./user";



export interface PropertyImage {
  id?: number;
  image_url?: File | string | null;
}



export interface PropertyType {
  id: number;
  name: string;
  name_ar: string; 
  name_fr: string; 
  other_property_types: PropertyType[]
}


export interface PropertyTag {
  id: number;
  name: string;
  is_approuved: boolean;
  user_id: number;
}
export interface PropertyPropertyTag {
  property_id : number ; 
  property_tag_id : number ; 
  property_tags :PropertyTag 
}

export interface Property {
  id?: number;
  title: string;
  slug: string; // 👈 auto-generated, not from user input
  description?: string | null;
  image_360_url?: File | string | null;
  property_type_id: number;
  add_type: string;
  rent_period?: string | null;
  price: number;
  condition?: string;
  latitude?: number | null;
  longitude?: number | null;
  address: string;
  status : PropertyStatus , 
  city: string;
  postal_code?: string;
  area_sq_meters?: number | null;
  num_rooms?: number | null;
  bethrooms?: number | null;
  furnished?: boolean;
  schools?: number | null;
  mosques?: number | null;
  project_plan?: string | null;
  ownership_book?: boolean | null;
  property_images: PropertyImage[];
  property_tags?: PropertyTag[] | null;
  created_at: Date;
  views : number
  users: User
  property_property_tags :PropertyPropertyTag[] ; 
  favorites : any[]
}


export interface PropertyView { 
  id : number ; 
  count : number ; 
  date : string ; 
}



export enum PropertyStatus {
  draft = "draft",
  published = "published",
  closed = "closed",
  rejected = "rejected"
}