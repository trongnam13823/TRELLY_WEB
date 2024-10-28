import useBoardDetail from "@/store/useBoardDetail";
import ListColumn from "./ListColumn";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Card from "./Card";
import Column from "./Column";
import { monitorForElements } from '@atlaskit/pragmatic-drag-and-drop/element/adapter'
import { setCustomNativeDragPreview } from '@atlaskit/pragmatic-drag-and-drop/element/set-custom-native-drag-preview'
import { reorderWithEdge } from '@atlaskit/pragmatic-drag-and-drop-hitbox/util/reorder-with-edge'
import { extractClosestEdge } from '@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge'

export default function BoardContent({ list, orderIds }) {
  const { setBoard, getBoard } = useBoardDetail()
  const [preview, setPreview] = useState()
  const [source, setSource] = useState()

  useEffect(() => {
    return monitorForElements({
      onDrop({ source, location }) {
        if (location.current.dropTargets.length !== 1) return
        const sData = source.data
        const lData = location.current.dropTargets[0].data
        const cloestEdge = extractClosestEdge(lData)
        const board = getBoard()

        if (sData.type === 'column' && lData.type === 'column') {
          const sColumn = sData.column
          const lColumn = lData.column

          const newColumnOrderIds = reorderWithEdge({
            list: board.columnOrderIds,
            startIndex: board.columnOrderIds.indexOf(sColumn._id),
            indexOfTarget: board.columnOrderIds.indexOf(lColumn._id),
            axis: 'horizontal',
            closestEdgeOfTarget: cloestEdge,
          })

          setBoard({ ...board, columnOrderIds: newColumnOrderIds })
        }

        // card drag and drop
        if (sData.type === 'card' && lData.type === 'card') {
          const sCard = sData.card
          const lCard = lData.card
          if (sCard._id === lCard._id) return
          const sColumnId = sCard.columnId
          const lColumnId = lCard.columnId

          if (sColumnId === lColumnId) {
            const newColumns = board.columns.map((column) => {
              if (column._id !== sColumnId) return column
              else {
                const newCardOrderIds = reorderWithEdge({
                  list: column.cardOrderIds,
                  startIndex: column.cardOrderIds.indexOf(sCard._id),
                  indexOfTarget: column.cardOrderIds.indexOf(lCard._id),
                  axis: 'vertical',
                  closestEdgeOfTarget: cloestEdge,
                })

                return { ...column, cardOrderIds: newCardOrderIds }
              }
            })

            setBoard({ ...board, columns: newColumns })
          }

          if (sColumnId !== lColumnId) {
            const newColumns = board.columns.map((column) => {
              // 2. new column drag
              if (column._id === sColumnId) {
                const newCardOrderIds = column.cardOrderIds.filter((id) => id !== sCard._id)
                const newCards = column.cards.filter((card) => card._id !== sCard._id)

                return { ...column, cardOrderIds: newCardOrderIds, cards: newCards }
              }
              // 3. new column drop
              if (column._id === lColumnId) {
                const indexDrop = column.cardOrderIds.indexOf(lCard._id)
                const offset = cloestEdge === 'top' ? 0 : 1
                const newCard = { ...sCard, columnId: lColumnId }
                const newCardOrderIds = [...column.cardOrderIds]
                const newCards = [...column.cards]

                newCardOrderIds.splice(indexDrop + offset, 0, newCard._id)
                newCards.splice(offset, 0, newCard)
                return { ...column, cardOrderIds: newCardOrderIds, cards: newCards }
              }

              return column
            })

            setBoard({ ...board, columns: newColumns })
          }
        }

        // // card drop to column
        if (sData.type === 'card' && lData.type === 'column') {
          const sCard = sData.card
          const lColumn = lData.column
          const sColumnId = sCard.columnId
          const lColumnId = lColumn._id

          const newColumns = board.columns.map((column) => {
            if (column._id === sColumnId) {
              const newCardOrderIds = column.cardOrderIds.filter((id) => id !== sCard._id)
              const newCards = column.cards.filter((card) => card._id !== sCard._id)
              return { ...column, cardOrderIds: newCardOrderIds, cards: newCards }
            }
            if (column._id === lColumnId) {
              const newCard = { ...sCard, columnId: lColumnId }
              const newCardOrderIds = [...column.cardOrderIds, newCard._id]
              const newCards = [...column.cards, newCard]
              return { ...column, cardOrderIds: newCardOrderIds, cards: newCards }
            }

            return column
          })

          setBoard({ ...board, columns: newColumns })
        }
      },
      onGenerateDragPreview({ nativeSetDragImage, source }) {
        setCustomNativeDragPreview({
          nativeSetDragImage,
          render({ container }) {
            setPreview(container)
            setSource(source)
          },
          getOffset() {
            return { x: 0, y: 0 }
          },
        })
      },
    })
  }, [])

  return (
    <div className="flex-1 relative">
      <ListColumn list={list} orderIds={orderIds} />

      {preview &&
        createPortal(
          <div style={{ ...source?.data.size }} className={`-rotate-3 origin-top-left`}>
            {!!(source?.data.type === 'card') && <Card data={source?.data.card} isPreview />}
            {!!(source?.data.type === 'column') && <Column data={source?.data.column} isPreview heightPrev={source?.data.size.height} />}
          </div>,
          preview
        )}
    </div>
  )
}