import InputText from "@/components/Form/InputText"
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
import authApi from "@/api/auth.api"
import { useMutation } from "@tanstack/react-query"
import { toast } from "react-toastify"
import nprogress from "nprogress"
import useAuth from "@/store/useAuth"
import { z } from "zod"
import { pick } from "lodash"

export default function FormDisable2FA({ isOpenDialog, setIsOpenDialog }) {
  const { setUser, user } = useAuth()
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: zodResolver(z.object(pick(userSchema, ['password']))),
    defaultValues: { password: '' },
  })

  const disable2FA = useMutation({
    mutationFn: authApi.disable2FA,
    onMutate: () => {
      nprogress.start()
    },
    onSuccess: () => {
      setIsOpenDialog(false)
      setTimeout(() => {
        setUser({ ...user, is2FAEnabled: false })
        toast.success('Disable 2FA successfully')
      }, 0)
    },
    onError: (error) => {
      toast.error(error.message)
    }
  })

  useEffect(() => {
    reset()
  }, [isOpenDialog])

  function onSubmit(value) {
    disable2FA.mutate(value)
  }

  return (
    <DialogContent className='sm:w-fit'>
      <DialogHeader>
        <DialogTitle>Disable Two-factor auth</DialogTitle>
        <DialogDescription>
          Please enter your password to disable Two-factor auth
        </DialogDescription>
      </DialogHeader>

      <form onSubmit={handleSubmit(onSubmit)} className='grid gap-6'>
        <InputText name='password' type='password' {...{ register, errors }} />
        <Button type='submit' disabled={disable2FA.isPending}>Disable</Button>
      </form>

    </DialogContent>
  )
}