import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongoClient";
import mongoose from "mongoose";
import { Todo } from "@/model/todo.model";
import { ColumnModel } from "@/model/column.model";
import { v4 as uuidv4 } from "uuid";

export async function GET(request) {
  try {
    await dbConnect();

    const columns = await ColumnModel.find({}).sort({ createdAt: 1 });

    return NextResponse.json({ data: columns });
  } catch (err) {
    return NextResponse.json({ err: err.message });
  }
}
export async function POST(request) {
  try {
    await dbConnect();

    const newColum = await request.json();
    if (!newColum.name) throw Error("Column name is required");

    const colum = new ColumnModel(newColum);
    await colum.save();

    return NextResponse.json({ data: colum });
  } catch (err) {
    return NextResponse.json({ err: err.message });
  }
}
