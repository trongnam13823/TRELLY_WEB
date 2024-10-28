import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import { Skeleton } from "./ui/skeleton"
import ColorThief from 'colorthief'

const colorThief = new ColorThief()

export default function ImageLoader({ src, classNameContainer, classNameImage, placeholder, isSetBgColor = false, isPreview = false }) {
  const [loading, setLoading] = useState(!isPreview)
  const [color, setColor] = useState([])

  useEffect(() => {
    const img = new Image();
    img.src = src
    img.crossOrigin = "anonymous"

    img.onload = () => {
      setLoading(false)
      if (isSetBgColor) setColor(colorThief.getColor(img))
    }

    return () => {
      img.onload = null
    }
  }, [src])

  return (
    <div style={{ background: `rgb(${color.join(',')})` }} className={`${loading && 'relative'} ${classNameContainer}`}>
      <img crossOrigin="anonymous" src={src} className={cn(`size-full object-cover object-center mx-auto ${loading ? 'opacity-0' : 'opacity-100'}`, classNameImage)} />

      {placeholder
        ?
        <img crossOrigin="anonymous" src={placeholder} className={cn(`absolute top-0 left-0 size-full object-cover object-center mx-auto ${loading ? 'block' : 'hidden'}`, classNameImage)} />
        :
        <Skeleton className={`absolute size-full top-0 left-0 ${loading ? 'block' : 'hidden'}`} />}
    </div>
  )
}