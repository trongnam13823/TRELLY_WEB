import { CardContent } from "@/components/ui/card";

export default function FormContent({ children, onSubmit }) {
  return (
    <CardContent>
      <form onSubmit={onSubmit} className='grid gap-6'>
        {children}
      </form>
    </CardContent>
  )
}