import mongoose from "mongoose";

const connectDB = (url) => {
  try {
    const connect = mongoose.connect(url);
    console.log(
      `Connected successfully | HOST : ${connect.connection.host}} || DB :${connect.connection.name}`
    );
  } catch (error) {
    console.log(error);
  }
};


export default connectDB;