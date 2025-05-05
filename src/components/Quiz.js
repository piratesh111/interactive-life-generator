"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"


const Quiz = ({ onComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState({})

  const questions = [
    {
      id: "era",
      question: "W jakiej epoce chciałbyś/chciałabyś żyć?",
      options: [
        { value: "ancient", label: "Starożytność" },
        { value: "medieval", label: "Średniowiecze" },
        { value: "renaissance", label: "Renesans" },
        { value: "modern", label: "Współczesność" },
        { value: "future", label: "Przyszłość" },
      ],
    },
    {
      id: "location",
      question: "Gdzie chciałbyś/chciałabyś się urodzić?",
      options: [
        { value: "Japan", label: "Japonia" },
        { value: "Medieval Europe", label: "Europa" },
        { value: "Ancient Egypt", label: "Egipt" },
        { value: "Future", label: "Kolonia kosmiczna" },
      ],
    },
    {
      id: "career",
      question: "Jaką ścieżkę kariery byś wybrał/a?",
      options: [
        { value: "warrior", label: "Wojownik/Wojowniczka" },
        { value: "scholar", label: "Uczony/Uczona" },
        { value: "artist", label: "Artysta/Artystka" },
        { value: "leader", label: "Przywódca/Przywódczyni" },
        { value: "explorer", label: "Odkrywca/Odkrywczyni" },
      ],
    },
    {
      id: "personality",
      question: "Jakie cechy charakteru byś zmienił/a?",
      options: [
        { value: "brave", label: "Większa odwaga" },
        { value: "creative", label: "Większa kreatywność" },
        { value: "social", label: "Większa towarzyskość" },
        { value: "ambitious", label: "Większa ambicja" },
        { value: "calm", label: "Większy spokój" },
      ],
    },
    {
      id: "priority",
      question: "Co byłoby dla Ciebie najważniejsze?",
      options: [
        { value: "wealth", label: "Bogactwo" },
        { value: "fame", label: "Sława" },
        { value: "knowledge", label: "Wiedza" },
        { value: "power", label: "Władza" },
        { value: "happiness", label: "Szczęście" },
      ],
    },
  ]

  const handleAnswer = (value) => {
    const newAnswers = { ...answers, [questions[currentQuestion].id]: value }
    setAnswers(newAnswers)

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      onComplete(newAnswers)
    }
  }

  const currentQ = questions[currentQuestion]

  return (
    <div className="quiz-card">
      <div className="quiz-header">
        <h2 className="quiz-title">Odkryj swoją alternatywną wersję</h2>
        <p className="quiz-description">
          Pytanie {currentQuestion + 1} z {questions.length}
        </p>
      </div>
      <div className="quiz-content">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="question-container"
          >
            <h3 className="question">{currentQ.question}</h3>
            <div className="options">
              {currentQ.options.map((option) => (
                <div key={option.value} className="option" onClick={() => handleAnswer(option.value)}>
                  <input
                    type="radio"
                    id={option.value}
                    name="quiz-option"
                    value={option.value}
                    onChange={() => {}}
                    checked={answers[currentQ.id] === option.value}
                  />
                  <label htmlFor={option.value}>{option.label}</label>
                </div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="quiz-footer">
        <button
          className="back-button"
          onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
          disabled={currentQuestion === 0}
        >
          Wstecz
        </button>
        <div className="progress-dots">
          {questions.map((_, index) => (
            <div
              key={index}
              className={`progress-dot ${
                index === currentQuestion ? "current" : index < currentQuestion ? "completed" : ""
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Quiz
