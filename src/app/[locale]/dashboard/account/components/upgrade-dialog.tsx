import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { User, UserType } from "@/lib/user"
import { cn } from "@/lib/utils"
import api from "@/services/api"
import { BuildingIcon, HammerIcon } from "lucide-react"
import { useTranslations } from "next-intl"
import { useCallback, useState } from "react"

interface Props {
    onChange?: (user: User) => void
}

export const UpgradeDialog: React.FC<Props> = ({ onChange }) => {

    const [selectedType, setSelectedType] = useState<UserType>(UserType.agency);
    const [open, setOpen] = useState(false);
    const [loading , setLoading] = useState<boolean> (false) ; 
    const save = useCallback(async () => {

        setLoading(true) ; 

        try {
            const response = await api.put("/users", {
                user_type: selectedType 
            });
            const { data } = response.data;
            onChange && onChange(data)

            setOpen(false)

        } catch (error) {

        } finally {
            setLoading(false) ; 
        }
    }, [selectedType]);

    const t = useTranslations("account.upgrade");

    return (
        <Dialog
            open={open} onOpenChange={setOpen}
        >

            <DialogTrigger asChild>
                <Button
                    type="button"
                >
                    {t('button')}
                </Button>

            </DialogTrigger>
            <DialogContent className="sm:max-w-[365px]">
                <DialogHeader>
                    <DialogTitle>
                        {t('dialog_title')}

                    </DialogTitle>
                    <DialogDescription>
                        {t('dialog_description')}


                    </DialogDescription>
                </DialogHeader>
                <div className="flex gap-4">

                    <Label className=" w-full  hover:bg-accent/50 flex items-start gap-3 rounded-lg border p-3 has-[[aria-checked=true]]:border-primary has-[[aria-checked=true]]:bg-primary/10 dark:has-[[aria-checked=true]]:border-primary/90 dark:has-[[aria-checked=true]]:bg-primary/10">
                        <Checkbox
                            id="agency"
                            checked={selectedType == UserType.agency}
                            onCheckedChange={() => setSelectedType(UserType.agency)}
                            className="hidden data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white dark:data-[state=checked]:border-blue-700 dark:data-[state=checked]:bg-blue-700"
                        />
                        <div className={cn("grid gap-2 font-normal text-center w-full ", (selectedType == UserType.agency) && "!text-primary")}  >
                            <p className="text-sm leading-none font-medium ">
                                {t("agency")}
                            </p>
                            <p className={cn("text-muted-foreground text-sm flex  justify-center", (selectedType == UserType.agency) && "!text-primary")}>
                                <BuildingIcon className="w-8 h-8" strokeWidth={1} />
                            </p>
                        </div>
                    </Label>


                    <Label className="w-full hover:bg-accent/50 flex items-start gap-3 rounded-lg border p-3 has-[[aria-checked=true]]:border-primary has-[[aria-checked=true]]:bg-primary/10 dark:has-[[aria-checked=true]]:border-primary/90 dark:has-[[aria-checked=true]]:bg-primary/10">
                        <Checkbox
                            id="developer"
                            onCheckedChange={() => setSelectedType(UserType.developer)}
                            checked={selectedType == UserType.developer}
                            className="hidden data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white dark:data-[state=checked]:border-blue-700 dark:data-[state=checked]:bg-blue-700"
                        />
                        <div className={cn("grid gap-2 font-normal text-center w-full ", (selectedType == UserType.developer) && "!text-primary")}  >
                            <p className="text-sm leading-none font-medium"  >
                                {t("developer")}
                            </p>
                            <p className={cn("text-muted-foreground text-sm flex  justify-center", (selectedType == UserType.developer) && "!text-primary")}>
                                <HammerIcon className="w-8 h-8 " strokeWidth={1} />

                            </p>
                        </div>
                    </Label>
                </div>
                <DialogFooter >
                    <div className="flex w-full justify-between">
                        <Button type="submit" onClick={save} disabled={loading} > 
                            {t("confirm")}
                            </Button>

                        <DialogClose asChild >
                            <Button variant="outline">
                                {t("cancel")}
                            </Button>
                        </DialogClose>
                    </div>
                </DialogFooter>
            </DialogContent>

        </Dialog>
    )
}
