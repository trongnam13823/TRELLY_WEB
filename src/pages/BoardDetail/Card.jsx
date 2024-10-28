import ImageLoader from "@/components/ImageLoader";
import { MessageCircleMore, Paperclip, UsersRound } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { attachClosestEdge } from '@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge'
import { draggable, dropTargetForElements } from '@atlaskit/pragmatic-drag-and-drop/element/adapter/'
import { combine } from '@atlaskit/pragmatic-drag-and-drop/combine'
import { extractClosestEdge } from '@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge'
import invariant from 'tiny-invariant'


export default function Card({ data = {}, isPreview = false }) {
  const { title, cover, members = [], comments = [], attachments = [], } = data
  const [isDragging, setIsDragging] = useState(false)
  const [closestEdge, setClosestEdge] = useState(null)
  const dndRef = useRef(null)

  useEffect(() => {
    const dndElement = dndRef.current
    invariant(dndElement)

    return combine(
      draggable({
        element: dndElement,
        getInitialData() {
          return {
            type: 'card', card: data,
            size: {
              width: dndElement.offsetWidth,
              height: dndElement.offsetHeight,
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
        element: dndElement,
        canDrop({ source }) {
          if (source.data.type === 'card') return true
          return false
        },
        getData({ input, element }) {
          return attachClosestEdge(
            { type: 'card', card: data },
            { input, element, allowedEdges: ['top', 'bottom'] }
          )
        },
        onDrag({ self, source }) {
          if (source.data.type === 'card') setClosestEdge(extractClosestEdge(self.data))
        },
        onDragLeave() {
          setClosestEdge(null)
        },
        onDrop() {
          setClosestEdge(null)
        },
        getIsSticky() {
          return true
        },
      })
    )
  }, [data])

  return (
    <li ref={dndRef}
      className={`list-none relative rounded-lg bg-[var(--ds-surface-raised)] card-shadow cursor-pointer overflow-hidden flex-shrink-0 hover:outline hover:outline-2 hover:-outline-offset-2 hover:outline-borderDnd`}>
      {/* Cover */}
      <ImageLoader src={cover} isSetBgColor={true} isPreview={isPreview}
        classNameImage={`object-contain size-auto max-h-[260px] pointer-events-none`} classNameContainer={`${cover ? 'block w-full' : 'hidden'}`}
      />

      <div className="text-[var(--ds-text)] px-3 py-2 space-y-2">
        <p className="text-sm">{title}</p>
        <div className="flex items-center gap-4">
          <div className={`${members.length ? 'block' : 'hidden'} flex items-center gap-1`}><UsersRound size={16} /> {members.length}</div>
          <div className={`${comments.length ? 'block' : 'hidden'} flex items-center gap-1`}><MessageCircleMore size={16} /> {comments.length}</div>
          <div className={`${attachments.length ? 'block' : 'hidden'} flex items-center gap-1`}><Paperclip size={16} /> {attachments.length}</div>
        </div>
      </div>

      {/* Dragging */}
      <div className={`absolute inset-0 bg-inherit opacity-80 rounded-[inherit] pointer-events-none ${isDragging ? 'block' : 'hidden'}`} />
      <div
        className={`absolute border-2 bg-borderDnd/20 border-borderDnd border-dashed rounded-[inherit] left-0 h-1/2 w-full 
        ${closestEdge === 'bottom' ? 'bottom-0' : 'top-0'} ${closestEdge ? 'block' : 'hidden'}`}
      />
    </li>
  )
}