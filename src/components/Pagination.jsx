import {
  Pagination as PaginationUI,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { Link } from "react-router-dom";

export default function Pagination({ page = 0, maxPages = 0 }) {
  page = Number(page)
  const startPage = Math.max(1, page + 2 > maxPages ? maxPages - 4 : Math.max(1, page - 2))

  return (
    <PaginationUI className={`${page > 0 && maxPages > 1 && maxPages >= page ? 'block' : 'hidden'} w-fit`}>
      <PaginationContent className="w-fit">

        <PaginationItem>
          <Link to={`?page=${page - 1}`} >
            <PaginationPrevious className={page === 1 ? 'hidden' : ''} />
          </Link>
        </PaginationItem>

        {startPage > 1 && <PaginationItem><PaginationEllipsis /></PaginationItem>}

        {Array.from({ length: Math.min(5, maxPages) }, (_, i) => {
          const currentPage = startPage + i
          return (
            <PaginationItem key={i}>
              <Link to={`?page=${currentPage}`}>
                <PaginationLink
                  className={page === currentPage ? 'bg-muted-foreground text-muted hover:bg-muted-foreground hover:text-muted' : ''}
                  isActive={page === currentPage}>{currentPage}
                </PaginationLink>
              </Link>
            </PaginationItem>
          )
        })}

        {startPage + 4 < maxPages && <PaginationItem><PaginationEllipsis /></PaginationItem>}

        <PaginationItem>
          <Link to={`?page=${page + 1}`}>
            <PaginationNext className={page === maxPages ? 'hidden' : ''} />
          </Link>
        </PaginationItem>

      </PaginationContent>
    </PaginationUI>
  )
}

