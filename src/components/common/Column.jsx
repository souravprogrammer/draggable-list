import React from "react";
import { Droppable, Draggable } from "@hello-pangea/dnd";
import TaskCard from "./TaskCard";
import { Button } from "@/components/ui/button";
import AddDialouge from "./AddTastDialouge";
import { IoMdMore } from "react-icons/io";

function Column({ title, data, id, setColumn }) {
  return (
    <div
      className="flex flex-col gap-1  min-w-[300px] md:min-w-[400px] h-[100%] "
      // style={{ border: "1px solid red" }}
    >
      <div className="flex items-center justify-between p-4 bg-primary-foreground">
        <h2 className="font-bold text-[#8487f8] ">{title}</h2>
        <Button variant="ghost">
          <IoMdMore className="text-[#8487f8] w-[16px] h-[16px]" />
        </Button>
      </div>
      <div className="p-4 ">
        <div>
          <Droppable key={id} droppableId={id}>
            {(provided, snapshot) => (
              <>
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="flex flex-col gap-4 py-4  min-h-[150px]"
                  // style={{ border: "1px solid red" }}
                >
                  {data?.map?.((item, index) => {
                    return (
                      <TaskCard key={item._id} item={item} index={index} />
                    );
                  })}
                  {provided.placeholder}
                </div>
              </>
            )}
          </Droppable>
        </div>
      </div>
      <div className="flex items-center justify-center p-4">
        <AddDialouge columnId={id} setColumn={setColumn} />
      </div>
    </div>
  );
}

export default Column;
