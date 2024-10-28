import boardsApi from "@/api/boards.api";
import ImageLoader from "@/components/ImageLoader";
import Spinner from "@/components/Spinner";
import getOriginalImageUrl from "@/utils/getOriginalImageUrl";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import BoardHeader from "./BoardHeader";
import { getBoard } from "@/utils/mockApi";
import BoardContent from "./BoardContent";
import useBoardDetail from "@/store/useBoardDetail";

export default function BoardDetail() {
  const navigate = useNavigate()
  const { id } = useParams();
  const { board, setBoard } = useBoardDetail()
  const { data: queryBoard, isFetching, isError, error, isSuccess } = useQuery({
    queryKey: ['board', id],
    queryFn: () => boardsApi.detail(id),
    refetchOnWindowFocus: false
  })

  useEffect(() => {
    if (isError) {
      toast.error(error.message)
      navigate('/boards')
    }

    if (isSuccess) {
      getBoard(8, 8).then((board) => setBoard({ ...board, background: queryBoard?.background }))
    }
  }, [isFetching])

  return (
    isFetching ? <div className="flex-1 grid place-items-center"><Spinner /></div> :
      (
        <div className="relative flex-1 flex flex-col">
          {/* Background */}
          <ImageLoader src={getOriginalImageUrl(board?.background)} placeholder={board?.background} alt={board?.title} classNameContainer='!absolute inset-0 -z-10' />
          {/* Board Header */}
          <BoardHeader title={board?.title} />
          {/* List Columns */}
          <BoardContent list={board?.columns} orderIds={board?.columnOrderIds} />
        </div >
      )
  )
}