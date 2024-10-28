import usersApi from "@/api/users.api";
import useAuth from "@/store/useAuth";
import { useMutation } from "@tanstack/react-query";
import { LoaderCircle, Pin, PinOff } from "lucide-react";
import { toast } from "react-toastify";


export default function ButtonPin({ _id }) {
  const { user, setUser } = useAuth();

  const isPinned = user?.pinnedBoards?.includes(_id) || false;
  const Icon = isPinned ? PinOff : Pin

  const getNewPinnedBoards = () => {
    return isPinned ? user.pinnedBoards.filter(id => id !== _id) : [_id, ...user.pinnedBoards]
  }

  const pinBoardApi = useMutation({
    mutationFn: () => usersApi.update({ pinnedBoards: getNewPinnedBoards() }),
    onSuccess: () => setUser({ ...user, pinnedBoards: getNewPinnedBoards() }),
    onError: () => toast.error('Failed to pin board')
  })

  const handleClick = (e) => {
    e.preventDefault()
    pinBoardApi.mutate()
  }

  return (
    <>
      {
        pinBoardApi.isPending
          ?
          <LoaderCircle size={20} className="absolute bottom-4 right-2 animate-spin" />
          :
          <Icon
            onClick={handleClick}
            size={20} className="absolute bottom-4 right-0 translate-x-full hover:scale-125 group-hover:translate-x-0 group-hover:right-2 transition-transform"
          />
      }
    </>
  )
}