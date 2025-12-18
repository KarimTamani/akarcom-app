import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;


export enum EVENTS {
    NEW_MESSAGE = "new_message",
    NEW_NOTIFICATION = "new_notification",
    TYPING_STATUS = "typing_status"
}

export const getSocket = (token: string) => {
  if (!socket) {
    socket = io("https://api.akarcom.com", {
      transports: ["websocket"],
      withCredentials: true,
      autoConnect: false,
      auth: {
        token, // 🔥 REQUIRED
      },
    });
  }
  return socket;
};