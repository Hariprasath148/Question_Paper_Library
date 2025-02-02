import baseURL from "../constant/constant";

// Fetch subjects from backend
export const fetchSubjects = async () => {
  const response = await fetch(`${baseURL}/api/questionpaper/get-subject`); // Corrected URL

  if (!response.ok) {
    throw new Error("Failed to fetch subjects");
  }

  return response.json();
};

// Add a new subject to the backend
export const addSubject = async (subject) => {
  const response = await fetch(`${baseURL}/api/questionpaper/add-subject`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(subject),
  });

  if (!response.ok) {
    throw new Error("Failed to add subject");
  }

  return response.json();
};

import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import 'bootstrap/dist/css/bootstrap.min.css';
import "../style/staffLibrary.css";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

export const Staff_Library = () => {
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newSubject, setNewSubject] = useState("");
  const [subjectCode, setSubjectCode] = useState(""); // Added state for subject code
  const [activeSubject, setActiveSubject] = useState(null);
  // Fetch subjects from backend
  const { data: subjects = [], isLoading, isError } = useQuery({
    queryKey: ["subjects"],
    queryFn: fetchSubjects,
  });

  // Add a subject to backend
  const mutation = useMutation({
    mutationFn: addSubject,
    onSuccess: () => {
      queryClient.invalidateQueries(["subjects"]); // Refresh subjects after adding
      setNewSubject("");
      setSubjectCode(""); // Reset subject code
      setIsModalOpen(false);
    },
  });

  // Handle adding a new subject
  const handleAddSubject = () => {
    if (newSubject.trim() !== "" && subjectCode.trim() !== "") {
      mutation.mutate({ Subject_name: newSubject, Subject_code: subjectCode }); // Pass both subject name and code
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

        {/* Display Subjects */}
        <div className="card-body p-3 mt-3">
          {isLoading && <p>Loading subjects...</p>}
          {isError && <p>Error fetching subjects.</p>}
          {subjects.length === 0 && <p>No records found.</p>}
          {subjects.map((subject, index) => (
          <button
            key={subject._id || index}
            className={`Custom_Button my-2 ${activeSubject === subject._id ? "active" : ""}`}
            onClick={() => setActiveSubject(subject._id)}
          >
           {subject.Subject_name}
          </button>
          ))}
        </div>

        {/* Add Subject Button */}
        <div className="d-flex justify-content-center">
          <button className="cus_but" onClick={() => setIsModalOpen(true)}>+ Add Subject</button>
        </div>

        {/* Modal to Add a Subject */}
        {isModalOpen && (
          <div className="modal">
            <div className="modal-content">
              <h2>Add a New Subject</h2>
              <input
                type="text"
                className="form-control mb-2"
                placeholder="Enter Subject Name"
                value={newSubject}
                onChange={(e) => setNewSubject(e.target.value)}
              />
              <input
                type="text"
                className="form-control mb-2"
                placeholder="Enter Subject Code"
                value={subjectCode}
                onChange={(e) => setSubjectCode(e.target.value)}
              />
              <div className="modal-buttons">
                <button onClick={() => setIsModalOpen(false)} className="cancel-button">
                  Cancel
                </button>
                <button onClick={handleAddSubject} className="submit-button" disabled={mutation.isLoading}>
                  {mutation.isLoading ? "Adding..." : "Add"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
