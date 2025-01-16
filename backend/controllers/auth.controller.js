import Staff from "../models/staff.model.js";
import { sendEmail } from "../Email/emailsend.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generatetoken.js";

export const add_user = async (req, res) => {
    try {
        const { staffname, staffId , email , password , department ,role  } = req.body;
        const emailregx = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if(!emailregx.test(email)){
            return res.status(400).json({error : "Invalid email Format"})
        }
        const existingstaff = await Staff.findOne({email});
        if(existingstaff){
            console.log("Staff already exits.")
            return res.status(400).json({error : "Staff is Already registered"})
        } 
        const staffIdCheck = await Staff.findOne({staffId});
        if(staffIdCheck){
            console.log("StaffId already exits.")
            return res.status(400).json({error : "Staff is Already exists"});
        }
        
        if(password.lenght < 6){
            return res.status(400).json({error : "Password must have atleast 6 char lenght"});
        }

        const salt = await bcrypt.genSalt(10);
        const hashedpassword = await bcrypt.hash(password , salt)

        const newstaff = new Staff({
            staffname,
            staffId,
            email,
            password : hashedpassword,
            department,
            role
        });

        if(newstaff){
            await newstaff.save();
            await sendEmail(staffname, email , password , staffId ,  department , role );
            res.status(201).json({newstaff});
        }
        else {
            res.status(400).json({ error: 'Invalid user.' });
        }
    } catch (error) {
        console.log("Error in the add_user controller :",error);
        res.status(500).json({error : "Inter server Error"});
    }
};

export const login = async( req , res)=>{
    try {
        const {email , password } = req.body;
        const staff = await Staff.findOne({email});
        const isPasswordCorrect = await bcrypt.compare(password , staff?.password || "");
        if(!staff || !isPasswordCorrect){
            return res.status(400).json({error : "Invalid Username or Password"});
        }
        generateToken(staff._id , res);
        res.status(200).json({staff});
    }
    catch(error){
        console.log("Error in the login controller :",error);
        res.status(500).json({error : "Inter server Error"});
    }
};

export const logout = async(req , res) => {
    try {
        res.cookie("jwt" , "" , { maxAge : 0 });
        res.status(200).json({message : "Logout successfully"});
    }
    catch (error) {
        console.log("Error in logout controller.");
        res.status(500).json({error : "Internal Server Error"})
    }
}

export const getStaff = async(req , res) => {
    try {
        const staff = await Staff.findOne({_id : req.staff._id}).select("-password");
        res.status(200).json({
            "staffname" : staff.staffname,
            "staffId" : staff.staffId,
            "email" : staff.email,
            "department" : staff.department,
            "role" : staff.role
        });
    } catch (error) {
        console.log("Error in getStaff controller.");
        res.status(500).json({error : "Internal Server Error"})
    }
}