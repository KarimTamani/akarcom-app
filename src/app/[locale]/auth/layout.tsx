import { redirect } from "next/navigation";
import AuthButtons from "./components/auth-buttons";







interface AuthLayoutProps {
    children: React.ReactNode
}


const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {

    if (!children) 
        redirect("/auth/sign-in")
    
    return (
        <div className="w-full h-screen flex items-center flex-col">
            <div className="mt-40">
                <AuthButtons/>
            </div>
            <div className="w-fit h-fit mt-4 ">
                {children}
            </div>
        </div>
    )
}


export default AuthLayout; 