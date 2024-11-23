import mongoose from "mongoose";

var Schema = mongoose.Schema;
var projectSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    list_of_todos: [{ type: Schema.Types.ObjectId, ref: "Todo" }],
  },
  {
    timestamps: true,
  }
);

const Project = mongoose.model("Project", projectSchema);
export default Project;
