"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;
const LOCAL_STORAGE_KEY = "studyRoadmap";

const fetchGeminiResponse = async (notes, setSteps, setView) => {
  const prompt = `Given the following study notes, generate a structured roadmap breaking down key concepts into sequential learning steps. The response should be in valid JSON format without markdown or code block syntax. The JSON structure should be:
  {
    "roadmap": [
      {
        "title": "Step Title",
        "description": "Step description.",
        "resources": [
          { "type": "article", "title": "Resource Title", "url": "Resource URL" }
        ]
      }
    ]
  }
  Here are the study notes: "${notes}"`;

  const requestBody = {
    contents: [{
      parts: [{ text: prompt }]
    }]
  };

  try {
    const response = await axios.post(API_URL, requestBody, {
      headers: { "Content-Type": "application/json" },
    });

    console.log("Gemini API Response:", response.data);

    let roadmap = response.data?.candidates?.[0]?.content?.parts?.[0]?.text;
    roadmap = roadmap.replace(/```json|```/g, "").trim(); // Remove Markdown formatting
    const parsedRoadmap = JSON.parse(roadmap).roadmap || [];

    const structuredSteps = parsedRoadmap.map((step, index) => ({
      title: step.title,
      description: step.description,
      resources: step.resources || [],
      inProgress: index === 0,
      completed: false,
    }));

    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(structuredSteps));
    setSteps(structuredSteps);
    setView("steps");
  } catch (error) {
    console.error("Error fetching roadmap:", error);
  }
};

const NoteUploader = ({ onNotesSubmit }) => {
  const [notes, setNotes] = useState("");
  
  return (
    <div className="flex flex-col items-center space-y-4">
      <textarea
        className="w-1/2 p-4 border rounded"
        placeholder="Paste your notes here..."
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
      ></textarea>
      <button className="px-4 py-2 bg-blue-500 text-white rounded" onClick={() => onNotesSubmit(notes)}>
        Generate Study Roadmap
      </button>
    </div>
  );
};

const StepProgress = ({ steps, onReset }) => {
  const router = useRouter();

  return (
    <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-300 before:to-transparent">
      {steps.map((step, index) => (
        <div
          key={index}
          className={`relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group 
            ${step.completed ? "is-active" : step.inProgress ? "is-inprogress" : ""}`}
        >
          <div className={`flex items-center justify-center w-10 h-10 rounded-full border border-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 
              ${step.completed ? "bg-emerald-500 text-emerald-50" : step.inProgress ? "bg-blue-500 text-white" : "bg-slate-300 text-slate-500"}`}
          >
            {step.completed ? (
              <svg className="fill-current" xmlns="http://www.w3.org/2000/svg" width="12" height="10">
                <path
                  fillRule="nonzero"
                  d="M10.422 1.257 4.655 7.025 2.553 4.923A.916.916 0 0 0 1.257 6.22l2.75 2.75a.916.916 0 0 0 1.296 0l6.415-6.416a.916.916 0 0 0-1.296-1.296Z"
                />
              </svg>
            ) : step.inProgress ? (
              <span className="w-4 h-4 bg-white rounded-full"></span>
            ) : (
              <span className="w-4 h-4 bg-gray-400 rounded-full"></span>
            )}
          </div>
          <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white p-4 rounded border border-slate-200 shadow">
            <div className="font-bold text-slate-900">{step.title}</div>
            <div className="text-slate-500">{step.description}</div>
            {step.inProgress && (
              <button className="mt-2 px-4 py-2 bg-blue-600 text-white rounded" onClick={() => router.push(`/quiz?subtopic=${encodeURIComponent(step.title)}`)}>
                Start Quiz
              </button>
            )}
          </div>
        </div>
      ))}
      <button className="mt-6 px-4 py-2 bg-red-500 text-white rounded" onClick={onReset}>Start New Roadmap</button>
    </div>
  );
};

export default function Home() {
  const [steps, setSteps] = useState([]);
  const [view, setView] = useState("upload");

  useEffect(() => {
    const savedRoadmap = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (savedRoadmap) {
      setSteps(JSON.parse(savedRoadmap));
      setView("steps");
    }
  }, []);

  return (
    <main className="my-12 mx-8 flex flex-col items-center">
      {view === "upload" ? (
        <NoteUploader onNotesSubmit={(notes) => fetchGeminiResponse(notes, setSteps, setView)} />
      ) : (
        <StepProgress steps={steps} onReset={() => { setView("upload"); setSteps([]); localStorage.removeItem(LOCAL_STORAGE_KEY); }} />
      )}
    </main>
  );
}
