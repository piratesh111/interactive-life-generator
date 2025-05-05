"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { MessageSquare, Heart, Share2, Filter, Search, TrendingUp } from "react-feather"


const Community = () => {
  const [activeTab, setActiveTab] = useState("popular")
  const [searchQuery, setSearchQuery] = useState("")

  const communityPosts = [
    {
      id: 1,
      user: {
        name: "Marta K.",
        avatar: "https://via.placeholder.com/40",
      },
      title: "Moje życie jako samuraj w feudalnej Japonii",
      description:
        "Odkryłam, że w alternatywnej rzeczywistości byłabym samurajem w feudalnej Japonii. Niesamowite doświadczenie!",
      likes: 128,
      comments: 32,
      tags: ["Japonia", "Samuraj", "Historia"],
    },
    {
      id: 2,
      user: {
        name: "Tomasz W.",
        avatar: "https://via.placeholder.com/40",
      },
      title: "Astronauta na Marsie w 2150 roku",
      description:
        "Moja alternatywna wersja żyje w przyszłości jako jeden z pierwszych kolonizatorów Marsa. Fascynujące porównanie z moim obecnym życiem!",
      likes: 95,
      comments: 18,
      tags: ["Przyszłość", "Mars", "Kosmos"],
    },
    {
      id: 3,
      user: {
        name: "Anna M.",
        avatar: "https://via.placeholder.com/40",
      },
      title: "Królowa Egiptu w starożytności",
      description:
        "Wyobraźcie sobie - w alternatywnej rzeczywistości byłabym królową starożytnego Egiptu! Porównałam swoje obecne życie z tym pełnym władzy i bogactwa.",
      likes: 156,
      comments: 42,
      tags: ["Egipt", "Starożytność", "Władza"],
    },
    {
      id: 4,
      user: {
        name: "Michał P.",
        avatar: "https://via.placeholder.com/40",
      },
      title: "Średniowieczny mnich w klasztorze",
      description:
        "Moja alternatywna wersja to mnich przepisujący księgi w średniowiecznym klasztorze. Spokojne, kontemplacyjne życie w porównaniu z moim obecnym.",
      likes: 67,
      comments: 15,
      tags: ["Średniowiecze", "Religia", "Spokój"],
    },
  ]

  const filteredPosts = communityPosts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  const sortedPosts = [...filteredPosts].sort((a, b) => {
    if (activeTab === "popular") {
      return b.likes - a.likes
    } else if (activeTab === "recent") {
      return b.id - a.id
    } else {
      return b.comments - a.comments
    }
  })

  return (
    <div className="community-card">
      <div className="community-header">
        <h2 className="community-title">Społeczność</h2>
        <p className="community-description">Odkryj alternatywne wersje innych użytkowników</p>

        <div className="search-container">
          <div className="search-input">
            <Search className="search-icon" />
            <input
              type="text"
              placeholder="Szukaj alternatywnych wersji..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button className="filter-button">
            <Filter size={16} />
            <span>Filtry</span>
          </button>
        </div>

        <div className="tabs">
          <button className={`tab ${activeTab === "popular" ? "active" : ""}`} onClick={() => setActiveTab("popular")}>
            <Heart size={16} />
            <span>Popularne</span>
          </button>
          <button className={`tab ${activeTab === "recent" ? "active" : ""}`} onClick={() => setActiveTab("recent")}>
            <TrendingUp size={16} />
            <span>Najnowsze</span>
          </button>
          <button
            className={`tab ${activeTab === "discussed" ? "active" : ""}`}
            onClick={() => setActiveTab("discussed")}
          >
            <MessageSquare size={16} />
            <span>Dyskutowane</span>
          </button>
        </div>
      </div>

      <div className="community-content">
        <div className="posts">
          {sortedPosts.length > 0 ? (
            sortedPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="post"
              >
                <div className="post-author">
                  <div className="author-avatar">
                    <img src={post.user.avatar || "/placeholder.svg"} alt={post.user.name} />
                  </div>
                  <div className="author-info">
                    <p className="author-name">{post.user.name}</p>
                    <p className="post-date">Opublikowano 3 dni temu</p>
                  </div>
                </div>

                <h3 className="post-title">{post.title}</h3>
                <p className="post-description">{post.description}</p>

                <div className="post-tags">
                  {post.tags.map((tag, i) => (
                    <span key={i} className="tag">
                      #{tag}
                    </span>
                  ))}
                </div>

                <div className="post-actions">
                  <button className="action-button">
                    <Heart size={16} />
                    <span>{post.likes}</span>
                  </button>
                  <button className="action-button">
                    <MessageSquare size={16} />
                    <span>{post.comments}</span>
                  </button>
                  <button className="action-button share">
                    <Share2 size={16} />
                    <span>Udostępnij</span>
                  </button>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="no-results">
              <p>Nie znaleziono postów pasujących do wyszukiwania</p>
            </div>
          )}

          <div className="load-more">
            <button className="load-more-button">Załaduj więcej</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Community
