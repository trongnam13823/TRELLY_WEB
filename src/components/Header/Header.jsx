import { Bell } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ThemeSwitcher from "@/components/Theme/ThemeSwitcher";
import { AvatarAccount } from "@/components/Header/AvatarAccount/AvatarAccount";
import MenuDropdown from "./MenuDropdown/MenuDropdown";
import { Link } from "react-router-dom";
import BtnNewBoard from "@/components/BtnNewBoard/BtnNewBoard";


export default function Header() {
  return (
    <div className="flex gap-4 h-14 items-center justify-between px-4 border-b sticky top-0 bg-background/80 backdrop-blur z-50">
      <div className="flex items-center gap-10">
        <Link to='/' className="text-xl uppercase font-bold text-primary h-fit">Trelly</Link>
        <div className="hidden xl:block"><MenuDropdown /></div>
        <BtnNewBoard />
      </div>

      <div className="flex items-center gap-2">
        <Input className="md:w-80 lg:w hidden sm:block border-primary/60" placeholder="Search..." />
        <Button variant="ghost" className="rounded-full p-0 size-8 shrink-0">
          <Bell size={20} />
        </Button>
        <ThemeSwitcher />
        <AvatarAccount />
      </div>
    </div>
  )
}