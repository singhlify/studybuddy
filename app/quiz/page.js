"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import axios from "axios";

const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;
const LOCAL_STORAGE_KEY = "studyRoadmap";

const fetchQuizQuestions = async (subtopic, setQuiz) => {
  const prompt = `Generate a set of 5 multiple-choice quiz questions for the topic: "${subtopic}". Each question should have 4 answer options, one of which is correct. The response should be in valid JSON format as follows:
  {
    "quiz": [
      {
        "question": "Question text",
        "options": ["Option A", "Option B", "Option C", "Option D"],
        "answer": "Correct Option"
      }
    ]
  }`;

  const requestBody = {
    contents: [{
      parts: [{ text: prompt }]
    }]
  };

  try {
    const response = await axios.post(API_URL, requestBody, {
      headers: { "Content-Type": "application/json" },
    });

    console.log("Gemini API Quiz Response:", response.data);

    let quizData = response.data?.candidates?.[0]?.content?.parts?.[0]?.text;
    quizData = quizData.replace(/```json|```/g, "").trim(); // Remove Markdown formatting
    const parsedQuiz = JSON.parse(quizData).quiz || [];

    setQuiz(parsedQuiz);
  } catch (error) {
    console.error("Error fetching quiz questions:", error);
  }
};

export default function QuizPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const subtopic = searchParams.get("subtopic");
  const [quiz, setQuiz] = useState([]);
  const [answers, setAnswers] = useState({});
  const [fetched, setFetched] = useState(false);

  useEffect(() => {
    if (subtopic && !fetched) {
      fetchQuizQuestions(subtopic, setQuiz);
      setFetched(true);
    }
  }, [subtopic, fetched]);

  const handleAnswerChange = (questionIndex, selectedOption) => {
    setAnswers((prev) => ({ ...prev, [questionIndex]: selectedOption }));
  };

  const handleSubmit = () => {
    const allCorrect = quiz.every((q, index) => answers[index] === q.answer);
    if (allCorrect) {
      const savedRoadmap = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [];
      const updatedRoadmap = savedRoadmap.map((step, index, array) => {
        if (step.title === subtopic) {
          step.completed = true;
          step.inProgress = false;
          if (index + 1 < array.length) {
            array[index + 1].inProgress = true;
          }
        }
        return step;
      });
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedRoadmap));
      router.push("/");
    } else {
      alert("Some answers are incorrect. Please try again.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Quiz on {subtopic}</h1>
      {quiz.length === 0 ? (
        <p>Loading quiz...</p>
      ) : (
        <div className="space-y-6">
          {quiz.map((q, index) => (
            <div key={index} className="p-4 border rounded shadow">
              <p className="font-semibold">{q.question}</p>
              <ul className="mt-2 space-y-2">
                {q.options.map((option, idx) => (
                  <li key={idx} className="flex items-center">
                    <input
                      type="radio"
                      name={`question-${index}`}
                      id={`q${index}-o${idx}`}
                      value={option}
                      className="mr-2"
                      onChange={() => handleAnswerChange(index, option)}
                    />
                    <label htmlFor={`q${index}-o${idx}`}>{option}</label>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <button className="mt-4 px-4 py-2 bg-green-500 text-white rounded" onClick={handleSubmit}>
            Submit Quiz
          </button>
        </div>
      )}
    </div>
  );
}
