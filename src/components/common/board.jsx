"use client";
import React, { useEffect, useState } from "react";
import { DragDropContext } from "@hello-pangea/dnd";
import Column from "./Column";

import {
  useGetTodosQuery,
  useUpdateTodosMutation,
  useGetColumnQuery,
} from "@/redux/slices/todo.slice";

const Board = () => {
  const { data: todos, isSuccess } = useGetTodosQuery();
  const { data: columnList, isSuccess: isSuccessColumn } = useGetColumnQuery();
  const [updateTodos, result] = useUpdateTodosMutation();
  const [columns, setColumns] = useState(null);

  useEffect(() => {
    setColumns(todos);
  }, [todos]);
  useEffect(() => {
    console.log("col=> ", columnList);
  }, [columnList]);

  const onDragEnd = (result, columns, setColumns) => {
    if (!result.destination) return;

    const { source, destination } = result;

    // forDiffrent columns
    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceItems = [...sourceColumn];
      const destItems = [...destColumn];
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, {
        ...removed,
        column: { name: destination.droppableId },
      });
      // console.log("removed ", removed);

      setColumns({
        ...columns,
        [source.droppableId]: sourceItems,

        [destination.droppableId]: destItems,
      });
      updateTodos({
        payload: {
          [source.droppableId]: sourceItems.map((si, order) => {
            const { _id, ...rest } = si;

            return {
              ...rest,
              column: si?.column?.name,

              order,
            };
          }),
          [destination.droppableId]: destItems.map((si, order) => {
            const { _id, ...rest } = si;

            return {
              ...rest,
              column: si?.column?.name,

              order,
            };
          }),
        },
      });
    } else {
      const column = columns[source.droppableId];
      const copiedItems = [...column];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: copiedItems,
      });

      updateTodos({
        payload: {
          [source.droppableId]: copiedItems?.map((si, order) => {
            const { _id, ...rest } = si;
            return {
              ...rest,
              column: si?.column?.name,
              order,
            };
          }),
        },
      });
    }
  };

  return (
    <DragDropContext
      onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
    >
      <div className="min-h-[calc(100dvh-75px)] max-w-[calc(100dvw)] overflow-hidden  ">
        <div className="flex gap-4 min-w-[100%] max-h-[calc(100dvh-75px)] min-h-[calc(100dvh-75px)] overflow-scroll p-4">
          {isSuccessColumn &&
            !!columns &&
            columnList?.map((col, index) => {
              columns;
              return (
                <Column
                  id={col.name}
                  key={index}
                  data={columns?.[col?.name]}
                  title={col.name}
                />
              );
            })}
          {columnList?.length === 0 ? (
            <div className="flex items-center justify-center w-[100%]">
              <p className="">No Columns here</p>
            </div>
          ) : null}
        </div>
      </div>
    </DragDropContext>
  );
};

export default Board;
