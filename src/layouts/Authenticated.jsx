import usersApi from "@/api/users.api";
import useAuth from "@/store/useAuth";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";

export default function Authenticated() {
  const navigate = useNavigate()
  const { data, isFetching, isError, isSuccess } = useQuery({
    queryKey: ['users/info'],
    queryFn: usersApi.info,
    refetchOnWindowFocus: false
  })

  const { accessToken, setUser } = useAuth()

  useEffect(() => {
    if (isFetching) return
    if (isError) navigate('/login')
    if (isSuccess) setUser({ ...data })
  }, [isFetching])

  if (accessToken) return <Outlet />
  return <Navigate to="/login" />
}