import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Link } from 'react-router-dom'

export default function InputText({ name, type, label, linkText, linkTo, register, errors, inputProps }) {
  return (
    <div className='grid gap-2'>

      <div className='flex justify-between items-center text-sm leading-5'>
        <Label className="text-sm leading-5" htmlFor={name}>{label}</Label>
        {linkTo && <Link to={linkTo} className='underline text-muted-foreground'>{linkText}</Link>}
      </div>

      {register 
        ? <Input className='h-10 transition-none' id={name} type={type} {...register(name)} /> 
        : <Input className='h-10 transition-none' id={name} type={type} {...inputProps} />}
      {errors
        ? errors[name] && <p className='text-red-600 text-sm'>{errors[name].message}</p>
        : null}
    </div>
  )
}