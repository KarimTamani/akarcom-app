
import MaxWidthWrapper from "@/components/max-width-wrapper";
import PropertyView from "./componenets/property";
import AdsList from "../../componenets/ads-list";


interface PropertyProps {
    params: {
        slug: string
    }
}

const PropertyPage: React.FC<PropertyProps> = async ({ params: { slug } }) => {
    return (
        <MaxWidthWrapper className="pt-20 ">
            <PropertyView slug={slug}></PropertyView>
           
        </MaxWidthWrapper>
    )
}

export default PropertyPage; 