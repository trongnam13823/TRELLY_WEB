import Pagination from "@/components/Pagination";
import BoardItem from "./BoardItem";

export default function BoardList({ Icon, heading, boards = [], page, maxPages }) {
  return (
    <>
      {boards.length > 0 && (
        <div className="space-y-4">

          {/* Heading */}
          <div className="flex items-center justify-between">
            <h2 className="text-xl text-muted-foreground font-bold uppercase flex gap-2 items-center">
              <Icon size={22} /> {heading}
            </h2>

            {/* Pagination */}
            <div className="justify-center md:flex hidden"><Pagination page={page} maxPages={maxPages} /></div>
          </div>


          {/* Boards */}
          <ol className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 list-none" >
            {boards.map((board) => (
              <li key={board._id}>
                <BoardItem _id={board._id} title={board.title} background={board.background} />
              </li>
            ))}
          </ol>

          {/* Pagination */}
          <div className="justify-center md:hidden flex"><Pagination page={page} maxPages={maxPages} /></div>
        </div>
      )}
    </>
  );
}
