"use client"
import { motion } from "framer-motion"
import { MapPin, Calendar, Briefcase, Heart, Award, Star, Activity,  } from "react-feather"


const AlternativeProfile = ({ profile }) => {
  const getAvatarImage = () => {
    if (profile.era === "ancient" || profile.era === "medieval") {
      return "https://via.placeholder.com/100"
    } else if (profile.location === "Japan") {
      return "https://via.placeholder.com/100"
    } else {
      return "https://via.placeholder.com/100"
    }
  }

  const getStatusColor = () => {
    switch (profile.socialStatus) {
      case "High":
        return "status-high"
      case "Middle":
        return "status-middle"
      case "Low":
        return "status-low"
      default:
        return "status-default"
    }
  }

  return (
    <div className="profile-card">
      <div className="profile-header">
        <h2 className="profile-title">Twoja Alternatywna Wersja</h2>
        <p className="profile-description">Oto kim byłbyś/byłabyś w równoległym świecie</p>
      </div>

      <div className="profile-content">
        <div className="profile-main">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="avatar-container"
          >
            <div className="avatar">
              <img src={getAvatarImage() || "/placeholder.svg"} alt={profile.name} />
              <div className={`status-indicator ${getStatusColor()}`} />
            </div>
          </motion.div>

          <div className="profile-info">
            <h2 className="profile-name">{profile.name}</h2>

            <div className="profile-traits">
              {profile.traits.map((trait, index) => (
                <span key={index} className="trait-badge">
                  {trait}
                </span>
              ))}
            </div>

            <div className="profile-details">
              <ProfileItem icon={<MapPin size={18} />} label="Lokalizacja" value={profile.location} />
              <ProfileItem icon={<Calendar size={18} />} label="Epoka" value={profile.era} />
              <ProfileItem icon={<Briefcase size={18} />} label="Zawód" value={profile.career} />
              
              <ProfileItem icon={<Heart size={18} />} label="Partner" value={profile.partner} />
              
              <ProfileItem
                icon={<Activity size={18} />}
                label="Długość życia"
                value={`${profile.lifeExpectancy} lat`}
              />
              <ProfileItem
                icon={<Award size={18} />}
                label="Osiągnięcia"
                value={`${profile.achievements} znaczących`}
              />
            </div>
          </div>
        </div>

        <div className="life-story">
          <h3 className="story-title">
            <Star size={18} />
            Historia życia
          </h3>
          <p className="story-text">
            W alternatywnej rzeczywistości, {profile.name} urodził się w {profile.location} w epoce {profile.era}. Jako{" "}
            {profile.traits[0].toLowerCase()} i {profile.traits[1].toLowerCase()} osoba,
            {profile.name} zdobył pozycję {profile.career.toLowerCase()} i osiągnął {profile.socialStatus.toLowerCase()}{" "}
            status społeczny.
            {profile.partner !== "None" ? ` Związał się z ${profile.partner},` : ""}
            {profile.rival !== "None" ? ` a jego głównym rywalem był ${profile.rival}.` : ""}
            Jego życie trwało {profile.lifeExpectancy} lat, w trakcie których dokonał {profile.achievements} znaczących
            osiągnięć.
          </p>
        </div>
      </div>
    </div>
  )
}

const ProfileItem = ({ icon, label, value }) => {
  return (
    <div className="profile-item">
      <div className="item-icon">{icon}</div>
      <div className="item-content">
        <p className="item-label">{label}</p>
        <p className="item-value">{value}</p>
      </div>
    </div>
  )
}

export default AlternativeProfile
