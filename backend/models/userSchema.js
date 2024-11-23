import mongoose from "mongoose";
import bcrypt from 'bcryptjs'


var Schema = mongoose.Schema
var userSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true,
    },
    isActive:{
        type:Boolean,
        default:true
    }
       
})

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
      next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  });

userSchema.methods.matchPassword = async function (enteredPassword){
 return await bcrypt.compare(enteredPassword,this.password)

}



const User = mongoose.model("User",userSchema)
export default User