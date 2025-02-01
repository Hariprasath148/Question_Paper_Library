import uploadToGoogleDrive from "../googledrive/googledriveupload.js";
import QuestionPaper from "../models/questionpaper.model.js";

export const savePDF = async ( req , res ) => {
    try {
        const { year ,  markBreakdown , } = req.body;

        if(!year==null || !markBreakdown == null) {
            res.status(400).json({error : "year or Question not found"});
        }
        const filePath = req.file.path;
        const fileName = req.file.originalname;
        const fileMimeType = req.file.mimeType;
        const driveresponse = await uploadToGoogleDrive(filePath , fileName , fileMimeType);
        const downloadLink = `https://drive.google.com/uc?export=download&id=${driveresponse.id}`;

        const newQuestionPaper = new QuestionPaper({
            year : year,
            markBreakdown : markBreakdown,
            previewLink : driveresponse.webViewLink,
            downloadLink : downloadLink
        })

    } catch (error) {
        console.log("Error in the savePDF controller :",error);
        res.status(500).json({error : "Inter server Error"});
    }
};