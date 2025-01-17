import Staff from "../models/staff.model.js"


export const staffAllDetails = async(req , res) => {
    try {
        const staff = await Staff.findOne({_id : req.staff._id}).select("-password");
        if(staff.role == "Admin") {
            const allStaff = await Staff.find({ _id : { $ne : staff._id } }).select("-_id -password");
            res.status(200).json({allStaff})
        }
       else {
            res.status(400).json({error : "..........Your are premmited to acess the table.........."});
       }
    } catch (error) {
        console.log(error , "from staff route all details")
        res.status(500).json({error : "Internal Server Error"})
    }
}

export const removeStaff = async( req , res ) =>{
    try {
        const { email } = req.body;
        const emailregx = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if(!emailregx.test(email)){
            return res.status(400).json({error : "Invalid email Format"})
        }

        const result = await Staff.deleteOne({ email: email });

        if (result.deletedCount === 0) {
            return res.status(404).json({ error: "Staff member not found" });
        }

        res.status(200).json({ message: "Staff member deleted successfully" });

    } catch (error) {
        console.log(error , "from staff route all details")
        res.status(500).json({error : "Internal Server Error"})
    }
}
