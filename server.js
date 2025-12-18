import dotenv from "dotenv";
dotenv.config({ path: ".env.developement" });

import app from "./app.js";
import connectDB from "./src/db/connect.js";

const PORT = process.env.PORT;

const start = async () => {
  try {
    await connectDB(process.env.URL);
    app.listen(PORT, () => {
      console.log(`Server is running in PORT ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
