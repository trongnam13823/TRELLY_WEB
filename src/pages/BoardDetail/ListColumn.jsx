import mapOrder from "@/utils/mapOrder";
import Column from "./Column";
import { useMemo } from "react";
import { autoScrollForElements } from '@atlaskit/pragmatic-drag-and-drop-auto-scroll/element'
import { unsafeOverflowAutoScrollForElements } from '@atlaskit/pragmatic-drag-and-drop-auto-scroll/unsafe-overflow/element'
import { combine } from '@atlaskit/pragmatic-drag-and-drop/combine'
import { useEffect, useRef } from 'react'
import invariant from "tiny-invariant";

export default function ListColumn({ list = [], orderIds = [] }) {
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
          fromLeftEdge: { left: 4000, bottom: 0, top: 0 },
          fromRightEdge: { right: 400, bottom: 0, top: 0 },
        }),
      })
    )
  }, [])

  return (
    <ol ref={containerRef} className="flex gap-3 px-3 absolute inset-0 list-none overflow-x-auto mb-[6px] pb-[6px] scrollbar scrollbar-thumb-[#fff6] scrollbar-track-[#00000026]">
      {listOrdered.map((column) => (
        <Column key={column._id} data={column} />
      ))}
    </ol>
  )
}