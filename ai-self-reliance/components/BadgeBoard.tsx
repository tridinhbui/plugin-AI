import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Award, Target, Star, Crown, Trophy } from 'lucide-react'

interface BadgeData {
  id: number
  title: string
  description: string
  icon: React.ComponentType<{ size?: number; className?: string }>
  requirement: number
  color: string
}

const badges: BadgeData[] = [
  {
    id: 1,
    title: "Người mới bắt đầu",
    description: "Đạt streak 1 ngày không dùng AI",
    icon: Target,
    requirement: 1,
    color: "text-green-600"
  },
  {
    id: 2,
    title: "Tự lập cơ bản", 
    description: "Duy trì 3 ngày không phụ thuộc AI",
    icon: Award,
    requirement: 3,
    color: "text-blue-600"
  },
  {
    id: 3,
    title: "Master tự lập",
    description: "Chinh phục 7 ngày streak",
    icon: Crown,
    requirement: 7,
    color: "text-purple-600"
  }
]

const BadgeBoard: React.FC = () => {
  const [streak, setStreak] = useState(0)
  const [earnedBadges, setEarnedBadges] = useState<number[]>([])

  // Load data from localStorage
  useEffect(() => {
    const savedStreak = localStorage.getItem('dailyChallengeStreak') || '0'
    const savedBadges = localStorage.getItem('earnedBadges') || '[]'
    
    setStreak(parseInt(savedStreak))
    setEarnedBadges(JSON.parse(savedBadges))
  }, [])

  // Check for new badges when streak changes
  useEffect(() => {
    const checkForNewBadges = () => {
      const newBadges = badges.filter(badge => 
        streak >= badge.requirement && !earnedBadges.includes(badge.id)
      )
      
      if (newBadges.length > 0) {
        const newBadgeIds = newBadges.map(b => b.id)
        const updatedEarned = [...earnedBadges, ...newBadgeIds]
        setEarnedBadges(updatedEarned)
        localStorage.setItem('earnedBadges', JSON.stringify(updatedEarned))
      }
    }

    if (streak > 0) {
      checkForNewBadges()
    }
  }, [streak, earnedBadges])

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center">
            <Trophy className="text-white" size={20} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-black">Bảng Huy Hiệu</h2>
            <p className="text-sm text-gray-500">Thành tích của bạn</p>
          </div>
        </div>
        
        <div className="text-right">
          <div className="text-lg font-bold text-black">{streak}</div>
          <div className="text-sm text-gray-500">Ngày streak</div>
        </div>
      </div>

      {/* Badges Grid */}
      <div className="space-y-4">
        {badges.map((badge, index) => {
          const IconComponent = badge.icon
          const isEarned = earnedBadges.includes(badge.id)
          const progress = Math.min((streak / badge.requirement) * 100, 100)
          
          return (
            <motion.div
              key={badge.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`p-4 rounded-lg border transition-all ${
                isEarned
                  ? 'border-green-200 bg-green-50'
                  : 'border-gray-200 bg-gray-50'
              }`}
            >
              <div className="flex items-center space-x-4">
                {/* Badge Icon */}
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                  isEarned 
                    ? 'bg-green-600' 
                    : 'bg-gray-300'
                }`}>
                  <IconComponent 
                    className={isEarned ? 'text-white' : 'text-gray-500'} 
                    size={24} 
                  />
                </div>
                
                {/* Badge Info */}
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className={`font-semibold ${
                      isEarned ? 'text-green-800' : 'text-gray-600'
                    }`}>
                      {badge.title}
                    </h3>
                    
                    {isEarned && (
                      <div className="flex items-center space-x-1 text-green-600">
                        <Star size={16} className="fill-current" />
                        <span className="text-sm font-medium">Đạt được</span>
                      </div>
                    )}
                  </div>
                  
                  <p className={`text-sm mb-2 ${
                    isEarned ? 'text-green-700' : 'text-gray-500'
                  }`}>
                    {badge.description}
                  </p>
                  
                  {/* Progress Bar */}
                  {!isEarned && (
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>Tiến độ: {streak}/{badge.requirement}</span>
                        <span>{Math.round(progress)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <motion.div
                          className="bg-gray-600 h-2 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${progress}%` }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Summary */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">
            Đã mở khóa: {earnedBadges.length}/{badges.length} huy hiệu
          </span>
          
          {earnedBadges.length === badges.length ? (
            <span className="text-green-600 font-medium flex items-center space-x-1">
              <Trophy size={16} />
              <span>Hoàn thành!</span>
            </span>
          ) : (
            <span className="text-gray-500">
              Tiếp tục phấn đấu!
            </span>
          )}
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
          <motion.div
            className="bg-black h-2 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${(earnedBadges.length / badges.length) * 100}%` }}
            transition={{ duration: 0.8 }}
          />
        </div>
      </div>
    </div>
  )
}

export default BadgeBoard 