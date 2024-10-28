import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { CheckCircle } from "lucide-react";
import ImageLoader from "@/components/ImageLoader";

export default function CarouselBackground({ backgrounds, backgroundSelected, setValue }) {
  return (
    <Carousel opts={{ align: "start" }}>
      <CarouselContent>
        {(backgrounds || Array(9).fill(null)).map((bg, index) => (
          <CarouselItem
            key={index}
            className="inline-block h-12 basis-28 relative"
            onClick={() => {
              console.log(bg)
              setValue("background", bg)
            }}
          >
            <ImageLoader src={bg} classNameContainer="size-full" classNameImage="rounded-md" />
            <CheckCircle size={20} className={`absolute bottom-1 right-1 text-green-600 bg-white/90 rounded-full p-[1px] 
              ${backgroundSelected && backgroundSelected === bg ? "block" : "hidden"}`}
            />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}