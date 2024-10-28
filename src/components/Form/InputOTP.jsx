import { InputOTPGroup, InputOTPSlot, InputOTP as Input } from "@/components/ui/input-otp";
import { Controller } from "react-hook-form";

export default function InputOTP({ name, errors, control }) {
  return (
    <>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <InputOTPGroup className='mx-auto text-center flex flex-col gap-2'>
            <Input {...field} id={name} maxLength={6}>
              {Array.from({ length: 6 }).map((_, i) => (
                <InputOTPSlot className='size-10 border rounded' index={i} key={i} />
              ))}
            </Input>
            {errors[name] && <p className='text-red-600 text-sm'>{errors[name]?.message}</p>}
          </InputOTPGroup>
        )}
      />
    </>
  )
}
