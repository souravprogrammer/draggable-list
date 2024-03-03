"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { MdDelete } from "react-icons/md";
import { useState } from "react";

import { useDeleteTodoMutation } from "@/redux/slices/todo.slice";
import { useToast } from "@/components/ui/use-toast";

export function AlertDelete({ id }) {
  const [open, setOpen] = useState(false);
  const [deleteTask] = useDeleteTodoMutation();
  const { toast } = useToast();

  const deleteTaskHandler = async () => {
    try {
      const res = await deleteTask({ payload: { id: id } });
      if (!res.error) {
        toast({
          title: "Task deleted",
          description: "",
        });
      }
    } catch (err) {
      toast({
        variant: "destructive",
        title: "error",
        description: err.message,
      });
    } finally {
      setOpen(false);
    }
  };
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="outline">
          <MdDelete className="h-[16px] w-[16px] text-destructive " />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            record and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={deleteTaskHandler}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
