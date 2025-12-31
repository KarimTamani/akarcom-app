import MaxWidthWrapper from "@/components/max-width-wrapper";
import { Carousel, CarouselContent, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";





interface Props {
    urls: string[];
    open: boolean;
    onOpen: (value: boolean) => void;
}


const MediaDialog: React.FC<Props> = ({ urls, open, onOpen }) => {

    return (
        <Dialog
            open={open}
            onOpenChange={onOpen}
        >   
        
            <DialogContent className="mx-auto  w-full max-w-full px-4 md:max-w-screen-xl md:px-6 lg:px-6">
                <Carousel className={cn("w-full relative")}
                    opts={{
                        align: "start",
                    }}
                    orientation={"horizontal"}
                    dir="ltr"
                    onClick={(event: any) => {
                        event.preventDefault();
                    }}
                >
                    <CarouselContent className="-mt-1 " >
                        {
                            urls.map((image: string) => {

                                const videoRegex = /\.(mp4|webm|mov|avi|mkv|flv|m4v|3gp)(\?.*)?$/i

                                if (videoRegex.test(image)) {
                                    return(
                                        <video src={image} controls 
                                    className={cn('aspect-video  w-full object-cover shrink-0')}></video>
                                    )
                                }
                                else 
                                    return <img
                                    src={image as string}
                                    alt='Banner'
                                    className={cn('aspect-video  w-full object-cover shrink-0')}
                                /> 
                            })

                        }
                    </CarouselContent >
                    <CarouselPrevious className="absolute top-[50%] left-2 -translate-Y-[50%] flex" />
                    <CarouselNext className="absolute top-[50%] right-2 -translate-Y-[50%] flex" />
                </Carousel>
            </DialogContent>
        </Dialog>

    )
}


export default MediaDialog; 