"use client";
import React, { useEffect, useState } from "react";
import { MyDialog } from "@/components/common/MyDialouge";
import { DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useCreateColumnMutation } from "@/redux/slices/todo.slice";

function AddColumnDialog() {
  const [open, setOpen] = useState(false);
  const [addColumn] = useCreateColumnMutation();

  const onSubmitColumn = async (s) => {
    s.preventDefault();
    const formData = new FormData(s.target);
    const obj = Object.fromEntries(formData.entries());
    addColumn({ payload: { ...obj } });
    setOpen(false);
  };

  return (
    <MyDialog
      open={open}
      setOpen={setOpen}
      title={"Add Column"}
      variant="default"
    >
      <form className="flex flex-col gap-4 w-[100%]" onSubmit={onSubmitColumn}>
        <div className="flex flex-col gap-2">
          <label className="font-semibold capitalize">Column Name</label>
          <Input name="name" placeholder="write a name here..." />
        </div>
        <div className="flex flex-row justify-end gap-4">
          <DialogClose asChild>
            <Button variant="outline" type="submit">
              Cancel
            </Button>
          </DialogClose>

          <Button type="submit">Add Column</Button>
        </div>
      </form>
    </MyDialog>
  );
}

export default AddColumnDialog;
