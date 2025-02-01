import uploadToGoogleDrive from "../googledrive/googledriveupload.js";
import Subject from "../models/subject.model.js"

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
// Add a new subject
export const add_subject = async (req, res) => {
    try {
        const { Subject_name, Subject_code } = req.body;

        const existingSubject = await Subject.findOne({ Subject_name });
        if (existingSubject) {
            return res.status(400).json({ message: "Subject already exists" });
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
            return res.status(404).json({ message: "No subjects found" });
        }

        res.status(200).json(subjects);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};


