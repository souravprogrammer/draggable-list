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
import { useEffect, useState } from "react";

import { useDeleteTodoMutation } from "@/redux/slices/todo.slice";
import { useToast } from "@/components/ui/use-toast";
import { Loader } from "@/components/ui/loader";

export function AlertDelete({ id }) {
  const [open, setOpen] = useState(false);
  const [deleteTask, result] = useDeleteTodoMutation();
  const { toast } = useToast();

  useEffect(() => {
    console.log("delete ", result);
  }, [result]);
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
          <AlertDialogAction
            onClick={deleteTaskHandler}
            disabled={result.isLoading}
          >
            <div className="flex items-center gap-1">
              {result.isLoading ? <Loader /> : null}
              {result.isLoading ? "deleting..." : "Continue"}
            </div>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
