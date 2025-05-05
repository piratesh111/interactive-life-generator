"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ThumbsUp, Users, Award, BarChart2 } from "react-feather"


const LifeBattles = ({ alternativeProfile }) => {
  const [battles, setBattles] = useState([
    {
      id: 1,
      category: "Kariera",
      realLife: "Programista w korporacji",
      alternativeLife: alternativeProfile.career,
      realVotes: 45,
      alternativeVotes: 78,
      userVoted: null,
    },
    {
      id: 2,
      category: "Relacje",
      realLife: "Związek z długoletnim partnerem",
      alternativeLife:
        alternativeProfile.partner !== "None" ? `Związek z ${alternativeProfile.partner}` : "Życie w samotności",
      realVotes: 67,
      alternativeVotes: 32,
      userVoted: null,
    },
    {
      id: 3,
      category: "Miejsce zamieszkania",
      realLife: "Mieszkanie w mieście",
      alternativeLife: `Życie w ${alternativeProfile.location}`,
      realVotes: 38,
      alternativeVotes: 62,
      userVoted: null,
    },
  ])

  const handleVote = (battleId, isReal) => {
    setBattles(
      battles.map((battle) => {
        if (battle.id === battleId) {
          if (battle.userVoted === (isReal ? "real" : "alternative")) {
            // Unvote
            return {
              ...battle,
              realVotes: isReal ? battle.realVotes - 1 : battle.realVotes,
              alternativeVotes: isReal ? battle.alternativeVotes : battle.alternativeVotes - 1,
              userVoted: null,
            }
          } else if (battle.userVoted === null) {
            // New vote
            return {
              ...battle,
              realVotes: isReal ? battle.realVotes + 1 : battle.realVotes,
              alternativeVotes: isReal ? battle.alternativeVotes : battle.alternativeVotes + 1,
              userVoted: isReal ? "real" : "alternative",
            }
          } else {
            // Change vote
            return {
              ...battle,
              realVotes: isReal ? battle.realVotes + 1 : battle.realVotes - 1,
              alternativeVotes: isReal ? battle.alternativeVotes - 1 : battle.alternativeVotes + 1,
              userVoted: isReal ? "real" : "alternative",
            }
          }
        }
        return battle
      }),
    )
  }

  return (
    <div className="battles-card">
      <div className="battles-header">
        <h2 className="battles-title">Bitwy Życiowe</h2>
        <p className="battles-description">Głosuj, która wersja życia wydaje się lepsza</p>
      </div>
      <div className="battles-content">
        <div className="battle-profiles">
          <div className="profile real">
            <div className="profile-avatar real">TY</div>
            <span>Twoje życie</span>
          </div>
          <span className="versus">VS</span>
          <div className="profile alternative">
            <div className="profile-avatar alternative">{alternativeProfile.name?.charAt(0) || "A"}</div>
            <span>Alternatywne życie</span>
          </div>
        </div>

        <div className="battles-list">
          {battles.map((battle, index) => (
            <motion.div
              key={battle.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="battle-item"
            >
              <h3 className="battle-category">
                <Award size={18} />
                {battle.category}
              </h3>

              <div className="battle-options">
                <div className={`battle-option real ${battle.userVoted === "real" ? "selected" : ""}`}>
                  <p className="option-text">{battle.realLife}</p>
                  <div className="option-actions">
                    <div className="votes">
                      <ThumbsUp size={16} />
                      <span>{battle.realVotes}</span>
                    </div>
                    <button
                      className={`vote-button ${battle.userVoted === "real" ? "voted" : ""}`}
                      onClick={() => handleVote(battle.id, true)}
                    >
                      {battle.userVoted === "real" ? "Zagłosowano" : "Głosuj"}
                    </button>
                  </div>
                </div>

                <div className={`battle-option alternative ${battle.userVoted === "alternative" ? "selected" : ""}`}>
                  <p className="option-text">{battle.alternativeLife}</p>
                  <div className="option-actions">
                    <div className="votes">
                      <ThumbsUp size={16} />
                      <span>{battle.alternativeVotes}</span>
                    </div>
                    <button
                      className={`vote-button ${battle.userVoted === "alternative" ? "voted" : ""}`}
                      onClick={() => handleVote(battle.id, false)}
                    >
                      {battle.userVoted === "alternative" ? "Zagłosowano" : "Głosuj"}
                    </button>
                  </div>
                </div>
              </div>

              <div className="vote-progress">
                <div
                  className="real-progress"
                  style={{
                    width: `${(battle.realVotes / (battle.realVotes + battle.alternativeVotes)) * 100}%`,
                  }}
                />
                <div
                  className="alternative-progress"
                  style={{
                    width: `${(battle.alternativeVotes / (battle.realVotes + battle.alternativeVotes)) * 100}%`,
                  }}
                />
              </div>

              <div className="vote-percentages">
                <span>{Math.round((battle.realVotes / (battle.realVotes + battle.alternativeVotes)) * 100)}%</span>
                <span>
                  {Math.round((battle.alternativeVotes / (battle.realVotes + battle.alternativeVotes)) * 100)}%
                </span>
              </div>
            </motion.div>
          ))}

          <div className="battle-stats">
            <h3 className="stats-title">
              <BarChart2 size={18} />
              Statystyki głosowań
            </h3>
            <div className="stats-info">
              <Users size={18} />
              <span>
                {battles.reduce((sum, battle) => sum + battle.realVotes + battle.alternativeVotes, 0)} głosów oddanych
              </span>
            </div>
            <p className="stats-summary">
              {battles.filter((b) => b.realVotes > b.alternativeVotes).length >
              battles.filter((b) => b.alternativeVotes > b.realVotes).length
                ? "Większość użytkowników preferuje rzeczywiste życie nad alternatywnym."
                : "Większość użytkowników preferuje alternatywne życie nad rzeczywistym."}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LifeBattles
