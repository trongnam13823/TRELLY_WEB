import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import userSchema from "@/schemas/userSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useEffect } from "react"
import InputOTP from "@/components/Form/InputOTP"
import { useMutation, useQuery } from "@tanstack/react-query"
import authApi from "@/api/auth.api"
import { toast } from "react-toastify"
import nprogress from "nprogress"
import useAuth from "@/store/useAuth"
import ImageLoader from "@/components/ImageLoader"
import { z } from "zod"
import { pick } from "lodash"

export default function FormEnable2FA({ isOpenDialog, setIsOpenDialog }) {
  const { setUser, user } = useAuth()
  const { control, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: zodResolver(z.object(pick(userSchema, ['totp']))),
    defaultValues: { totp: '' },
  })

  const { data: dataQRCode } = useQuery({
    queryKey: ['auth/qrCode-2fa'],
    queryFn: authApi.qrCode2FA,
    staleTime: Infinity, enabled: isOpenDialog
  })

  const enable2FA = useMutation({
    mutationFn: authApi.enable2FA,
    onMutate: () => {
      nprogress.start()
    },
    onSuccess: () => {
      setIsOpenDialog(false)
      setTimeout(() => {
        setUser({ ...user, is2FAEnabled: true })
        toast.success('Enable 2FA successfully')
      }, 0)
    },
    onError: (error) => {
      toast.error(error.message)
    }
  })

  useEffect(() => {
    reset()
  }, [isOpenDialog])

  function onSubmit(values) {
    enable2FA.mutate({ totp: values.totp })
  }


  return (
    <DialogContent className='sm:w-fit'>
      <DialogHeader>
        <DialogTitle>Enable Two-factor auth</DialogTitle>
        <DialogDescription>
          Please enter the TOTP from your authenticator app.
        </DialogDescription>
      </DialogHeader>

      <ImageLoader src={dataQRCode?.qrCode} classNameContainer="mx-auto my-2" width={200} height={200} />

      <form onSubmit={handleSubmit(onSubmit)} className='grid gap-6'>
        <InputOTP name='totp' {...{ control, errors }} />
        <Button type='submit' disabled={enable2FA.isPending}>Enable</Button>
      </form>

    </DialogContent>
  )
}