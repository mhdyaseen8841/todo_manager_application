import mongoose from "mongoose";

var Schema = mongoose.Schema
var TodoSchema = new Schema ({
    description:{
        type:String,
        required:true
    },
    status:{
        type:String,
        enum:['pending','completed'],
        default:'pending'
    }
},
{
    timestamps:true
})

const Todo = mongoose.model("Todo",TodoSchema)
export default Todo