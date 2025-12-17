"use client"
import AnimationContainer from "@/components/animation-container";
import MaxWidthWrapper from "@/components/max-width-wrapper";
import { usePathname } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import Image from "next/image";





const Footer: React.FC = ({ }) => {

    const currentDate = new Date();
    const t = useTranslations("home.footer")



    const pathname = usePathname();

    if (pathname.includes("dashboard"))
        return;




    return (
        <AnimationContainer delay={0.1} className="pt-10">
            <div className="w-full flex flex-col items-center">
                <Image
                    src={`/akarcom.png`}
                    alt="Logo"
                    height={62}
                    width={86}

                    quality={100}
                />
                <div className="w-full border-1 mt-10">
                    <MaxWidthWrapper>
                        <div className="flex items-center p-2 text-muted-foreground justify-between">

                            <div >
                                {t("copyright", {
                                    year: currentDate.getFullYear()
                                })}

                            </div>
                            <div className=" flex gap-2 flex-row-reverse ">
                                <a href="https://www.facebook.com" target="_blank">
                                    <img
                                        width={24}
                                        height={24}
                                        src={"icons8-facebook-48.png"}
                                        alt="Facebook"
                                    />
                                </a>
                                <a href="https://www.instagram.com" target="_blank">
                                    <img
                                        width={24}
                                        height={24}
                                        src={"icons8-instagram-48.png"}
                                        alt="Instagram"
                                    />
                                </a>
                                <a href="https://www.x.com" target="_blank">
                                    <img
                                        width={24}
                                        height={24}
                                        src={"icons8-twitter-48.png"}
                                        alt="X"
                                    />
                                </a>
                                <a href="https://www.linkedin.com" target="_blank">
                                    <img
                                        width={24}
                                        height={24}
                                        src={"icons8-linkedin-48.png"}
                                        alt="Linkedin"
                                    />
                                </a>
                            </div>
                        </div>
                    </MaxWidthWrapper>

                </div>
            </div>
        </AnimationContainer>
    )
}


export default Footer; 