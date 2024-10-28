import { Card } from '@/components/ui/card'
import { Outlet } from 'react-router-dom'

export default function AuthForm() {
  return (
    <div className='relative w-screen min-h-screen flex items-center justify-center bg-muted/40'>
      <Card className='w-fit sm:min-w-96 mx-4 shadow-xl'>
        <Outlet />
      </Card>
    </div>
  )
}