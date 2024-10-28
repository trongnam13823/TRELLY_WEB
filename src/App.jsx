import { Outlet, useNavigate } from "react-router-dom";
import { ReactHooksWrapper, setHook } from 'react-hooks-outside';
import { useQueryClient } from "@tanstack/react-query"

setHook("navigate", useNavigate).setHook("queryClient", useQueryClient)

export default function App() {
  return (
    <>
      <Outlet />
      <ReactHooksWrapper />
    </>
  )
}