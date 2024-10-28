import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import InputText from "@/components/Form/InputText";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import boardSchema from "@/schemas/boardSchema";
import { useState } from "react";
import { z } from "zod";
import { pick } from "lodash";
import SelectBackground from "./SelectBackground";
import { useMutation } from "@tanstack/react-query";
import boardsApi from "@/api/boards.api";
import nprogress from "@/configs/nprogress";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function BtnNewBoard({ className, title = <><Plus size={20} /> New Board</> }) {
  const navigate = useNavigate()
  const [isOpenDialog, setIsOpenDialog] = useState(false);

  const { register, handleSubmit, formState: { errors }, watch, setValue, reset } = useForm({
    resolver: zodResolver(z.object(pick(boardSchema, ['title', 'background']))),
    defaultValues: { background: "", title: "" },
  });

  const backgroundSelected = watch("background")

  const createBoardAPI = useMutation({
    mutationFn: boardsApi.create,
    onMutate: () => nprogress.start(),
    onSuccess: (data) => {
      setIsOpenDialog(false)
      navigate(`/boards/${data._id}`)
      toast.success("Board created successfully")
      setTimeout(() => { createBoardAPI.reset() }, 200)
    },
    onError: () => toast.error("Failed to create board"),
  })

  const onSubmit = (data) => createBoardAPI.mutate(data)

  return (
    <Dialog open={isOpenDialog} onOpenChange={setIsOpenDialog}>
      <DialogTrigger asChild>
        <Button className={`shrink-0 gap-2 ${className}`}>
          {title}
        </Button>
      </DialogTrigger>

      <DialogContent className="!flex flex-col">
        <DialogHeader>
          <DialogTitle>Start a New Board</DialogTitle>
          <DialogDescription>  Kick off a new board to organize and streamline your tasks efficiently.</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
          <SelectBackground {...{ backgroundSelected, setValue, reset }} />

          {/* Board Name */}
          <InputText label="Board Name" name='title' {...{ register, errors }} error={errors.title?.message} />

          {/* Create Board */}
          <Button disabled={createBoardAPI.isPending || createBoardAPI.isSuccess} type="submit">Create Board</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}