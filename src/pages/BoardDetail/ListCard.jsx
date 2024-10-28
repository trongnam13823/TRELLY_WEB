import Card from "./Card";
import { useMemo } from "react";
import mapOrder from "@/utils/mapOrder";
import { autoScrollForElements } from '@atlaskit/pragmatic-drag-and-drop-auto-scroll/element'
import { unsafeOverflowAutoScrollForElements } from '@atlaskit/pragmatic-drag-and-drop-auto-scroll/unsafe-overflow/element'
import { combine } from '@atlaskit/pragmatic-drag-and-drop/combine'
import { useEffect, useRef } from 'react'
import invariant from "tiny-invariant";

export default function ListCard({ list = [], orderIds = [], isPreview = false, heightPlaceholder = 0 }) {
  const listOrdered = useMemo(() => mapOrder(list, orderIds, '_id'), [list, orderIds])
  const containerRef = useRef(null)

  useEffect(() => {
    const element = containerRef.current
    invariant(element)
    return combine(
      autoScrollForElements({ element }),

      unsafeOverflowAutoScrollForElements({
        element,
        getOverflow: () => ({
          fromTopEdge: { top: 400, left: 0, right: 0 },
          fromBottomEdge: { bottom: 400, left: 0, right: 0 },
        }),
      })
    )
  }, [])

  return (
    <ol ref={containerRef} className={`list-none flex flex-col gap-2 overflow-y-auto overflow-x-hidden py-1 mx-1 px-1 scrollbar-thin scrollbar-thumb-custom-thumb-1 scrollbar-track-custom-track-1
      ${listOrdered.length || heightPlaceholder > 0 ? 'block' : 'hidden'}
    `}>
      {listOrdered.map((card) => (
        <Card key={card._id} data={card} isPreview={isPreview} />
      ))}
      <li style={{ height: `${heightPlaceholder}px`, width: '100%' }}
        className={`${heightPlaceholder > 0 ? 'block' : 'hidden'} bg-borderDnd/20 rounded-lg  border-2 border-borderDnd border-dashed`}>
      </li>
    </ol>
  )
}