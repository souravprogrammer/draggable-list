import mongoose from "mongoose";

const ColumnSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);
export const ColumnModel =
  mongoose.models.column || mongoose.model("column", ColumnSchema);
