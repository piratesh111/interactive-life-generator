"use client"

import { useState } from "react"
import Quiz from "./Quiz"
import AlternativeProfile from "./AlternativeProfile"
import Comparison from "./Comparison"
import LifeBattles from "./LifeBattles"
import Community from "./Community"
import { motion } from "framer-motion"


const AlternativeVersionGenerator = () => {
  const [currentStep, setCurrentStep] = useState("quiz")
  const [quizAnswers, setQuizAnswers] = useState({})
  const [alternativeProfile, setAlternativeProfile] = useState(null)

  const handleQuizComplete = (answers) => {
    setQuizAnswers(answers)

    // Generate alternative profile based on answers
    const profile = generateAlternativeProfile(answers)
    setAlternativeProfile(profile)

    setCurrentStep("profile")
  }

  const generateAlternativeProfile = (answers) => {
    // This would be more sophisticated in a real app
    const era = answers.era || "modern"
    const location = answers.location || "Japan"
    const career = answers.career || "Samurai"

    const names = {
      Japan: ["Takeshi", "Hiro", "Akira", "Yuki", "Kenji"],
      "Medieval Europe": ["William", "Arthur", "Eleanor", "Catherine", "Richard"],
      "Ancient Egypt": ["Amenhotep", "Nefertiti", "Ramses", "Cleopatra", "Tutankhamun"],
      Future: ["Nova", "Orion", "Zephyr", "Astra", "Quantum"],
    }

    const careers = {
      Japan: ["Samurai", "Merchant", "Monk", "Artist", "Farmer"],
      "Medieval Europe": ["Knight", "Blacksmith", "Monk/Nun", "Noble", "Peasant"],
      "Ancient Egypt": ["Pharaoh", "Priest/Priestess", "Scribe", "Craftsman", "Farmer"],
      Future: ["AI Engineer", "Space Explorer", "Biohacker", "Virtual Reality Designer", "Climate Restorer"],
    }

    const traits = ["Brave", "Wise", "Cunning", "Compassionate", "Ambitious", "Loyal", "Creative"]

    return {
      name: names[location][Math.floor(Math.random() * names[location].length)],
      location: location,
      era: era,
      career: careers[location][Math.floor(Math.random() * careers[location].length)],
      traits: [traits[Math.floor(Math.random() * traits.length)], traits[Math.floor(Math.random() * traits.length)]],
      partner: Math.random() > 0.3 ? names[location][Math.floor(Math.random() * names[location].length)] : "None",
      rival: Math.random() > 0.5 ? names[location][Math.floor(Math.random() * names[location].length)] : "None",
      socialStatus: ["Low", "Middle", "High"][Math.floor(Math.random() * 3)],
      lifeExpectancy: Math.floor(Math.random() * 40) + 30,
      achievements: Math.floor(Math.random() * 5) + 1,
    }
  }

  return (
    <div className="generator-container">
      <div className="tabs">
        <button className={`tab ${currentStep === "quiz" ? "active" : ""}`} onClick={() => setCurrentStep("quiz")}>
          Quiz
        </button>
        <button
          className={`tab ${currentStep === "profile" ? "active" : ""}`}
          onClick={() => alternativeProfile && setCurrentStep("profile")}
          disabled={!alternativeProfile}
        >
          Profil
        </button>
        <button
          className={`tab ${currentStep === "comparison" ? "active" : ""}`}
          onClick={() => alternativeProfile && setCurrentStep("comparison")}
          disabled={!alternativeProfile}
        >
          Porównanie
        </button>
        <button
          className={`tab ${currentStep === "battles" ? "active" : ""}`}
          onClick={() => alternativeProfile && setCurrentStep("battles")}
          disabled={!alternativeProfile}
        >
          Bitwy Życiowe
        </button>
        <button
          className={`tab ${currentStep === "community" ? "active" : ""}`}
          onClick={() => setCurrentStep("community")}
        >
          Społeczność
        </button>
      </div>

      <div className="tab-content">
        {currentStep === "quiz" && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Quiz onComplete={handleQuizComplete} />
          </motion.div>
        )}

        {currentStep === "profile" && alternativeProfile && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <AlternativeProfile profile={alternativeProfile} />
          </motion.div>
        )}

        {currentStep === "comparison" && alternativeProfile && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Comparison alternativeProfile={alternativeProfile} />
          </motion.div>
        )}

        {currentStep === "battles" && alternativeProfile && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <LifeBattles alternativeProfile={alternativeProfile} />
          </motion.div>
        )}

        {currentStep === "community" && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Community />
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default AlternativeVersionGenerator
