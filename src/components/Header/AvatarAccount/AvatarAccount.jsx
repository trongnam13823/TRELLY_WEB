import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Dialog } from "@/components/ui/dialog"
import { Avatar } from "@/components/ui/avatar"
import { useState } from "react"
import { Switch } from "@/components/ui/switch"
import FormDisable2FA from "./FormDisable2FA"
import FormEnable2FA from "./FormEnable2FA"
import useAuth from "@/store/useAuth"
import { Link } from "react-router-dom"
import ImageLoader from "@/components/ImageLoader"


export function AvatarAccount() {
  const [isOpenMenu, setIsOpenMenu] = useState(false)
  const [isOpenDialog, setIsOpenDialog] = useState(false)
  const { logout, user } = useAuth()

  return (
    <Dialog open={isOpenDialog} onOpenChange={setIsOpenDialog}>
      <DropdownMenu open={isOpenMenu} onOpenChange={setIsOpenMenu}>
        <DropdownMenuTrigger asChild>
          <Avatar className="size-8 cursor-pointer">
            <ImageLoader src={user && user.avatar} width={32} height={32} />
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent sideOffset={11} className="mr-4 min-w-60">

          <DropdownMenuLabel className="space-y-1">
            <p>{user.fullname}</p>
            <p className="text-xs text-muted-foreground">{user.email}</p>
          </DropdownMenuLabel>

          <DropdownMenuSeparator />

          <DropdownMenuGroup>
            <Link to="/profile">
              <DropdownMenuItem>
                Profile
              </DropdownMenuItem>
            </Link>

            <DropdownMenuItem >
              <p
                onClick={(e) => {
                  e.preventDefault()
                  setIsOpenDialog(true)
                }}
                className="flex w-full justify-between">
                Two-factor auth <Switch checked={user.is2FAEnabled} />
              </p>
            </DropdownMenuItem>
          </DropdownMenuGroup>

          <DropdownMenuSeparator />

          <DropdownMenuItem onClick={logout}>
            Log out
          </DropdownMenuItem>

        </DropdownMenuContent>
      </DropdownMenu >

      {user.is2FAEnabled ? <FormDisable2FA {...{ isOpenDialog, setIsOpenDialog }} /> : <FormEnable2FA {...{ isOpenDialog, setIsOpenDialog }} />}
    </Dialog>
  )
}
