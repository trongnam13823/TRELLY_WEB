import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { toast } from 'react-toastify'
import InputText from '@/components/Form/InputText'
import userSchema from '@/schemas/userSchema'
import FormHeader from './components/FormHeader'
import FormContent from './components/FormContent'
import FormPrompt from './components/FormPrompt'
import { useMutation } from '@tanstack/react-query'
import { useLocation, useNavigate } from 'react-router-dom'
import nprogress from 'nprogress'
import useAuth from '@/store/useAuth'
import authApi from '@/api/auth.api'
import { pick } from 'lodash'
import { z } from 'zod'


export function Login() {
  const location = useLocation()
  const navigate = useNavigate()
  const { setAccessToken } = useAuth()

  const { register, handleSubmit, formState: { errors }, getValues } = useForm({
    resolver: zodResolver(z.object(pick(userSchema, ['email', 'password']))),
    defaultValues: { email: location.state?.email || '', password: '' },
  })

  const loginAPI = useMutation({
    mutationFn: authApi.login,
    onMutate: () => nprogress.start(),
    onSuccess: (data) => {
      setAccessToken(data.accessToken)
      navigate('/')
    },
    onError: (error) => {
      if (error?.is2FAEnabled) {
        navigate('/verify-2fa', {
          state: { email: getValues('email'), password: getValues('password') }
        })
      }
      else toast.error(error.message)
    }
  })

  const onSubmit = (data) => {
    loginAPI.mutate(data)
  }

  return (
    <>
      <FormHeader title='Login' desc='Enter your email to access your account.' />

      <FormContent onSubmit={handleSubmit(onSubmit)}>
        <InputText name='email' label='Email' type='text'
          linkText='Verify Email' linkTo={'/send-verify-email'}
          {...{ register, errors }}
        />

        <InputText name='password' label='Password' type='password'
          linkText='Forgot Password?' linkTo={'/send-reset-password'}
          {...{ register, errors }}
        />

        <Button type='submit' disabled={loginAPI.isPending}>Login</Button>

        <FormPrompt message='Don&lsquo;t have an account?' linkText='Register' linkTo={'/register'} />
      </FormContent>
    </>
  )
}
