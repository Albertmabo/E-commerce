import dotenv from "dotenv";
if (process.env.NODE_ENV === "production") {
  dotenv.config({ path: ".env.production" });
} else {
  dotenv.config({ path: ".env.development" });
}

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
