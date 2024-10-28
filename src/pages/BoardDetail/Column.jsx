import { Button } from "@/components/ui/button";
import { Ellipsis, Plus } from "lucide-react";
import ListCard from "./ListCard";
import { useEffect, useRef, useState } from "react";
import { attachClosestEdge } from '@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge'
import { draggable, dropTargetForElements } from '@atlaskit/pragmatic-drag-and-drop/element/adapter/'
import { combine } from '@atlaskit/pragmatic-drag-and-drop/combine'
import { extractClosestEdge } from '@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge'
import invariant from 'tiny-invariant'

export default function Column({ data = {}, isPreview = false, heightPrev }) {
  const { title, cards, cardOrderIds } = data
  const [isDragging, setIsDragging] = useState(false)
  const [closestEdge, setClosestEdge] = useState(null)
  const [heightPlaceholder, setHeightPlaceholder] = useState(0)
  const dragRef = useRef(null)
  const dropRef = useRef(null)
  useEffect(() => {
    const dragElement = dragRef.current
    const dropElement = dropRef.current
    invariant(dragElement)
    invariant(dropElement)

    return combine(
      draggable({
        element: dragElement,
        getInitialData() {
          return {
            type: 'column', column: data,
            size: {
              width: dropElement.offsetWidth,
              height: dropElement.offsetHeight,
            },
          }
        },
        onDragStart() {
          setIsDragging(true)
        },
        onDrop() {
          setIsDragging(false)
        },
      }),
      dropTargetForElements({
        element: dropElement,
        canDrop({ source }) {
          if (source.data.type === 'column') return true
          if (source.data.type === 'card' && data.cards.length === 0) return true
          return false
        },
        getData({ input, element }) {
          return attachClosestEdge(
            { type: 'column', column: data },
            { input, element, allowedEdges: ['left', 'right'] }
          )
        },
        onDrag({ self, source }) {
          if (source.data.type === 'column') setClosestEdge(extractClosestEdge(self.data))
        },
        onDragEnter({ source }) {
          if (source.data.type === 'card' && data.cards.length === 0) {
            setHeightPlaceholder(source.element.offsetHeight)
          }
        },
        onDragLeave() {
          setClosestEdge(null)
          setHeightPlaceholder(0)
        },
        onDrop() {
          setClosestEdge(null)
          setHeightPlaceholder(0)
        },
        getIsSticky() {
          return true
        },
      })
    )
  }, [data])

  return (
    <li ref={dropRef} className="flex-shrink-0 list-none" style={{ height: heightPrev }}>
      <div className={`relative rounded-xl bg-[var(--tr-background-list)] py-2 w-[280px] flex flex-col gap-2 max-h-full`}>
        {/* Column Header */}
        <div ref={dragRef} className="pl-2 text-[var(--ds-text)]">
          <div className="px-3 flex items-center justify-between">
            <h2 className="text-base font-bold">{title}</h2>
            <Button className="size-8 hover:bg-[var(--ds-background-neutral-hovered)] hover:text-[var(--ds-text)]" variant='ghost' size='icon'>
              <Ellipsis size={22} />
            </Button>
          </div>
        </div>

        <ListCard list={cards} orderIds={cardOrderIds} heightPlaceholder={heightPlaceholder} isPreview={isPreview} />

        {/* Button Add Card */}
        <div className="px-2">
          <Button variant='ghost'
            className="hover:bg-[var(--ds-background-neutral-hovered)] w-full rounded-xl h-fit px-3 py-2">
            <div className="text-[var(--ds-text-subtle)] flex items-center gap-1 mr-auto"><Plus size={20} /> Add a card</div>
          </Button>
        </div>

        {/* Dragging */}
        <div className={`absolute inset-0 bg-inherit opacity-80 rounded-[inherit] pointer-events-none ${isDragging ? 'block' : 'hidden'}`} />
        <div
          className={`absolute border-2 bg-borderDnd/20 border-borderDnd border-dashed rounded-[inherit] top-0 h-full w-1/2 
          ${closestEdge === 'right' ? 'right-0' : 'left-0'} ${closestEdge ? 'block' : 'hidden'}`}
        />
      </div>
    </li>
  )
}