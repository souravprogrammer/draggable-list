"use client";
import React from "react";
import { Draggable } from "@hello-pangea/dnd";
import { useDeleteTodoMutation } from "@/redux/slices/todo.slice";
import { AlertDelete } from "./DeleteAlert";

function formatDate(date) {
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "short",
  }).format(date);
  return formattedDate;
}
const TaskCard = ({ item, index }) => {
  return (
    <Draggable key={item._id} draggableId={item._id} index={index}>
      {(provided) => (
        <div
          className="px-4 py-4 bg-primary-foreground/50 min-h-[70px] flex flex-col justify-between rounded-sm relative overflow-hidden"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div
            className={`flex items-center h-[100%] w-[2px] top-0 left-0 absolute`}
          >
            <div
              className={` h-[70%] w-[2px] bg-[${
                item.color ?? "#fff"
              }] rounded-sm`}
            ></div>
          </div>
          <div className="flex max-w-[100%]">
            <div className="flex-1 line-clamp-3">
              <h4 className="flex-1 py-1 text-lg font-bold">{item?.task}</h4>
            </div>
            <AlertDelete id={item.id} />
          </div>
          <div>
            <span className="text-sm text-gray-400">
              {formatDate(new Date(item?.createdAt))}
            </span>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default TaskCard;
