"use client"
import { Button } from "@/components/ui/button";
import { useRouter } from "@/i18n/navigation";
import { BadgeCheck, MapPinHouse, ShieldCheck, TvMinimalPlay } from "lucide-react";
import { useTranslations } from "next-intl";
 





const Features: React.FC = ({ }) => {

    const t = useTranslations("home.features");
    const router = useRouter() ; 

    return (
        <div className="grid grid-cols-1 md:grid-cols-1  lg:grid-cols-2  gap-4 w-full ">
            <div className="w-full ">
                <div className="bg-primary/20 w-full h-[400px] relative rounded-md p-4 space-y-4">
                    <h1 className="text-2xl font-semibold">
                        {t("card_title")}
                    </h1>
                    <p className="text-muted-foreground max-w-[60%]">
                        {t("card_description")}
                    </p>
                    <Button className="mt-2"
                        onClick={() => router.push("/auth/sign-in")}
                    >
                        {t("create_account")}
                    </Button>
                    <img
                        className="absolute bottom-0 right-0 w-[50%]"
                        src={"/Illustration.png"}

                    />
                </div>
            </div>
            <div className=" grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <MapPinHouse
                        className="p-3 h-12 w-12 bg-primary/40 shring-0 fill-background rounded-full ring-border ring-1 border-2 border-background"
                    />
                    <h2 className="text-lg font-semibold">
                        {t("cards.card_1.title")}
                    </h2>
                    <p className="text-muted-foreground ">
                        {t("cards.card_1.description")}
                    </p>
                </div>
                <div className="space-y-2">
                    <TvMinimalPlay
                        className="p-3 h-12 w-12 bg-primary/40 shring-0 fill-background rounded-full ring-border ring-1 border-2 border-background"
                    />
                    <h2 className="text-lg font-semibold">
                        {t("cards.card_2.title")}
                    </h2>
                    <p className="text-muted-foreground ">
                        {t("cards.card_2.description")}
                    </p>
                </div>
                <div className="space-y-2">
                    <BadgeCheck
                        className="p-3 h-12 w-12 bg-primary/40 shring-0 fill-background rounded-full ring-border ring-1 border-2 border-background"
                    />
                    <h2 className="text-lg font-semibold">
                        {t("cards.card_3.title")}
                    </h2>
                    <p className="text-muted-foreground ">
                        {t("cards.card_3.description")}
                    </p>
                </div>
                <div className="space-y-2">
                    <ShieldCheck
                        className="p-3 h-12 w-12 bg-primary/40 shring-0 fill-background rounded-full ring-border ring-1 border-2 border-background"
                    />
                    <h2 className="text-lg font-semibold">
                        {t("cards.card_4.title")}
                    </h2>
                    <p className="text-muted-foreground ">
                        {t("cards.card_4.description")}
                    </p>
                </div>
            </div>

        </div>
    )

}


export default Features; 