import MaxWidthWrapper from "@/components/max-width-wrapper";
import PrivacyPolicyAR from "./componenets/privacy-policy-ar";
import PrivacyPolicyFR from "./componenets/privacy-policy-fr";
import PrivacyPolicyEN from "./componenets/privacy-policy-en";

type Props = {
    params: { locale: 'en' | 'fr' | 'ar' }
}

export default function PrivacyPolicy({ params }: Props) {

    console.log(params.locale);

    return (
        <MaxWidthWrapper>
            {
                params.locale == "ar" &&
                <PrivacyPolicyAR />
            }
            {
                params.locale == "fr" &&
                <PrivacyPolicyFR />

            }
            {
                params.locale == "en" &&
                <PrivacyPolicyEN />

            }

        </MaxWidthWrapper>
    )

}