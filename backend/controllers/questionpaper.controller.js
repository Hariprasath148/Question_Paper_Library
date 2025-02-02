import { uploadToGoogleDrive , deleteFromGoogleDrive} from "../googledrive/googledriveupload.js";
import Subject from "../models/subject.model.js"
import QuestionPaper from "../models/questionpaper.model.js";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";

const generateUniqueQuestionID = (subjectName) => {
    const uniqueId = uuidv4();
    return `${subjectName}-${uniqueId}`; // Combine with subject code and question paper name
};

export const savePDF = async ( req , res ) => {
    try {
        const { year ,  markBreakdown , Subject_code } = req.body;
     
        const subject = await Subject.findOne({Subject_code});

        if(!subject) {
            return res.status(400).json({error : "Invail Subject informatiom"});
        }
        
        if(!year==null || !markBreakdown == null) {
            return res.status(400).json({error : "year or Question not found"});
        }
        const subject_Name = subject.Subject_name;
        const filePath = req.file.path;
        const fileName =  generateUniqueQuestionID(subject_Name);
        const fileMimeType = req.file.mimeType;
        const driveResponse = await uploadToGoogleDrive(filePath , fileName , fileMimeType);
        const downloadLink = `https://drive.google.com/uc?export=download&id=${driveResponse.id}`;

        const newQuestionPaper = new QuestionPaper({
            Subject_ID : subject._id,
            QuestionPaper_ID : fileName,
            year : year,
            markBreakdown : markBreakdown,
            googleID : driveResponse.id,
            preViewLink : driveResponse.webViewLink,
            downloadLink : downloadLink
        })

        if(newQuestionPaper) {
            await newQuestionPaper.save();
            subject.QuestionPaper.push(newQuestionPaper._id);
            await subject.save();

            fs.unlink(req.file.path, (err) => {
                if (err) {
                    console.error("Error deleting file:", err);
                    return res.status(500).json({ error : 'File processing completed, but deletion failed' });
                }
            });

            res.status(201).json({
                message: "Question Paper added and linked to Subject successfully",
                questionPaper: newQuestionPaper,
                updatedSubject: subject
            });
        }

    } catch (error) {
        console.log("Error in the savePDF controller :",error);
        res.status(500).json({error : "Inter server Error"});
    }
};

// Add a new subject
export const add_subject = async (req, res) => {
    try {
        const { Subject_name, Subject_code } = req.body;

        const existingSubject = await Subject.findOne({ Subject_name });
        if (existingSubject) {
            return res.status(400).json({ error: "Subject already exists" });
        }

        const newSubject = new Subject({ Subject_name, Subject_code });
        await newSubject.save();

        res.status(201).json({ message: "Subject added successfully", subject: newSubject });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get subjects

export const get_subject = async (req, res) => {
    try {
        const subjects = await Subject.find({}, { Subject_name: 1, _id: 1 });  // Fetch only required fields
        
        // Check if no subjects were found
        if (subjects.length === 0) {
            return res.status(404).json({ error : "No subjects found" });
        }

        res.status(200).json(subjects);
    } catch (error) {
        res.status(500).json({ error: "Server error", error });
    }
};

export const get_questionPaper = async (req , res) => {
    try {
        const { Subject_code } = req.body;

        const subject = await Subject.findOne({Subject_code}).populate("QuestionPaper" , "year preViewLink downloadLink QuestionPaper_ID -_id");

        if (!subject) {
            return res.status(404).json({ error : 'Subject not found' });
        }

        res.status(200).json({questionPaper : subject.QuestionPaper})

    } catch (error) {
        res.status(500).json({ message: "Internal Server error", error });
    }
}

export const generate_questionPaper = async (req , res ) => {
    try {
        
    } catch (error) {
        res.status(500).json({ error : "Internal Server error", error });
    }
}

export const delete_questionPaper = async (req, res) => {
    try {
        const { QuestionPaper_ID } = req.body;

        const question_paper = await QuestionPaper.findOne({ QuestionPaper_ID });

        if (!question_paper) {
            return res.status(400).json({ error: "QuestionPaper Not Found" });
        }

        const result = await QuestionPaper.deleteOne({ _id: question_paper._id });

        if (result.deletedCount === 0) {
            return res.status(404).json({ error: "QuestionPaper not found" });
        }

        await Subject.updateMany(
            { QuestionPaper: question_paper._id }, 
            { $pull: { QuestionPaper: question_paper._id } }
        );

        const driveResponse = await deleteFromGoogleDrive(question_paper.googleID);

        if (driveResponse.success) {
            return res.status(200).json({ message: "QuestionPaper deleted and removed from Subjects" });
        } else {
            return res.status(500).json({ error: "QuestionPaper deleted, but failed to delete file from Google Drive" });
        }

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server error" });
    }
};
