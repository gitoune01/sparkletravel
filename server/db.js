import mongoose  from "mongoose";

const connectToDb = async() => {

  try {

    const connect = await mongoose.connect(process.env.MONGODB_URI)
    if(connect) console.log(`connected to database: ${connect.connection.host}`)
  } catch (error) {
     console.log(`Error: ${error.message}`);
  }

}

export default connectToDb