import authApi from "@/api/auth.api"
import Spinner from "@/components/Spinner"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { useMutation } from "@tanstack/react-query"
import { useEffect, useState } from "react"
import { Navigate, useNavigate, useSearchParams } from "react-router-dom"

export default function VerifyEmail() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const email = searchParams.get('email');
  const token = searchParams.get('token');

  const [isOpenDialog, setIsOpenDialog] = useState(false)

  const verifyEmailAPI = useMutation({
    mutationFn: authApi.verifyEmail,
    onSettled: () => {
      setIsOpenDialog(true)
    },
  })

  useEffect(() => {
    verifyEmailAPI.mutate({ email, token })
  }, [])

  if (!email || !token) return <Navigate to='/login' />
  return (
    <div className="flex items-center justify-center rounded-xl">

      <div className="flex items-center">

        <h1 className="text-2xl font-medium text-nowrap flex items-center gap-2 p-4"> <Spinner size={32} strokeWidth={2} /> Your email is being verified...</h1>
      </div>

      <AlertDialog open={isOpenDialog} onOpenChange={setIsOpenDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {verifyEmailAPI.isSuccess && "Email Verified Successfully"}
              {verifyEmailAPI.isError && "Email Verification Failed"}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {verifyEmailAPI.isSuccess && "Your email has been successfully verified. You can now access your account."}
              {verifyEmailAPI.isError && `There was an issue verifying your email (${verifyEmailAPI.error?.message}).`}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            {verifyEmailAPI.isSuccess &&
              <AlertDialogAction onClick={() => { navigate('/login', { state: { email } }) }}>
                Login
              </AlertDialogAction>
            }

            {verifyEmailAPI.isError &&
              <AlertDialogAction onClick={() => { navigate('/send-verify-email', { state: { email } }) }}>
                Resend Email
              </AlertDialogAction>
            }
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

