import MaxWidthWrapper from "@/components/max-width-wrapper";
import TermsConditionsAR from "./componenets/terms-ar";
import TermsConditionsFR from "./componenets/terms-fr";
import TermsConditionsEN from "./componenets/terms-en";

type Props = {
    params: { locale: 'en' | 'fr' | 'ar' }
}

export default function Terms({ params }: Props) {
 

    return (
        <MaxWidthWrapper>
            {
                params.locale == "ar" &&
                <TermsConditionsAR />
            }
            {
                params.locale == "fr" &&
                <TermsConditionsFR />

            }
            {
                params.locale == "en" &&
                <TermsConditionsEN />

            }

        </MaxWidthWrapper>
    )

}