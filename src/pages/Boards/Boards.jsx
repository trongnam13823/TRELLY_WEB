import { Clock, LayoutGrid, Pin } from "lucide-react"
import BoardList from "./BoardList"
import boardsApi from "@/api/boards.api"
import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { useSearchParams } from "react-router-dom"
import usersApi from "@/api/users.api"
import useAuth from "@/store/useAuth"
import BtnNewBoard from "@/components/BtnNewBoard/BtnNewBoard"
import Spinner from "@/components/Spinner"

export default function Boards() {
  const [searchParams] = useSearchParams()
  const page = searchParams.get('page') || 1
  const limit = 10

  const { user } = useAuth()

  const { data: queryBoards, isLoading: isLoadingBoards } = useQuery({
    queryKey: ['boards', page, limit],
    queryFn: () => boardsApi.list({ params: { page, limit } }),
    refetchOnWindowFocus: false,
    placeholderData: keepPreviousData,
    gcTime: 0,
  })

  const { data: queryPinnedBoards, isLoading: isLoadingPinnedBoards } = useQuery({
    queryKey: ['pinnedBoards', user?.pinnedBoards],
    queryFn: () => usersApi.pinnedBoards(),
    refetchOnWindowFocus: false,
    placeholderData: keepPreviousData,
    gcTime: 0,
  })

  const { data: queryRecentBoards, isLoading: isLoadingRecentBoards } = useQuery({
    queryKey: ['recentBoards', user?.recentBoards],
    queryFn: () => usersApi.recentBoards(),
    refetchOnWindowFocus: false,
    placeholderData: keepPreviousData,
    gcTime: 0,
  })

  return (
    isLoadingBoards || isLoadingPinnedBoards || isLoadingRecentBoards
      ? (
        <div className="flex-1 grid place-items-center"><Spinner /></div>)
      : (
        <div className="mx-4">
          <div className={`flex flex-col gap-1 items-center justify-center h-[calc(100vh-var(--header-height))]
          ${queryBoards?.data?.length === 0 ? 'block' : 'hidden'}`}
          >
            <h1 className="text-2xl font-bold">Oops! No Boards Yet</h1>
            <p className="text-sm text-gray-500">It looks like you haven&apos;t created any boards. Let&apos;s get started!</p>
            <BtnNewBoard title="Create Your First Board" className="mt-2 text-lg h-auto" />
          </div>

          <div className="max-w-screen-xl mx-auto my-8 space-y-8">
            <BoardList Icon={Pin} heading="Pinned Boards" boards={queryPinnedBoards} />
            <BoardList Icon={Clock} heading="Recent Boards" boards={queryRecentBoards} />
            <BoardList Icon={LayoutGrid} heading="All Boards"
              boards={queryBoards?.data || []}
              page={page} maxPages={Math.ceil((queryBoards?.total || 0) / limit)}
            />
          </div>
        </div >
      )
  )
}