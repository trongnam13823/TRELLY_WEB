import ImageLoader from "@/components/ImageLoader";
import { Label } from "@/components/ui/label";
import CarouselBackground from "./CarouselBackground";
import { useQuery } from "@tanstack/react-query";
import boardsApi from "@/api/boards.api";
import { useEffect, useState } from "react";
import shuffleArray from "@/utils/shuffleArray";

export default function SelectBackground({ backgroundSelected, setValue, reset }) {
  const [shuffledBackground, setShuffledBackground] = useState({
    photos: Array(9).fill(''), colors: Array(9).fill(''),
  });

  const { data: backgrounds, isFetched, isError } = useQuery({
    queryKey: ['board/backgrounds'],
    queryFn: () => boardsApi.backgrounds({ params: { transform: "w_288" } }),
    staleTime: Infinity,
  });

  useEffect(() => {
    if (isError || !isFetched) return;

    setShuffledBackground({
      photos: shuffleArray(backgrounds?.photos),
      colors: shuffleArray(backgrounds?.colors),
    });
  }, [isFetched])

  useEffect(() => {
    setValue("background", shuffledBackground.photos[0]);
  }, [shuffledBackground])

  useEffect(() => {
    reset()
  }, [])

  return (
    <>
      {/* Preview Board */}
      <div className="p-3 w-fit mx-auto bg-cover bg-center rounded-md relative shadow-md shadow-primary/20">
        <ImageLoader src={backgroundSelected} classNameContainer="!absolute inset-0" classNameImage="rounded-md" />
        <img src="/assets/create_new_board.svg" className="relative z-10" width={186} height={103} />
      </div>

      {/* Select Background */}
      <div className="flex flex-col gap-2">
        <Label className="text-sm leading-5">Background</Label>
        <CarouselBackground {...{ backgrounds: shuffledBackground.photos, backgroundSelected, setValue }} />
        <CarouselBackground {...{ backgrounds: shuffledBackground.colors, backgroundSelected, setValue }} />
      </div>
    </>
  )
}