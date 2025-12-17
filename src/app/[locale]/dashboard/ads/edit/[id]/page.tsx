"use client"
import { useNavbar } from "@/providers/navbar-context";
import CreatePropertyPage from "../../create/page";
import { useEffect } from "react";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";



const EditPropertyPage: React.FC = ({ }) => {
    const { setTitle } = useNavbar();
    const params = useParams();
    const t = useTranslations("sidebar");
    useEffect(() => {
        setTitle(t("edit_ad"))
    }, [])
    return (
        <CreatePropertyPage
            id={params.id ? Number(params.id) : undefined}
        />
    )
}


export default EditPropertyPage;