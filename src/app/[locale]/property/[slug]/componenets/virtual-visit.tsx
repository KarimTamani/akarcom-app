"use client"
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogHeader, DialogTitle, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useTranslations } from "next-intl";

interface VirtualVisitProps {
    url?: string;
}

const VirtualVisit: React.FC<VirtualVisitProps> = ({ url }) => {
    const t = useTranslations("property");
    return (
        <div>
            <Label className="text-xl font-semibold">
                {t("virtual_visit")}
                <Badge className="bg-primary/10 text-primary font-bold">
                    360°
                </Badge>
            </Label>
            <Dialog>
                <DialogTrigger asChild >
                    <div className="relative flex items-center justify-center mt-2 rounded-md overflow-hidden">
                        <iframe
                            src={url}
                            className="w-full object-cover h-20 rounded-md"
                        />
                        <div className="absolute w-full h-full bg-black/50 flex items-center justify-center">
                            <Button variant="outline" className="text-primary  border-pirmary hover:text-primary">
                                {t("watch_now")}
                            </Button>
                        </div>
                    </div>
                </DialogTrigger>
                <DialogContent className="min-w-full h-full flex flex-col ">
                    <DialogHeader>
                        <DialogTitle>    {t("virtual_visit")}</DialogTitle>
                    </DialogHeader>
                    <div className="h-full ">
                        <iframe
                            src={url}
                            className="min-w-full object-cover min-h-full rounded-lg "

                        />
                    </div>

                </DialogContent>

            </Dialog>



        </div>
    )
}


export default VirtualVisit; 