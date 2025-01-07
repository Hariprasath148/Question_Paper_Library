import express from "express"
import dotenv from "dotenv"
import authRoute from "./routes/auth.route.js"
import staffroute from "./routes/staff.route.js"
import connectDB from "./database/connectDB.js"
import cors from "cors"

dotenv.config();

const PORT = process.env.PORT;
const app = express();
app.use(express.json());
app.use(cors({
    origin : "http://localhost:5173",
    credentials : true
}));
app.use(express.urlencoded({
    extended : true
}))
app.use("/api/auth",authRoute);
app.use("/api/staff",staffroute); 


app.listen(PORT , ()=>{
    console.log("Server is running in the port :",PORT);
    connectDB();
});