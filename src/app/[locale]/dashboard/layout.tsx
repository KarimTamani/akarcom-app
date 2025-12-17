import { AppSidebar } from "@/components/layout/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { useLocale } from "next-intl";
import NavBar from "./components/navbar";
import ProtectedRoute from "@/components/protected-route";
import { NavbarProvider } from "@/providers/navbar-context";


import { headers } from "next/headers";


interface Props {
    children: React.ReactNode
}
const DashboardLayout: React.FC<Props> = ({ children }) => {
    const locale = useLocale();


    return (
        <ProtectedRoute>
            <NavbarProvider>
                <div className="max-h-screen overflow-hidden pb-2">
                    <SidebarProvider >
                        <AppSidebar variant="inset" side={locale == "ar" ? "right" : "left"} />
                        <SidebarInset className=" overflow-hidden h-screen max-h-screen flex flex-col  ">
                            <NavBar />
                            <div className="h-full overflow-y-auto ">
                                {children}
                            </div>
                        </SidebarInset>
                    </SidebarProvider>
                </div>
            </NavbarProvider>
        </ProtectedRoute>

    )
}


export default DashboardLayout; 