import Staff from "../models/staff.model.js";


export const login = async( req , res)=>{
    try {
        const {staffId , password } = req.body;
        const staff = await Staff.findOne({staffId});
        if(!staff){
            console.log("invaild user name")
            return res.status(400).json({error : "Invalid Username or Password"});
        }
        const isPasswordCorrect = (password === staff.password) ? true : false;
        if(!staff || !isPasswordCorrect){
            console.log("invalid password")
            return res.status(400).json({error : "Invalid Username or Password"});
        }
        res.status(200).json({staff});
    }
    catch(error){
        console.log("Error in the login controller :",error);
        res.status(500).json({error : "Inter server error"});
    }
};