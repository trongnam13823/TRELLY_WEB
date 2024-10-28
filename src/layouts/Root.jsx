import Header from "@/components/Header/Header";
import { Outlet } from "react-router-dom";

export default function Root() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <Outlet />
    </div>
  )
}