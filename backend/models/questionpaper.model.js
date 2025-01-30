import mongoose from "mongoose";

const questionPaperSchema = new mongoose.Schema({
    year : {
        type : String,
        required : true,
    },
    markBreakdown : {
        "3_mark" : {
            type : [String],
        },
        "6_mark" : {
            type : [String],
        },
        "10_mark" : {
            type : [String],
        },
    },
    previewLink : {
        type : String,
    },
    downloadLink : {
        type : String,
    }
},{ timestamps : true });

const QuestionPaper = mongoose.model("QuestionPaper",questionPaperSchema);

export default QuestionPaper;