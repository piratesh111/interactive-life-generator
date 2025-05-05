"use client"

import { useState } from "react"
import { motion } from "framer-motion"


const Comparison = ({ alternativeProfile }) => {
  const [userProfile] = useState({
    career: "Programista",
    location: "Polska",
    era: "Współczesność",
    socialStatus: "Middle",
    lifeExpectancy: 80,
    achievements: 2,
  })

  const categories = [
    {
      name: "Kariera",
      real: userProfile.career,
      alternative: alternativeProfile.career,
      realScore: 65,
      alternativeScore: 85,
    },
    {
      name: "Lokalizacja",
      real: userProfile.location,
      alternative: alternativeProfile.location,
      realScore: 70,
      alternativeScore: 80,
    },
    {
      name: "Epoka",
      real: userProfile.era,
      alternative: alternativeProfile.era,
      realScore: 75,
      alternativeScore: 65,
    },
    {
      name: "Status społeczny",
      real: userProfile.socialStatus,
      alternative: alternativeProfile.socialStatus,
      realScore: 60,
      alternativeScore:
        alternativeProfile.socialStatus === "High" ? 90 : alternativeProfile.socialStatus === "Middle" ? 70 : 50,
    },
    {
      name: "Długość życia",
      real: `${userProfile.lifeExpectancy} lat`,
      alternative: `${alternativeProfile.lifeExpectancy} lat`,
      realScore: 85,
      alternativeScore: alternativeProfile.lifeExpectancy > 70 ? 80 : 50,
    },
    {
      name: "Osiągnięcia",
      real: `${userProfile.achievements} znaczących`,
      alternative: `${alternativeProfile.achievements} znaczących`,
      realScore: 60,
      alternativeScore: alternativeProfile.achievements * 15,
    },
  ]

  return (
    <div className="comparison-card">
      <div className="comparison-header">
        <h2 className="comparison-title">Porównanie Żyć</h2>
        <p className="comparison-description">Twoje obecne życie vs. alternatywna wersja</p>
      </div>
      <div className="comparison-content">
        <div className="categories">
          {categories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="category"
            >
              <h3 className="category-name">{category.name}</h3>

              <div className="category-comparison">
                <div className="reality">
                  <p className="comparison-label">Rzeczywistość</p>
                  <p className="comparison-value">{category.real}</p>
                </div>
                <div className="alternative">
                  <p className="comparison-label">Alternatywa</p>
                  <p className="comparison-value">{category.alternative}</p>
                </div>
              </div>

              <div className="satisfaction-comparison">
                <div className="reality-satisfaction">
                  <p className="satisfaction-label">Satysfakcja</p>
                  <div className="progress-bar">
                    <div className="progress-indicator real" style={{ width: `${category.realScore}%` }}></div>
                  </div>
                </div>
                <div className="alternative-satisfaction">
                  <p className="satisfaction-label">Satysfakcja</p>
                  <div className="progress-bar">
                    <div
                      className="progress-indicator alternative"
                      style={{ width: `${category.alternativeScore}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}

          <div className="summary">
            <h3 className="summary-title">Podsumowanie</h3>
            <p className="summary-text">
              Twoja alternatywna wersja jako {alternativeProfile.name} w {alternativeProfile.location}
              ma{" "}
              {calculateOverallScore(categories, "alternativeScore") > calculateOverallScore(categories, "realScore")
                ? "wyższy"
                : "niższy"}
              poziom satysfakcji życiowej niż Twoje obecne życie. Największa różnica jest widoczna w kategorii "
              {findBiggestDifference(categories)}".
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

function calculateOverallScore(categories, key) {
  return categories.reduce((sum, category) => sum + category[key], 0) / categories.length
}

function findBiggestDifference(categories) {
  let maxDiff = 0
  let categoryName = ""

  categories.forEach((category) => {
    const diff = Math.abs(category.realScore - category.alternativeScore)
    if (diff > maxDiff) {
      maxDiff = diff
      categoryName = category.name
    }
  })

  return categoryName
}

export default Comparison
