import express from "express"
import dotenv from "dotenv"
import authRoute from "./routes/auth.route.js"
import staffroute from "./routes/staff.route.js"
import connectDB from "./database/connectDB.js"

dotenv.config();

const PORT = process.env.PORT;
const app = express();
app.use(express.json());
app.use("/api/auth",authRoute);
app.use("/api/staff",staffroute);

app.listen(PORT , ()=>{
    console.log("Server is running in the port :",PORT);
    connectDB();
});