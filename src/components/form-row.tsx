import React from "react";
import { Label } from "./ui/label"
import { cn } from "@/lib/utils";




interface Props {
    children: React.ReactNode
    label?: string | React.ReactNode;
    description?: string | React.ReactNode;
    className?: string
}



const FormRow: React.FC<Props> = ({ children, label, description, className }) => {

    return (

        <div className={cn("flex  pb-4 gap-4 flex-col lg:flex-row ", className)}>
            <div className="flex flex-col gap-2 flex-1  ">
                {
                    label &&
                    <Label className="font-medium ">
                        {label}
                    </Label>
                }
                {
                    description &&
                    <Label className="text-muted-foreground leading-snug">
                        {description}
                    </Label>
                }
            </div>
            <div className="flex-4 flex">
                <div className="flex-col space-y-4 w-full lg:max-w-[420px] sm:max-w-full ">
                    {children}
                </div>
            </div>
        </div>

    )
}


export default React.memo(FormRow); 