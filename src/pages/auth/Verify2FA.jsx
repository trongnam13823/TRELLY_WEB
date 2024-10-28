import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { toast } from 'react-toastify'
import userSchema from '@/schemas/userSchema'
import InputOTP from '@/components/Form/InputOTP'
import FormHeader from './components/FormHeader'
import FormContent from './components/FormContent'
import FormBtnBack from './components/FormBtnBack'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import authApi from '@/api/auth.api'
import nprogress from 'nprogress'
import useAuth from '@/store/useAuth'
import { pick } from 'lodash'
import { z } from 'zod'

export function Verify2FA() {
  const location = useLocation()
  const navigate = useNavigate()
  const { setAccessToken } = useAuth()
  const email = location.state?.email
  const password = location.state?.password

  const { handleSubmit, formState: { errors }, control } = useForm({
    resolver: zodResolver(z.object(pick(userSchema, ['totp']))),
    defaultValues: { totp: '' },
  })

  const loginAPI = useMutation({
    mutationFn: authApi.login,
    onMutate: () => nprogress.start(),
    onSuccess: (data) => {
      setAccessToken(data.accessToken)
      navigate('/')
    },
    onError: (error) => {
      toast.error(error.message)
    }
  })

  const onSubmit = async (data) => {
    loginAPI.mutate({ email, password, totp: data.totp })
  }


  if (!email || !password) return <Navigate to='/login' />
  return (
    <>
      <FormHeader title='Two-Step Verification' desc='Enter the TOTP code from your authenticator.' />

      <FormContent onSubmit={handleSubmit(onSubmit)}>
        <InputOTP name='totp' {...{ control, errors }} />
        <Button disabled={loginAPI.isPending} type='submit'>Send</Button>

        <FormBtnBack linkText='Back to Login' linkTo={'/login'} />
      </FormContent>
    </>
  )
}
