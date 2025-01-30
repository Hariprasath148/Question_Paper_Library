import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import "../style/staffLibrary.css"
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

export const Staff_Library = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newSubject, setNewSubject] = useState("");
  const [activeSubject, setActiveSubject] = useState("Python");
  const [subjects, setSubjects] = useState([
    "Python", "Java", "C", "Data Communication"
  ]);

  const handleChangeActive = (subject) => {
    setActiveSubject(subject);
  };

  const handleAddSubject = () => {
    if (newSubject.trim() !== "") {
      setSubjects([...subjects, newSubject]);
      setNewSubject(""); 
      setIsModalOpen(false);
    }
  };

  return (
    <>
      <div className="container-xxl rounded-4 overflow-hidden p-3 staff-container mt-5" id="staff-card">
        <div className="card m-0 rounded-0 border-0">
          <div className="card-header row m-0 p-0 justify-content-start bg-transparent border-0">
            <div className="col-md-4 col-6 d-flex p-0 ps-2 align-items-center">
              <div className="vr h-100 side-line rounded opacity-100"></div>
              <div id="staff-label" className="card-header bg-transparent h5 border-0 fw-normal text-wrap ps-2 p-0">
                Question Paper Library
              </div>
            </div>
          </div>
        </div>
        <div className="card-body p-3 mt-3">
          {subjects.map((subject, index) => (
            <button
              key={index}
              className={`Custom_Button my-2 ${subject === activeSubject ? "activeSubject" : ""}`}
              onClick={() => handleChangeActive(subject)}
            >
              {subject}
            </button>
          ))}
        </div>
        <div className="d-flex justify-content-center">
          <button className="cus_but" onClick={() => setIsModalOpen(true)}>+ Add Subject</button>
        </div>
        {isModalOpen && (
          <div className="modal">
            <div className="modal-content">
              <h2>Add a New Subject</h2>
              <input
                type="text"
                className='form-control'
                placeholder="Enter Subject Name"
                value={newSubject}
                onChange={(e) => setNewSubject(e.target.value)}
              />
              <div className="modal-buttons">
                <button onClick={() => setIsModalOpen(false)} className="cancel-button">
                  Cancel
                </button>
                <button onClick={handleAddSubject} className="submit-button">
                  Add
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
