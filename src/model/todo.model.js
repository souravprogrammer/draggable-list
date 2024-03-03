import mongoose from "mongoose";

const ToDoSchema = new mongoose.Schema(
  {
    task: { type: String },
    // column: { type: String },
    column: { type: String, ref: "column" },

    order: { type: Number },
    color: { type: String, default: "#fff" },

    id: { type: String },
  },
  { timestamps: true }
);
export const Todo = mongoose.models.todo || mongoose.model("todo", ToDoSchema);
