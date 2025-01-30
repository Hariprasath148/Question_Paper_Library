import uploadToGoogleDrive from "../googledrive/googledriveupload.js";

export const savePDF = async ( req , res ) => {
    try {
        const { year } = req.body;
        const filePath = req.file.path;
        const fileName = req.file.originalname;
        const fileMimeType = req.file.mimeType;
        const driveresponse = await uploadToGoogleDrive(filePath , fileName , fileMimeType)
       
        
    } catch (error) {
        console.log("Error in the savePDF controller :",error);
        res.status(500).json({error : "Inter server Error"});
    }
};