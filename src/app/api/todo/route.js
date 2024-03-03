import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongoClient";
import mongoose from "mongoose";
import { Todo } from "@/model/todo.model";
import { ColumnModel } from "@/model/column.model";
import { v4 as uuidv4 } from "uuid";

export async function GET(request) {
  try {
    await dbConnect();

    const col = await ColumnModel.find({});
    const data = await Todo.aggregate([
      {
        $lookup: {
          from: "columns",
          localField: "column",
          foreignField: "name",
          as: "column",
        },
      },
      {
        $unwind: "$column",
      },
      {
        $group: {
          _id: "$column.name",
          documents: { $push: "$$ROOT" },
        },
      },
    ]);
    const groupedData = data.reduce((acc, obj) => {
      const { _id, name } = obj;
      if (!acc[_id]) {
        acc[_id] = [];
      }
      acc[_id].push(...obj.documents);
      acc[_id] = obj.documents?.sort((a, b) => a?.order - b?.order);

      return acc;
    }, {});

    col?.forEach((column) => {
      let columnName = column.name;
      if (!(columnName in groupedData)) {
        groupedData[columnName] = [];
      }
    });

    return NextResponse.json({ data: groupedData });
  } catch (err) {
    return NextResponse.json({ err: err.message });
  }
}
export async function POST(request) {
  try {
    await dbConnect();
    const body = await request.json();

    if (!body.column || !body.task)
      return NextResponse.json({
        message: "column nad task are required",
      });

    const todo = new Todo({ ...body, id: uuidv4() });
    await todo.save();
    return NextResponse.json({ data: todo });
  } catch (err) {
    return NextResponse.json({ err: err.message });
  }
}
export async function PUT(request) {
  try {
    await dbConnect();
    const tasksToUpdate = await request.json();

    const list = Object.entries(tasksToUpdate)
      .map(([key, arr]) => {
        return arr;
      })
      .flat(2);

    const bulk = list.map((m) => ({
      updateOne: {
        filter: { id: m.id },
        update: {
          $set: { ...m },
        },
      },
    }));
    const res = await Todo.bulkWrite(bulk);

    return NextResponse.json({
      bulk,
      // data: bulk,
      res,
    });
  } catch (err) {
    return NextResponse.json({ err: err.message });
  }
}
export async function DELETE(request) {
  try {
    await dbConnect();
    const deleteTask = await request.json();
    if (!deleteTask.id) throw Error("id is not present");
    const res = await Todo.deleteOne({ id: deleteTask.id });
    return NextResponse.json({
      res,
    });
  } catch (err) {
    return NextResponse.json({ err: err.message });
  }
}
