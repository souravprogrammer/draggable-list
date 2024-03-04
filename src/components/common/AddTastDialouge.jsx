"use client";
import React, { useEffect, useState } from "react";
import { MyDialog } from "@/components/common/MyDialouge";
import { DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useCreateTodoMutation } from "@/redux/slices/todo.slice";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader } from "@/components/ui/loader";
function AddDialouge({ columnId, setColumn }) {
  const [open, setOpen] = useState(false);
  const [addTask, result] = useCreateTodoMutation();

  const onSubmitAddTask = async (s) => {
    s.preventDefault();
    const formData = new FormData(s.target);
    const obj = Object.fromEntries(formData.entries());
    await addTask({ payload: { ...obj, order: 1000000 } });
    // its seems optimistic update
    // setColumn((c) => {
    //   return {
    //     ...c,
    //     [columnId]: [
    //       ...c[columnId],
    //       { ...obj, order: 1000000, createdAt: new Date() },
    //     ],
    //   };
    // });
    setOpen(false);
  };

  return (
    <MyDialog open={open} setOpen={setOpen} title={"Add Task"}>
      <form className="flex flex-col gap-4 w-[100%]" onSubmit={onSubmitAddTask}>
        <div className="flex flex-col gap-2">
          <Input name="column" defaultValue={columnId} className="hidden" />

          <div className="flex flex-col gap-2">
            <label className="font-semibold capitalize">Color</label>

            <Select
              size="large"
              className="min-w-[100%] bg-red-600"
              name="color"
              defaultValue="#36B37E"
            >
              <SelectTrigger className="w-[100%]">
                <SelectValue placeholder="Select Color" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem defaultValue selected value="#36B37E">
                  <div className="flex items-center gap-2">
                    <div className=" bg-[#36B37E] w-[10px] h-[10px]"></div>
                    <span>Fine pine</span>
                  </div>
                </SelectItem>
                <SelectItem value="#FFAB00">
                  <div className="flex items-center gap-2">
                    <div className="bg-[#FFAB00] w-[10px] h-[10px]"></div>
                    <span>Golden state</span>
                  </div>
                </SelectItem>
                <SelectItem value="#FF5630">
                  <div className="flex items-center gap-2">
                    <div className="bg-[#FF5630] w-[10px] h-[10px]"></div>
                    <span>Poppy surprise</span>
                  </div>
                </SelectItem>
                <SelectItem value="#6554C0">
                  <div className="flex items-center gap-2">
                    <div className="bg-[#6554C0] w-[10px] h-[10px]"></div>
                    <span>{`Da' juice`}</span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <label className="font-semibold capitalize">Task</label>
          <Input name="task" placeholder="write task here..." required />
        </div>
        <div className="flex flex-row justify-end gap-4">
          <DialogClose asChild>
            <Button variant="outline" type="submit">
              Cancel
            </Button>
          </DialogClose>

          <Button type="submit" disabled={result.isLoading}>
            <div className="flex items-center gap-1">
              {result.isLoading ? <Loader /> : null}
              {result.isLoading ? "Adding..." : "Add Task"}
            </div>
          </Button>
        </div>
      </form>
    </MyDialog>
  );
}

export default AddDialouge;
