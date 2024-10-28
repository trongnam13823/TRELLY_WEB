import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import InputText from '@/components/Form/InputText'
import userSchema from '@/schemas/userSchema'
import FormHeader from './components/FormHeader'
import FormContent from './components/FormContent'
import { Navigate, useNavigate, useSearchParams } from 'react-router-dom'
import { useState } from 'react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from '@/components/ui/alert-dialog'
import { useMutation } from '@tanstack/react-query'
import authApi from '@/api/auth.api'
import nprogress from 'nprogress'
import { z } from 'zod'

const FormSchema = z.object({
  password: userSchema.password,
  repeatPassword: z.string().trim(),
}).refine(
  (data) => data.password === data.repeatPassword,
  { message: 'Passwords do not match', path: ['repeatPassword'] }
)

export function ResetPassword() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const email = searchParams.get('email');
  const token = searchParams.get('token');

  const [isOpenDialog, setIsOpenDialog] = useState(false)

  const { register, handleSubmit, formState: { errors }, getValues } = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: { password: '', repeatPassword: '' },
  })

  const resetPasswordAPI = useMutation({
    mutationFn: authApi.resetPassword,
    onMutate: () => {
      nprogress.start()
    },

    onSettled: () => {
      setIsOpenDialog(true)
    },
  })

  const onSubmit = async () => {
    resetPasswordAPI.mutate({
      token,
      password: getValues('password'),
    })
  }

  if (!email || !token) return <Navigate to='/login' />
  return (
    <>
      <FormHeader title='Reset Password' desc='Please enter your new password below.' />

      <FormContent onSubmit={handleSubmit(onSubmit)}>
        <InputText name='password' label='Password' type='password' {...{ register, errors }} />
        <InputText name='repeatPassword' label='Repeat Password' type='password' {...{ register, errors }} />

        <Button disabled={resetPasswordAPI.isPending}>Reset</Button>
      </FormContent>

      <AlertDialog open={isOpenDialog} onOpenChange={setIsOpenDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {resetPasswordAPI.isSuccess && "Password Reset Successful"}
              {resetPasswordAPI.isError && "Password Reset Failed"}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {resetPasswordAPI.isSuccess && "Your password has been successfully reset. You can now log in with your new password."}
              {resetPasswordAPI.isError && `There was an issue resetting your password (${resetPasswordAPI.error?.message}).`}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            {resetPasswordAPI.isSuccess &&
              <AlertDialogAction onClick={() => { navigate('/login', { state: { email } }) }}>
                Login
              </AlertDialogAction>
            }

            {resetPasswordAPI.isError &&
              <AlertDialogAction onClick={() => { navigate('/send-reset-password', { state: { email } }) }}>
                Resend Email
              </AlertDialogAction>
            }
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
