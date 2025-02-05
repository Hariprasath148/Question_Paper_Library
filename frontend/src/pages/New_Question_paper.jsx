import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import "../style/questionpaper.css"

export const New_Question_paper = () => {
  return (
    <>
      <div className="sticky-top question-paper-title text-center pt-2 pb-2 fs-5">Add New Question Paper</div>
      <div className="row vh-100 m-0">
        <div  className="col questionpaper-container"></div>
        <div  className="col"></div>
      </div>
    </>
  )
}
