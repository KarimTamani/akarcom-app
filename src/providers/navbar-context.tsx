"use client"
import { useMessages, useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from "react";

interface NavbarContextType {
    title?: string;
    setTitle: Dispatch<SetStateAction<string | undefined>>
}

const NavbarContext = createContext<NavbarContextType | null>(null);




export const NavbarProvider = ({ children }: { children: React.ReactNode }) => {
    const [title, setTitle] = useState<string | undefined>();
    const pathname = usePathname();
    const t = useTranslations("sidebar");
    const messages = useMessages();

    useEffect(() => {
        try {

            let sequences: any = pathname.split("dashboard").pop() || "" as string;
            let newTitle = sequences.split('/').filter((str: string) => str.trim().length > 0).join("_");
   
            const keyExists = messages?.hasOwnProperty(newTitle);
   
            if (keyExists) {
                newTitle = t(newTitle as string);
                setTitle(newTitle)
            }

        } catch (error) {
            setTitle(undefined) 
        }


    }, [pathname])
    return (
        <NavbarContext.Provider value={{ title, setTitle }}>
            {children}
        </NavbarContext.Provider>
    );
}



export const useNavbar = () => useContext(NavbarContext)!;