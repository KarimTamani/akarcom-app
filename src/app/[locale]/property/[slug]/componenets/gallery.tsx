import { cn } from '@/lib/utils'

type GalleryImage = {
    src: string
    alt: string
}

type GallerySection = {
    type?: string
    images: GalleryImage[]
}

const Gallery = ({ sections }: { sections: GallerySection[] }) => {
    return (
        <section >
            <div className='mx-auto max-w-7xl  '>

                {/* Gallery Grid */}
                <div className={cn('grid gap-0', { "md:grid-cols-2": sections.length > 1 })}     >
                    {sections.map((section, sectionIndex) => {


                        return (
                            <div key={sectionIndex} className={cn({
                                'grid ': section.type === 'grid',
                                "grid-cols-2 ": section.type === 'grid' && section.images.length >= 2,
                            })}>
                                {section.images.map((image, imageIndex) => (
                                    <img key={imageIndex} src={image.src} alt={image.alt} className={cn(
                                        'rounded-lg object-cover w-full h-full p-2 overflow-hidden',
                                        
                                        { "max-h-[560px]   " : section.type  != "grid" || section.images.length <= 2 }  , 
                                        
                                        { "min-h-[280px] max-h-[280px] " : section.type == "grid" && (section.images.length  >= 3)   } ,
                                        {"col-span-2" : section.type == "grid" && section.images.length ==  3 && imageIndex == 2}
                                    )} />
                                ))}
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}

export default Gallery
