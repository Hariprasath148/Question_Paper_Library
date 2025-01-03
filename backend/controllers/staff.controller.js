import Staff from "../models/staff.model.js"

export const store = async( req , res)=>{
    try {
        const {staffname , staffId } = req.body;
        const newstaff = new Staff({
            staffname,
            staffId
        });
        if(newstaff){
            await newstaff.save();
            res.status(200).json({
                _id : newstaff._id,
                staffname : newstaff.staffname,
                staffId : newstaff.staffId,
                password : newstaff.password,
            });
        }
    }
    catch(error){
        console.log("Error in the staff store controller :",error);
        res.status(500).json({error : "Inter server error"});
    }
};