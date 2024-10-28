import InputText from "@/components/Form/InputText";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import userSchema from "@/schemas/userSchema";
import useAuth from "@/store/useAuth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import nprogress from "@/configs/nprogress";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";
import authApi from "@/api/auth.api";

const FormSchema = z.object({
	password: userSchema.password,
	newPassword: userSchema.password,
	repeatPassword: userSchema.password,
}).refine(
	(data) => data.newPassword === data.repeatPassword,
	{ message: 'Passwords do not match', path: ['repeatPassword'] }
)

export default function ChangePassword() {
	const { logout } = useAuth()

	const { register, handleSubmit, formState: { errors } } = useForm({
		resolver: zodResolver(FormSchema),
		defaultValues: { password: '', newPassword: '', repeatPassword: '' },
	})


	const changePasswordAPI = useMutation({
		mutationFn: authApi.changePassword,
		onMutate: () => {
			nprogress.start()
		},
		onSuccess: () => {
			toast.success('Change password successfully')
			logout()
		},
		onError: (error) => {
			toast.error(error.message)
		},
	})

	const onSubmit = (data) => {
		changePasswordAPI.mutate({
			password: data.password,
			newPassword: data.newPassword,
		})
	}

	return (
		<Card>
			<CardHeader>
				<CardTitle className="text-xl">Change Password</CardTitle>
				<CardDescription>
					After changing your password, you will be logged out.
				</CardDescription>
			</CardHeader>
			<CardContent>
				<form onSubmit={handleSubmit(onSubmit)} className='grid gap-6'>
					<InputText name="password" type="password" label="Current Password" {...{ register, errors }} />
					<InputText name="newPassword" type="password" label="New Password" {...{ register, errors }} />
					<InputText name="repeatPassword" type="password" label="Repeat New Password" {...{ register, errors }} />
					<Button type='submit' disabled={changePasswordAPI.isLoading}>Change Password</Button>
				</form>
			</CardContent>
		</Card>
	)
}