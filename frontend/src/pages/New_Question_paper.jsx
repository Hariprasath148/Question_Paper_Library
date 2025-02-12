import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import "../style/questionpaper.css"

export const New_Question_paper = () => {
  return (
    <>
      <div className="sticky-top question-paper-title text-center pt-2 pb-2 fs-5">Add New Question Paper</div>
      <div className="row vh-100 m-0">
        <div  className="col questionpaper-container p-3">
          <div className="h-100 w-100 bg-white"></div>
        </div>
        <div  className="col p-4">
          <form action="">
            <div className="mb-3">
              <label htmlFor="questionpaper-topic" className='form-label'>Enter The title for the question Paper</label>
              <input type="text" className="form-control" id="questionpaper-topic" aria-describedby="questionpaper-topic-help" />
              <div id="questionpaper-topic-help" className="form-text mt-2">This for the question paper discription</div>
            </div>
            <div className="mb-3">
              <label htmlFor="questionpaper-file" className='form-label'>Enter The title for the question Paper</label>
              <input type="file"  className="form-control" id="questionpaper-file" aria-describedby="questionpaper-file-help" />
              <div id="questionpaper-file-help" className="form-text mt-2">This for the question paper discription</div>
            </div>
            <div className="mb-3">
              <label className="form-label">3 Marks</label>
              <div className="input-group mb-2">
                <input type="text" className="form-control" defaultValue="what is R programming"/>
                <span className="input-group-text"><button className="btn-close" type="button" aria-label="close"></button></span>
              </div>
              <div className="input-group mb-2">
                <input type="text" className="form-control" defaultValue="what is R programming"/>
                <span className="input-group-text"><button className="btn-close" type="button" aria-label="close"></button></span>
              </div>
              <div id="questionpaper-file-help" className="form-text mt-2">This for the question paper 3 Marks</div>
            </div>
            <div className="mb-3">
              <label className="form-label">6 Marks</label>
              <div className="input-group mb-2">
                <input type="text" className="form-control" defaultValue="what is R programming"/>
                <span className="input-group-text"><button className="btn-close" type="button" aria-label="close"></button></span>
              </div>
              <div id="questionpaper-file-help" className="form-text mt-2">This for the question paper 6 Marks</div>
            </div>
            <div className="mb-3">
              <label className="form-label">10 Marks</label>
              <div className="input-group mb-2">
                <input type="text" className="form-control" defaultValue="what is R programming"/>
                <span className="input-group-text"><button className="btn-close" type="button" aria-label="close"></button></span>
              </div>
              <div id="questionpaper-file-help" className="form-text mt-2">This for the question paper 10 Marks</div>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
