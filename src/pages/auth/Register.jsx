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
import authApi from '@/api/auth.api'
import { useNavigate } from 'react-router-dom'
import nprogress from 'nprogress'
import { pick } from 'lodash'
import { z } from 'zod'

const FormSchema = z.object({
  ...pick(userSchema, ['fullname', 'email', 'password']),
  repeatPassword: z.string().trim(),
}).refine(
  (data) => data.password === data.repeatPassword,
  { message: 'Passwords do not match', path: ['repeatPassword'] }
)

export function Register() {
  const navigate = useNavigate()

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: { fullname: '', email: '', password: '', repeatPassword: '' },
  })

  const registerAPI = useMutation({
    mutationFn: authApi.register,
    onMutate: () => nprogress.start(),
    onSuccess: (data) => {
      navigate('/send-verify-email', { state: { email: data.email } })
      toast.success('Registered successfully')
    },
    onError: (error) => {
      toast.error(error.message)
    }
  })

  const onSubmit = (data) => {
    registerAPI.mutate(data)
  }

  return (
    <>
      <FormHeader title='Register' desc='Create your account by filling out the form below.' />

      <FormContent onSubmit={handleSubmit(onSubmit)} >
        <InputText name='fullname' label='Fullname' type='text' {...{ register, errors }} />
        <InputText name='email' label='Email' type='email' {...{ register, errors }} />
        <InputText name='password' label='Password' type='password' {...{ register, errors }} />
        <InputText name='repeatPassword' label='Repeat Password' type='password' {...{ register, errors }} />

        <Button disabled={registerAPI.isPending} >Register</Button>

        <FormPrompt message='Already have an account?' linkText='Login' linkTo={'/login'} />
      </FormContent>
    </>
  )
}
