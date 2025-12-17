import { Property } from "./property";
import { User } from "./user";

export interface Conversation {
  id?: number;
  created_by: number;
  user_id: number;
  created_at?: Date;
  updated_at?: Date;
  creator: User; // relation to the creator user
  user: User;    // relation to the other user
  messages: Message[];
}

export interface Message {
  id: number;
  sender_id: number;
  receiver_id: number;
  property_id?: number;
  content: string;
  sent_at?: Date;
  read_at?: Date;
  properties?: Property;
  users_messages_receiver_idTousers: User;
  users_messages_sender_idTousers: User;
  conversation_id: number;
  conversation: Conversation;
}