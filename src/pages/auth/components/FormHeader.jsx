import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function FormHeader({ title, desc }) {
  return (
    <CardHeader>
      <CardTitle className='text-2xl'>{title}</CardTitle>
      <CardDescription>{desc}</CardDescription>
    </CardHeader>
  )
}