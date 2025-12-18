import mongoose from "mongoose";


const connectDB = async (url) => {
  try {
    const connect = await mongoose.connect(url);
    console.log(
      `Connected successfully | HOST : ${connect.connection.host} || DB :${connect.connection.name}`
    );
  } catch (error) {
    console.log(error);
  }
};

export default connectDB;
