"use client"
import { Button } from "@/components/ui/button";
import { UpgradeDialog } from "./upgrade-dialog";
import { User } from "@/lib/user";
import { useTranslations } from "next-intl";





interface Props {

    onChange?: (user: User) => void
}
const CreateBusinessAccount: React.FC<Props> = ({ onChange }) => {
    const t = useTranslations("account.upgrade");
    return (
        <div className=" border-1 w-full  rounded-md text-center p-4 pb-6 gap-4 flex flex-col">
            <h3 className="text-xl text-foreground text-primary">
                {t("title")}
            </h3>
            <p className="text-muted-foreground text-sm">
                {t.rich("description", {
                    b: (chunk) => <b>{chunk}</b>,
                })}
       
            </p>


            <UpgradeDialog onChange={onChange} />
        </div>
    )
}

export default CreateBusinessAccount; 