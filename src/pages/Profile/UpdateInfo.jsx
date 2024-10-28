import usersApi from "@/api/users.api";
import InputText from "@/components/Form/InputText";
import ImageLoader from "@/components/ImageLoader";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import userSchema from "@/schemas/userSchema";
import useAuth from "@/store/useAuth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Camera } from "lucide-react";
import nprogress from "@/configs/nprogress";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";
import { pick } from "lodash";
import { useState } from "react";

export default function UpdateInfo() {
  const { user, setUser } = useAuth();
  const [isPendingAvatar, setIsPendingAvatar] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(z.object(pick(userSchema, ['fullname']))),
    defaultValues: { fullname: user.fullname }
  });

  const updateInfoAPI = useMutation({
    mutationFn: usersApi.update,
    onMutate: () => nprogress.start(),
    onSuccess: (data) => {
      toast.success('Update info successfully');
      setUser(data);
      setIsPendingAvatar(false);
    },
    onError: (err) => {
      toast.error(err.response.data.message);
    }
  });

  async function handleChangeAvatar(e) {
    const file = e.target.files[0];
    const maxSize = 1024 * 1024 * 5;

    if (file.size > maxSize) {
      return toast.error(`File size must be less than ${maxSize / 1024 / 1024}MB`);
    }

    const formData = new FormData();
    formData.append('avatar', file);

    updateInfoAPI.mutate(formData);
    setIsPendingAvatar(true);
    e.target.value = null;
  }

  async function onSubmit(data) {
    updateInfoAPI.mutate(data)
  }

  return (
    <Card>
      <CardHeader className="flex flex-row gap-4 items-center">
        <Avatar className="relative group size-20">
          {
            isPendingAvatar ? <Skeleton className="absolute top-0 left-0 w-full h-full" /> :
              <ImageLoader src={user && user.avatar} width={80} height={80} />
          }
          <label className={`absolute top-0 left-0 w-full h-full bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity ${updateInfoAPI.isPending ? 'pointer-events-none hidden' : 'pointer-events-auto cursor-pointer'
            }`}>
            <input type="file" accept="image/*" multiple={false} className="absolute top-0 left-0 w-full h-full cursor-pointer hidden" onChange={handleChangeAvatar} />
            <Camera className="size-6 text-white" />
          </label>
        </Avatar>
        <div>
          <p className="text-lg font-semibold">{user.fullname}</p>
          <p className="text-sm text-muted-foreground">{user.email}</p>
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        <form className='grid gap-6' onSubmit={handleSubmit(onSubmit)}>
          <InputText name="email" type="email" label="Email" inputProps={{ value: user.email, disabled: true }} />
          <InputText name="fullname" type="text" label="Fullname" {...{ register, errors }} />

          <Button disabled={updateInfoAPI.isPending} type='submit'>Update</Button>
        </form>
      </CardContent>
    </Card>
  )
}