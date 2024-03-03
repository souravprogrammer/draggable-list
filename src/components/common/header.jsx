import React from "react";
import { Button } from "../ui/button";
import { FaBell } from "react-icons/fa6";
import { IoMdMore, IoMdHome } from "react-icons/io";
import AddColumnDialog from "./AddColumn";

function Header() {

  return (
    <header className="h-[75px] flex justify-between items-center p-6 bg-primary-foreground">
      <div className="flex items-center gap-2">
        <Button variant="ghost">
          <IoMdMore className="h-[18px] w-[18px]" />
        </Button>
        <Button variant="ghost">
          <IoMdHome className="h-[18px] w-[18px]" />
        </Button>
        <h4 className="font-bold">Todo Board</h4>
      </div>
      <div className="flex gap-4">
        <Button variant="ghost" className="rounded-[50%] aspect-square">
          <FaBell className="scale-150" />
        </Button>

        <AddColumnDialog />
      </div>
    </header>
  );
}

export default Header;
