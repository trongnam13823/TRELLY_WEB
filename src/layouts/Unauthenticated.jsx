import usersApi from "@/api/users.api";
import useAuth from "@/store/useAuth";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";

export default function Unauthenticated() {
  const navigate = useNavigate()
  const { isFetching, isSuccess } = useQuery({
    queryKey: ['users/info'],
    queryFn: usersApi.info,
    refetchOnWindowFocus: false
  })
  const { accessToken } = useAuth()

  useEffect(() => {
    if (isFetching) return
    if (isSuccess) navigate('/')
  }, [isFetching])

  if (accessToken) return <Navigate to="/" />
  return <Outlet />
}