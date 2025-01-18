import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import "../style/staffLibrary.css"
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
export const Staff_Library = () => {
  const [activeSubject,SetactiveSubject]=useState("Python")
  const subjects=["Python", "Java", "C", "Data Communication", "Software Engineering", "RDBMS","Cloud Computing","PHP","SQL"]
  const HandleChangeActive=(subject)=>{
    SetactiveSubject(subject);
  }
  return (
    <>
    <div className="container-xxl rounded-4 overflow-hidden p-3 staff-container mt-5" id="staff-card">
      <div className="card m-0 rounded-0 border-0">
        <div className="card-header row m-0 p-0 justify-content-start bg-transparent border-0">
          <div className="col-md-4 col-6 d-flex p-0 ps-2 align-items-center">
            <div className="vr h-100 side-line rounded opacity-100"></div>
            <div id="staff-label" className="card-header bg-transparent h5 border-0 fw-normal text-wrap ps-2 p-0">Question Paper Library</div>
          </div>
        </div>
      </div>
      <div className="card-body p-3 mt-3"> 
        {subjects.map((subject,index)=>(
          <button 
          key={index} 
          className={`Custom_Button my-2 ${subject===activeSubject?"activeSubject":""}`} 
          onClick={()=>HandleChangeActive(subject)}
          >
            {subject}   
          </button>
        ))}
      </div>  
    </div>
  </>
  )
}
