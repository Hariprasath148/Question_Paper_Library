import mongoose from "mongoose";

const StaffSchema = mongoose.Schema({
    staffname : {
        type : String,
        required : true,
    },
    staffId : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        default : "staff123",
        minLength : 6
    },
    profileImg : {
        type : String,
        default : ""
    },
    email : {
        type : String ,
        unique : true,
        sparse: true
    },
    department : {
        type : String,
        default : "BCA"
    },
    role : {
        type : String ,
        default : "staff",
    },
},{timestamps : true});

const Staff = mongoose.model("Staff",StaffSchema);
export default Staff;