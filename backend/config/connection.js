import mongoose from  "mongoose"

 const connectDB = async()=>{
    try{
        const conn =  await mongoose.connect(process.env.MONGOURI)
        console.log(`mongo db connected : ${conn.connection.host}`) 
    }catch(err){
        console.error(err.message)
    }
}

 export default connectDB 