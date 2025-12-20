import React from "react";
import { Dialog, DialogContent } from "../ui/dialog";
import SigninLayout from "@/app/[locale]/auth/sign-in/page";
import SignupLayout from "@/app/[locale]/auth/sign-up/page";


interface AuthDialogProps {
    open: boolean
    setOpen: (value: boolean) => void,
    dialogType: "signin" | "signup" | undefined
}


const AuthDialog: React.FC<AuthDialogProps> = ({ open, setOpen, dialogType }) => {


    console.log (dialogType)
    return (
        <Dialog
            open={open} onOpenChange={setOpen}
        >
            <DialogContent >
                <div className="flex gap-4 items-center justify-center">
                    {
                        dialogType == "signin" && 
                        <SigninLayout dialogMode = {true}><></></SigninLayout>
                    }
                    {
                        dialogType == "signup" && 
                        <SignupLayout dialogMode ={true}><></></SignupLayout>
                    }
                </div>
            </DialogContent>
        </Dialog>
    )
}


export default React.memo(AuthDialog); 