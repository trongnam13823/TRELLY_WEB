import ImageLoader from "@/components/ImageLoader";
import { Avatar } from "@/components/ui/avatar";
import { Ellipsis, MoveLeft, UserRoundPlus } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function BoardHeader({ title }) {
  const navigate = useNavigate()

  return (
    <div className="flex gap-4 items-center justify-between z-50 m-3 text-white bg-black/40 backdrop-blur rounded-md">
      <div className="h-12 px-2 flex items-center">
        <div className="h-12 px-2 flex gap-4 items-center">
          <MoveLeft onClick={() => navigate(-1)} size={42} className="cursor-pointer hover:bg-white/10 rounded-md px-2 hover:-translate-x-1 transition-all h-8" />
          <h1 className="text-xl font-bold">{title}</h1>
        </div>
      </div>

      <div className="h-12 px-2 flex gap-4 items-center">
        <button className="border border-white hover:bg-white/10 transition-colors rounded-md px-2 leading-[30px] flex items-center gap-1">
          <UserRoundPlus size={16} /> Invite
        </button>

        <div className="flex items-center -space-x-1">
          {Array.from({ length: 6 }).map((_, index) => (
            <Avatar className="size-8 cursor-pointer border border-gray-400 bg-gray-200" key={index}>
              <ImageLoader src='https://avatar.iran.liara.run/public' width={32} height={32} />
            </Avatar>
          ))}

          <span className="h-8 leading-8 px-1.5 bg-white/20 rounded-md">+99</span>
        </div>

        <Ellipsis size={42} className="cursor-pointer hover:bg-white/10 rounded-md px-2 transition-colors h-8" />
      </div>
    </div>
  )
}