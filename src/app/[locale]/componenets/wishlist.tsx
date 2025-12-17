"use client"
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";







const WishList: React.FC = ({ }) => {
    const t = useTranslations("home.wishlist");
    const router = useRouter();

    return (
        <div className="w-full text-center bg-[linear-gradient(to_top,#00B2A933,var(--background))] text-center h-60  p-6 space-y-2">
            <h2 className="text-primary ">
                {t("discover")}

            </h2>
            <h1 className="text-2xl font-semibold">
                {t("have_agency")}
            </h1>
            <p className="text-muted-foreground">
                {t("description")}
            </p>
            <Button
                onClick={() => router.push("/auth/sign-up")}
            >
                {t("get_account")}
            </Button>
            <p className="text-muted-foreground">
                {t("join", {
                    num_users: 150
                })}
            </p>
        </div>
    )
}


export default WishList; 