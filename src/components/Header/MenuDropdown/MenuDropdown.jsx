import { ChevronDown } from "lucide-react";

export default function MenuDropdown() {
  return (
    <div className="gap-6 lg:flex hidden">
      <p className="text-sm font-medium flex items-center gap-1 text-muted-foreground hover:text-primary cursor-pointer"> Workspaces <ChevronDown size={18} /></p>
      <p className="text-sm font-medium flex items-center gap-1 text-muted-foreground hover:text-primary cursor-pointer"> Recent <ChevronDown size={18} /></p>
      <p className="text-sm font-medium flex items-center gap-1 text-muted-foreground hover:text-primary cursor-pointer"> Starred <ChevronDown size={18} /></p>
      <p className="text-sm font-medium flex items-center gap-1 text-muted-foreground hover:text-primary cursor-pointer"> Templates <ChevronDown size={18} /></p>
    </div>
  )
}