import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { toast } from 'react-toastify'
import InputText from '@/components/Form/InputText'
import userSchema from '@/schemas/userSchema'
import FormHeader from './components/FormHeader'
import FormContent from './components/FormContent'
import FormBtnBack from './components/FormBtnBack'
import { useEffect, useState } from 'react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogCancel
} from '@/components/ui/alert-dialog'
import { useMutation } from '@tanstack/react-query'
import authApi from '@/api/auth.api'
import nprogress from 'nprogress'
import { useLocation } from 'react-router-dom'
import { pick } from 'lodash'
import { z } from 'zod'

export function SendResetPassword() {
  const location = useLocation()
  const [isOpenDialog, setIsOpenDialog] = useState(false)

  const { register, handleSubmit, formState: { errors }, getValues } = useForm({
    resolver: zodResolver(z.object(pick(userSchema, ['email']))),
    defaultValues: { email: location.state?.email || '' },
  })

  const sendResetPasswordAPI = useMutation({
    mutationFn: authApi.sendResetPassword,
    onMutate: () => nprogress.start(),
    onSuccess: () => {
      setIsOpenDialog(true)
    },
    onError: (error) => {
      toast.error(error.message)
    }
  })


  const onSubmit = async () => {
    sendResetPasswordAPI.mutate({
      email: getValues('email')
    })
  }

  useEffect(() => {
    if (location.state?.email) onSubmit()
  }, [])

  return (
    <>
      <FormHeader title='Forgot Password' desc='Please enter your email to receive a verification link.' />

      <FormContent onSubmit={handleSubmit(onSubmit)}>
        <InputText name='email' label='Email' type='text' {...{ register, errors }} />

        <Button disabled={sendResetPasswordAPI.isPending}>Send</Button>
        <FormBtnBack linkText='Back to Login' linkTo={'/login'} />
      </FormContent>

      <AlertDialog open={isOpenDialog} onOpenChange={setIsOpenDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Password Reset Email Sent</AlertDialogTitle>
            <AlertDialogDescription>
              Please check your inbox and follow the link to reset your password. If you did not receive the email, you can click &quot;Resend&quot; below.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => onSubmit()}>Resend</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
