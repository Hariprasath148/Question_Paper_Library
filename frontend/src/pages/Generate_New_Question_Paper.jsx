import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import "../style/generate_questionPaper.css"
import banner from "../assets/images/qp_generator/qp_banner.png"
import { useMutation, useQuery } from '@tanstack/react-query';
import baseURL from '../constant/constant';
import { RefreshCw } from 'lucide-react';
import { toast } from 'react-hot-toast';

export const Generate_New_Question_Paper = () => {
    const sem_pattern = {
        mark_3 : 12,
        mark_6 : 7,
        mark_10 : 6,
        mark_3_topic_main : "SECTION - A (10 X 3 = 30 MARKS)",
        mark_3_topic_sub : "(Answer Any TEN Questions)",
        mark_6_topic_main : "SECTION - B (5 X 6 = 30 MARKS)",
        mark_6_topic_sub : "(Answer Any FIVE Questions)",
        mark_10_topic_main : "SECTION - C (4 X 10 = 40 MARKS)",
        mark_10_topic_sub : "(Answer Any FOUR Questions)",
        max_marks : 100,
        time : 3
    };
    const mid_pattern = {
        mark_3 : 6,
        mark_6 : 5,
        mark_10 : 3,
        mark_3_topic_main : "SECTION - A (4 X 3 = 12 MARKS)",
        mark_3_topic_sub : "(Answer Any FOUR Questions)",
        mark_6_topic_main : "SECTION - B (3 X 6 = 18 MARKS)",
        mark_6_topic_sub : "(Answer Any THREE Questions)",
        mark_10_topic_main : "SECTION - C (2 X 10 = 20 MARKS)",
        mark_10_topic_sub : "(Answer Any TWO Questions)",
        max_marks : 50,
        time : 1.5
    };

    const [date , setDate] = useState(null);
    const [questionPaper_code , setQuestionPaper_code] = useState(null);
    const [questionPaper_format , SetQuestionPaper_format] = useState(sem_pattern);
    const [current_questionPaper_format , set_Current_QuestionPaper_format] = useState("sem");
    const [subject_name , setSubject_name] = useState(null);
    const [subject_code , setSubject_code] = useState(null);
    const [questionStatus , setQuestionStatus] = useState(false);
    const [questionSectionDisplay , setQuestionSectionDisplay] = useState(false);
    // const [fetchedThreeMark , setFetchedThreeMark] = useState([]);
    // const [fetchedSixMark , setFetchedSixMark] = useState([]);
    // const [fetchedTenMark , setFetchedTenMark] = useState([]);
    // const [selectedThreeMark , setSelectedThreeMark ] = useState([]);
    // const [selectedSixMark , setSelectedSixMark ] = useState([]);
    // const [selectedTenMark , setSelectedTenMark ] = useState([]);
    const [fetchedQuestion , setFetchedQuestion] = useState({
        mark_3 : [],
        mark_6 : [],
        mark_10 : []
    });
    const [SelectedQuestion , setSelectedQuestion] = useState({
        mark_3 : [],
        mark_6 : [],
        mark_10 : []
    });
    useEffect(()=>{
        if(fetchedQuestion.mark_3.length !=0 && SelectedQuestion.mark_3.length < questionPaper_format.mark_3){
            for(let i=0 ; i< questionPaper_format.mark_3 ; i++){
                setSelectedQuestion(prevState => ({
                    ...prevState,
                    mark_3 : [...prevState.mark_3 , fetchedQuestion.mark_3[Math.floor(Math.random() * fetchedQuestion.mark_3.length)]]
                }))
            }
        }
        if(fetchedQuestion.mark_6.length !=0 && SelectedQuestion.mark_6.length < questionPaper_format.mark_6){
            for(let i=0 ; i< questionPaper_format.mark_6 ; i++){
                setSelectedQuestion(prevState => ({
                    ...prevState,
                    mark_6 : [...prevState.mark_6 , fetchedQuestion.mark_6[Math.floor(Math.random() * fetchedQuestion.mark_6.length)]]
                }))
            }
        }
        if(fetchedQuestion.mark_10.length !=0 && SelectedQuestion.mark_10.length < questionPaper_format.mark_10){
            for(let i=0 ; i< questionPaper_format.mark_10 ; i++){
                setSelectedQuestion(prevState => ({
                    ...prevState,
                    mark_10 : [...prevState.mark_10 , fetchedQuestion.mark_10[Math.floor(Math.random() * fetchedQuestion.mark_10.length)]]
                }))
            }
        }
        
    },[fetchedQuestion]);

    const {data : subjects , isLoading : isLoadingSubject } = useQuery({
        queryKey : ["getSubject"],
        queryFn : async() => {
            try {
                const res = await fetch(`${baseURL}/api/questionpaper/get-subject`);
                const data = await res.json();
                if(data.error) {
                    return null;
                }
                if(!res.ok){
                    throw new Error(data.error || "Something went Wrong");
                }
                setSubject_name(data[0].Subject_name);
                setSubject_code(data[0].Subject_code);
                return data;
            } catch (error) {
                throw error;
            }
        }
    });

    const { mutate : get_questions , isPending : isGetQuestionPending , isError : isGetQuestionError , error : getQuestionError  } = useMutation({
        mutationFn : async(Subject_code)=>{
            try {
                const res = await fetch(`${baseURL}/api/questionpaper/get-questions?Subject_code=${Subject_code}`);
                const data = await res.json();
                if(!res.ok) {
                    return new Error(data.error || "Something Went Wrong");
                }
                // setFetchedThreeMark(data.mark_3);
                // setFetchedSixMark(data.mark_6);
                // setFetchedTenMark(data.mark_10);
                setFetchedQuestion({
                    mark_3 : data.mark_3,
                    mark_6 : data.mark_6,
                    mark_10 : data.mark_10
                });
                setQuestionSectionDisplay(true);
            } catch (error) {
                console.log(error);
                throw error
            }
        }
    });

    const { mutate : post_question_paper , isPending : isPostPuestionPaperPending , isError : isPostPuestionPaperError , error : PostPuestionPaperError } = useMutation({
        mutationFn : async(final_pdf_format)=> {
            try {
                const res = await fetch(`${baseURL}/api/questionpaper/generate-question-paper`,{
                    method : "POST",
                    credentials : "include",
                    headers : {
                        "Content-Type" : "application/json"
                    },
                    body : JSON.stringify({htmlContent : final_pdf_format })
                })
                const blob = await res.blob();
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = "QuestionPaper.pdf"; // Set filename
                document.body.appendChild(a);
                a.click(); // Trigger download
                document.body.removeChild(a);
                window.URL.revokeObjectURL(url);

            } catch (error) {
                console.log(error);
                throw error;
            }
        }
    })

    const handleSubjects_change = (e)=>{
        const index = e.target.value;
        setSubject_name(subjects[index].Subject_name);
        setSubject_code(subjects[index].Subject_code);
        setQuestionStatus(false);
        setSelectedQuestion({
            mark_3 : [],
            mark_6 : [],
            mark_10 : []
        })
    }

    const changeFormat = (format)=>{
        set_Current_QuestionPaper_format(format);
        setQuestionStatus(false);
        if(format === "sem") {
            SetQuestionPaper_format(sem_pattern);
        }
        if(format === "mid") {
            SetQuestionPaper_format(mid_pattern);
        }
    }

    const handel_form =(e)=>{
        e.preventDefault();
        setQuestionStatus(true);
        get_questions(subject_code);
        // setFetchedThreeMark([]);
        // setFetchedSixMark([]);
        // setFetchedTenMark([]);
        setFetchedQuestion({
            mark_3 : [],
            mark_6 : [],
            mark_10 : []
        });
        setSelectedQuestion({
            mark_3 : [],
            mark_6 : [],
            mark_10 : []
        })
    }

    const refreshQuestion = (mark_type , targetIndex) => {
        if(mark_type === 3 && fetchedQuestion.mark_3.length > 0) {
            setSelectedQuestion(prevState => ({
                ...prevState,
                mark_3: prevState.mark_3.map((q, index) => 
                    index === targetIndex ? fetchedQuestion.mark_3[Math.floor(Math.random() * fetchedQuestion.mark_3.length)] : q
                )
            }));
        }
        if(mark_type === 6 && fetchedQuestion.mark_6.length > 0) {
            setSelectedQuestion(prevState => ({
                ...prevState,
                mark_6: prevState.mark_6.map((q, index) => 
                    index === targetIndex ? fetchedQuestion.mark_6[Math.floor(Math.random() * fetchedQuestion.mark_6.length)] : q
                )
            }));
        }
        if(mark_type === 10 && fetchedQuestion.mark_10.length > 0) {
            setSelectedQuestion(prevState => ({
                ...prevState,
                mark_10: prevState.mark_10.map((q, index) => 
                    index === targetIndex ? fetchedQuestion.mark_10[Math.floor(Math.random() * fetchedQuestion.mark_10.length)] : q
                )
            }));
        }
    }

    const updateQuestion = (targetIndex , value , mark_type) => {
        if(mark_type === 3) {
            setSelectedQuestion(prevState => ({
                ...prevState,
                mark_3: prevState.mark_3.map((q, index) => 
                    index === targetIndex ? value : q
                )
            }));
        }
        if(mark_type === 6) {
            setSelectedQuestion(prevState => ({
                ...prevState,
                mark_6: prevState.mark_6.map((q, index) => 
                    index === targetIndex ? value : q
                )
            }));
        }
        if(mark_type === 10) {
            setSelectedQuestion(prevState => ({
                ...prevState,
                mark_10: prevState.mark_10.map((q, index) => 
                    index === targetIndex ? value : q
                )
            }));
        }
    }

    const addquestionbyinput = (markType,inputId) => {
        if(markType == 3 && questionPaper_format.mark_3 > SelectedQuestion.mark_3.length) {
            let newInput = document.getElementById(inputId).value;
            if(!newInput == "") {
            setSelectedQuestion(prevState => ({
                ...prevState,
                mark_3 : [...prevState.mark_3 , newInput ]}));
              document.getElementById(inputId).value = "";
            }
        }
        else if(markType == 6 && questionPaper_format.mark_6 > SelectedQuestion.mark_6.length) {
            let newInput = document.getElementById(inputId).value;
            if(!newInput == "") {
                setSelectedQuestion(prevState => ({
                    ...prevState,
                    mark_6 : [...prevState.mark_6 , newInput ]}));
                document.getElementById(inputId).value = "";
            }
        }
        else if(markType == 10 && questionPaper_format.mark_10 > SelectedQuestion.mark_10.length) {
            let newInput = document.getElementById(inputId).value;
            if(!newInput == "") {
                setSelectedQuestion(prevState => ({
                    ...prevState,
                    mark_10 : [...prevState.mark_10 , newInput ]}));
                document.getElementById(inputId).value = "";
            }
        }else {
            toast.error("Question is Full")
        }
    };

    const getnewquestionbyinput = (markType,inputId) => {
        if(markType == 3 && fetchedQuestion.mark_3.length > 0) {
            document.getElementById(inputId).value = fetchedQuestion.mark_3[Math.floor(Math.random() * fetchedQuestion.mark_3.length)];
        }
        else if(markType == 6 && fetchedQuestion.mark_6.length > 0) {
            document.getElementById(inputId).value = fetchedQuestion.mark_6[Math.floor(Math.random() * fetchedQuestion.mark_6.length)];
        }
        else if(markType == 10 && fetchedQuestion.mark_10.length > 0) {
            document.getElementById(inputId).value = fetchedQuestion.mark_10[Math.floor(Math.random() * fetchedQuestion.mark_10.length)];
        }else {
            toast.error("No More Question");
        }
    };

    const removeQuestion = (index, marksType) => {
        if (marksType === 3) {
            setSelectedQuestion(prevState => ({
                ...prevState,
                mark_3 : prevState.mark_3.filter((_, i) => i !== index)}));
        } else if (marksType === 6) {
            setSelectedQuestion(prevState => ({
                ...prevState,
                mark_6 : prevState.mark_6.filter((_, i) => i !== index)}));
        } else if (marksType === 10) {
            setSelectedQuestion(prevState => ({
                ...prevState,
                mark_10 : prevState.mark_10.filter((_, i) => i !== index)}));
        }
    };

    const generate_questionPaper = ()=> {
        let final_pdf_format = document.querySelector("#question-paper-preview").innerHTML
        post_question_paper(final_pdf_format);
    }

  return (
    <>
        <div className="container-xl">
            <div className="container-fluid mt-4">
                <img src={banner} alt="Banner Image" className="img-fluid"/>
            </div>
            <div className="container p-2 mt-4">
                <form onSubmit={handel_form}>
                    <div className="mb-2">
                        <label htmlFor="subjects-select mb-2" className="form-label">Selete the Subject</label>
                        <select className="form-select mb-2 form-control" name="subjects-select" id="subjects-select" onChange={handleSubjects_change}>
                            { isLoadingSubject ? (
                                <option>Loading</option>
                            ) : (
                                subjects.map((subject , index)=>{
                                    return (<option key={index} value={index}>{subject.Subject_name}</option>)
                                })
                            ) }
                        </select>
                        <div className='d-flex gap-5 align-items-center'>
                            <p className='fw-bold'>Subject Name : <span className="fw-normal">{subject_name}</span></p>
                            <p className='fw-bold'>Subject Code : <span className="fw-normal">{subject_code}</span></p>
                        </div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="questionPaperCode" className="mb-2">Enter the Question Paper Code</label>
                        <input type="text" name="questionPaperCode" id="questionPaperCode"  className="form-control mb-2" aria-describedby="questionPaperCode_dis" onChange={(e)=> setQuestionPaper_code(e.target.value) }/>
                        <div className="form-text " id="questionPaperCode_dis">The Question Paper code is on the top of the Question Paper Page</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="examdate" className="mb-2">Enter the Date Of Examination</label>
                        <input type="text" name="examdate" id="examdate"  className="form-control mb-2" aria-describedby="examdate_dis" onChange={(e)=> setDate(e.target.value) }/>
                        <div className="form-text " id="examdate_dis">Enter the Examination Date</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="questionPaperFormat" className="mb-2">Selecte The question Paper Format</label>
                        <div className="d-flex gap-5 mt-2 mb-2">
                            <div className="form-group">
                              <input className="form-check-input" type="radio" name="format" id="formatSem" checked={current_questionPaper_format ==="sem"} onChange={()=> changeFormat("sem")}/>
                              <label className="ps-2 form-check-label" htmlFor="newstaffRoleStaff">Semester</label>
                            </div>
                            <div className="form-group">
                              <input className="form-check-input" type="radio" name="format" id="FormatMid" onChange={()=> changeFormat("mid")} checked={current_questionPaper_format ==="mid"}/>
                              <label className="ps-2 form-check-label" htmlFor="newstaffRoleAdmin">Mid Semester</label>
                            </div>
                        </div>
                        <div className="form-text " id="questionPaperFormat_dis">Select the format of the Question Paper</div>
                    </div>
                    <button type="submit" disabled={questionStatus} className="generate-question-paper-btn btn w-100 py-2 rounded bg-primary text-light">{isGetQuestionPending ? "Colleting Questions ..." : "Get Questions"}</button>
                </form>
            </div>
            { questionSectionDisplay && 
                <>
                    <div className="row mt-4 py-3" id="question-count-container">
                    <div className='h3 fw-bold text-center col-12 mb-4'>Question Found</div>
                        <div className="col-4 d-flex justify-content-center align-items-center gap-3 flex-column">
                            <h4 className="fw-bold m-0 count-head">Three Mark </h4>
                            <h4 className="fw-bold m-0  p-2">{fetchedQuestion.mark_3.length}</h4>
                        </div>
                    <div className="col-4 d-flex justify-content-center align-items-center gap-3 flex-column">
                        <h4 className="fw-bold m-0 count-head">Six Mark </h4>
                        <h4 className="fw-bold m-0 p-2">{fetchedQuestion.mark_6.length}</h4>
                    </div>
                    <div className="col-4 d-flex justify-content-center align-items-center gap-3 flex-column">
                        <h4 className="fw-bold m-0 count-head">Ten Mark </h4>
                        <h4 className="fw-bold m-0 p-2">{fetchedQuestion.mark_10.length}</h4>
                    </div>
                    </div>
                    <div className="container-fluid">
                        <div className='h4 col-12 mb-4 mt-5'>Selected Three Mark</div>
                        <div className="input-group mb-2">
                            <input type="text" id="threeNewInput" className="form-control" placeholder="Enter a question Manually"/>
                            <span className="input-group-text"><button className="btn-primary border-0 bg-transparent" type="button" onClick={()=>{getnewquestionbyinput(3,"threeNewInput")}}>Get</button></span>
                            <span className="input-group-text"><button className="btn-primary border-0 bg-transparent" type="button" onClick={()=>{addquestionbyinput(3,"threeNewInput")}}>Add</button></span>
                        </div>
                        {
                        SelectedQuestion.mark_3.map((question , index) => (
                          <div className="input-group mb-2" key={index}>
                            <input type="text" className="form-control" value={question} onChange={(e) => updateQuestion(index, e.target.value, 3)}/> 
                            <span className="input-group-text"><button className="btn-close" type="button" aria-label="close" onClick={() => removeQuestion(index, 3)}
                            ></button></span>
                            <span className="input-group-text p-0"><button className="btn refresh-btn" type="button" onClick={()=>{refreshQuestion(3,index)}}><RefreshCw /></button></span>
                          </div>
                        ))
                        }
                        <div className='h4 col-12 mb-4 mt-5'>Selected Six Mark</div>
                        <div className="input-group mb-2">
                            <input type="text" id="sixNewInput" className="form-control" placeholder="Enter a question Manually"/>
                            <span className="input-group-text"><button className="btn-primary border-0 bg-transparent" type="button" onClick={()=>{getnewquestionbyinput(6,"sixNewInput")}}>Get</button></span>
                            <span className="input-group-text"><button className="btn-primary border-0 bg-transparent" type="button" onClick={()=>{addquestionbyinput(6,"sixNewInput")}}>Add</button></span>
                        </div>
                        {
                        SelectedQuestion.mark_6.map((question , index) => (
                          <div className="input-group mb-2" key={index}>
                            <input type="text" className="form-control" value={question} onChange={(e) => updateQuestion(index, e.target.value, 6)}/>
                            <span className="input-group-text"><button className="btn-close" type="button" aria-label="close" onClick={() => removeQuestion(index, 6)}
                            ></button></span>
                            <span className="input-group-text p-0"><button className="btn refresh-btn" type="button" onClick={()=>{refreshQuestion(6,index)}}><RefreshCw /></button></span>
                          </div>
                        ))
                        }  
                        <div className='h4 col-12 mb-4 mt-5'>Selected Ten Mark</div>
                        <div className="input-group mb-2">
                            <input type="text" id="tenNewInput" className="form-control" placeholder="Enter a question Manually"/>
                            <span className="input-group-text"><button className="btn-primary border-0 bg-transparent" type="button" onClick={()=>{getnewquestionbyinput(10,"tenNewInput")}}>Get</button></span>
                            <span className="input-group-text"><button className="btn-primary border-0 bg-transparent" type="button" onClick={()=>{addquestionbyinput(10,"tenNewInput")}}>Add</button></span>
                        </div>
                        {
                        SelectedQuestion.mark_10.map((question , index) => (
                          <div className="input-group mb-2" key={index}>
                            <input type="text" className="form-control" value={question} onChange={(e) => updateQuestion(index, e.target.value, 10)}/>
                            <span className="input-group-text"><button className="btn-close" type="button" aria-label="close" onClick={() => removeQuestion(index, 10)}
                            ></button></span>
                            <span className="input-group-text p-0"><button className="btn refresh-btn" type="button" onClick={()=>{refreshQuestion(10,index)}}><RefreshCw /></button></span>
                          </div>
                        ))
                        }       
                    </div>
                    <div className="container-fluid mt-5 mb-5 shadow p-5" id="question-paper-preview">
                        <div className="header-container">
                            <p className='question-header'>GURU NANAK COLLEGE (AUTONOMOUS), CHENNAI – 42.</p>
                            <p className='question-header'>{date}</p>
                            <p className='question-header'>{questionPaper_code}</p>
                            <p className='question-header'>{subject_name}</p>
                            <p className='question-header'>{subject_code}</p>
                            <p className='marks'>MAX. MARKS : {questionPaper_format.max_marks}</p>
                            <p className='marks'>TIME : {questionPaper_format.time}</p>
                            <p className='question-header'>{questionPaper_format.mark_3_topic_main}</p>
                            <p className='question-header'>{questionPaper_format.mark_3_topic_sub}</p>
                        </div>
                        <table className='question-table'>
                            <tbody>
                                { SelectedQuestion.mark_3.map((element , index)=> (
                                    <tr key={index} valign="top"><td>{index+1}.</td><td>{element}</td></tr>
                                ))
                                }
                            </tbody>
                        </table>
                        <div className="header-container">
                            <p className='question-header'>{questionPaper_format.mark_6_topic_main}</p>
                            <p className='question-header'>{questionPaper_format.mark_6_topic_sub}</p>
                        </div>
                        <table className='question-table'>
                            <tbody>
                                { SelectedQuestion.mark_6.map((element , index)=> (
                                    <tr key={index} valign="top"><td>{index+1}.</td><td>{element}</td></tr>
                                ))
                                }
                            </tbody>
                        </table>
                        <div className="header-container">
                            <p className='question-header'>{questionPaper_format.mark_10_topic_main}</p>
                            <p className='question-header'>{questionPaper_format.mark_10_topic_sub}</p>
                        </div>
                        <table className='question-table'>
                            <tbody>
                                { SelectedQuestion.mark_10.map((element , index)=> (
                                    <tr key={index} valign="top"><td>{index+1}.</td><td>{element}</td></tr>
                                ))
                                }
                            </tbody>
                        </table>
                        <div className="header-container">
                            <p className='question-header'>**********</p>
                        </div>
                    </div>
                    {
                        isPostPuestionPaperError && <div className='mt-2 mb-3'>
                        <p className="text-danger text-center">{PostPuestionPaperError.message}</p></div>
                    }
                    <div className="mb-5">
                        <button disabled={isPostPuestionPaperPending} className="generate-question-paper-btn w-100 py-2 bg-primary border-0 text-light rounded-2" onClick={generate_questionPaper}>{isPostPuestionPaperPending ? "Generating QuestionPaper ...." : "Generate Question Paper"}</button>
                    </div>
                </>
            }
        </div>
        
    </>
  )
}
