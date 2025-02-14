import baseURL from "../constant/constant";
import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Trash2 } from "lucide-react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "../style/staffLibrary.css";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

// Fetch subjects from backend
export const fetchSubjects = async () => {
  const response = await fetch(`${baseURL}/api/questionpaper/get-subject`); 
  if (!response.ok) throw new Error("Failed to fetch subjects");
  return response.json();
};

// Fetch question papers based on subject code
export const fetchQuestionPapers = async (subjectCode) => {
  const response = await fetch(`${baseURL}/api/questionpaper/get-questionPaper?Subject_code=${subjectCode}`);
  if (!response.ok) throw new Error("Failed to fetch question papers");
  return response.json();
};

// Delete a question paper
export const deleteQuestionPaper = async (QuestionPaper_ID) => {
  const response = await fetch(`${baseURL}/api/questionpaper/delete-questionPaper`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ QuestionPaper_ID }),
  });
  if (!response.ok) throw new Error("Failed to delete question paper");
  return response.json();
};

export const Staff_Library = () => {
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newSubject, setNewSubject] = useState("");
  const [subjectCode, setSubjectCode] = useState("");
  const [activeSubject, setActiveSubject] = useState(null);
  const [activeSubjectCode, setActiveSubjectCode] = useState("");

  // Fetch subjects
  const { data: subjects = [], isLoading, isError } = useQuery({
    queryKey: ["subjects"],
    queryFn: fetchSubjects,
  });

  // Fetch question papers when activeSubjectCode changes
  const { data: questionPapers = [], isLoading: isLoadingPapers } = useQuery({
    queryKey: ["questionPapers", activeSubjectCode],
    queryFn: () => fetchQuestionPapers(activeSubjectCode),
    enabled: !!activeSubjectCode,
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: deleteQuestionPaper,
    onSuccess: () => {
      queryClient.invalidateQueries(["questionPapers", activeSubjectCode]);
    },
  });

  const handleDelete = (id) => {
    deleteMutation.mutate(id);
  };

  useEffect(() => {
    if (subjects.length > 0 && activeSubject === null) {
      setActiveSubject(subjects[0]._id);
      setActiveSubjectCode(subjects[0].Subject_code);
    }
  }, [subjects]);

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
          {isLoading && <p>Loading subjects...</p>}
          {isError && <p>Error fetching subjects.</p>}
          {subjects.length === 0 && <p>No records found.</p>}
          {subjects.map((subject, index) => (
            <button
              key={subject._id || index}
              className={`Custom_Button my-2 ${activeSubject === subject._id ? "active" : ""}`}
              onClick={() => {
                setActiveSubject(subject._id);
                setActiveSubjectCode(subject.Subject_code);
              }}
            >
              {subject.Subject_name}
            </button>
          ))}
          <button className="cus_but" onClick={() => setIsModalOpen(true)}>+ Add Subject</button>
        </div>

        <div className="mt-2 ms-4 d-flex gap-4 flex-wrap row">
          {isLoadingPapers && <p>Loading question papers...</p>}
          {questionPapers?.questionPaper?.length === 0 && 
            <div>
              <p>There is no question paper available</p>
            </div>
          }
          {questionPapers?.questionPaper?.map((paper, index) => (
            <div key={index} className="cards p-4 border-primary text-center" style={{ maxWidth: "350px", position: "relative" }}>
              <div className="card-body">
                <h5 className="card-title border-bottom pb-3 pt-3 text-wrap">{paper.topic}</h5>
                <button style={{ border: "none", background: "none" }} onClick={() => handleDelete(paper.QuestionPaper_ID)}>
                  <Trash2 className="Trash-icon" size={24} color="red" />
                </button>
                <div className="d-flex justify-content-between mt-3">
                  <NavLink to={paper.preViewLink} target="_blank" rel="noopener noreferrer" className="bt1">
                    View
                  </NavLink>
                  <NavLink to={paper.downloadLink} target="_blank" rel="noopener noreferrer" className="bt2">
                    Download
                  </NavLink>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};