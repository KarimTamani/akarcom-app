
import MainFilter from "./componenets/layout/main-filter";
import MaxWidthWrapper from "@/components/max-width-wrapper";
import AnimationContainer from "@/components/animation-container";
import { useTranslations } from "next-intl";
import AdsList from "./componenets/ads-list";
import Features from "./componenets/features";
import WishList from "./componenets/wishlist";


export default function Home() {
  const t = useTranslations("home");
  return (
    <div>
      <MainFilter />
      <MaxWidthWrapper className="pt-10">
        <AnimationContainer delay={0.1}>
          <div className="flex w-full flex-col items-center justify-center  gap-2 lg:items-center">
            <h2 className="!leading-[1.1] mt-6 text-center font-heading font-medium text-3xl text-foreground md:text-4xl lg:text-center text-foreground">
              {t.rich("title", {
                span: (chunks) => <span className="text-primary font-bold">{chunks}</span>
              })}
            </h2>
            <p className="mt-4 max-w-lg text-center text-lg text-muted-foreground lg:text-center ">
              {t("description")}
            </p>
          </div>
        </AnimationContainer>
      </MaxWidthWrapper>
      <MaxWidthWrapper className="pt-10">
        <AnimationContainer delay={0.1}>
          <div className="flex w-full flex-col items-start justify-start  gap-4">
            <h2 className="!leading-[1.1] mt-6 text-center font-heading font-medium text-2xl text-foreground md:text-3xl lg:text-center text-foreground ">
              {t("chosen_ads")}
            </h2>

            <AdsList defaultFilters={{ sort_by : "distance" }} />

          </div>
        </AnimationContainer>
      </MaxWidthWrapper>

      <MaxWidthWrapper className="pt-10">
        <AnimationContainer delay={0.1}>
          <div className="flex w-full flex-col items-start justify-start  gap-4 ">
            <h2 className="!leading-[1.1] mt-6 text-center font-heading font-medium text-2xl text-foreground md:text-3xl lg:text-center text-foreground ">
              {t("latest_ads")}
            </h2>

            <AdsList defaultFilters={{ sort_by : "created_at" }} />

          </div>
        </AnimationContainer>
      </MaxWidthWrapper>


      <MaxWidthWrapper className="pt-10">
        <AnimationContainer delay={0.1}>
          <div className="flex w-full flex-col items-center justify-start  gap-4 ">
            <h2 className="!leading-[1.1] mt-6 text-center font-heading font-medium text-2xl text-foreground md:text-3xl lg:text-center text-foreground text-center mb-2">
              {t("features.title")}
            </h2>
            <div className="mt-4">
              <Features />
            </div>
          </div>
        </AnimationContainer>
      </MaxWidthWrapper>



      <AnimationContainer delay={0.1} className="pt-10">
        <WishList />
      </AnimationContainer>


    </div>
  );
}
