import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Trophy, Medal, Star, Crown, Flame, Calendar } from 'lucide-react'
import confetti from 'canvas-confetti'

interface BadgeData {
  id: string
  name: string
  icon: React.ComponentType<any>
  emoji: string
  description: string
  requirement: number
  earned: boolean
  color: string
  bgColor: string
}

export default function BadgeBoard() {
  const [streak, setStreak] = useState(0)
  const [lastCheckDate, setLastCheckDate] = useState('')
  const [newlyEarned, setNewlyEarned] = useState<string[]>([])
  const [previousStreak, setPreviousStreak] = useState(0)

  // Load streak data from localStorage
  useEffect(() => {
    const savedStreak = localStorage.getItem('aiStreak')
    const savedDate = localStorage.getItem('lastCheckDate')
    
    if (savedStreak) {
      const streakValue = parseInt(savedStreak)
      setStreak(streakValue)
      setPreviousStreak(streakValue)
    }
    if (savedDate) {
      setLastCheckDate(savedDate)
    }
  }, [])

  // Update streak logic
  useEffect(() => {
    const today = new Date().toDateString()
    const aiBoxState = localStorage.getItem('aiBoxState')
    
    if (aiBoxState) {
      const state = JSON.parse(aiBoxState)
      const lastUsageDate = state.lastUsageDate
      
      // Check if user used AI today
      if (lastUsageDate === today) {
        // Reset streak if used AI today
        if (streak > 0) {
          setStreak(0)
          localStorage.setItem('aiStreak', '0')
        }
      } else if (lastCheckDate !== today) {
        // Increment streak if didn't use AI today
        const newStreak = streak + 1
        setStreak(newStreak)
        localStorage.setItem('aiStreak', newStreak.toString())
        localStorage.setItem('lastCheckDate', today)
        setLastCheckDate(today)
        
        // Check for newly earned badges
        const milestones = [1, 3, 7]
        const newBadges = milestones.filter(milestone => 
          newStreak >= milestone && previousStreak < milestone
        )
        
        if (newBadges.length > 0) {
          setNewlyEarned(newBadges.map(m => m.toString()))
          // Trigger confetti for new badges
          confetti({
            particleCount: 150,
            spread: 100,
            origin: { y: 0.6 },
            colors: ['#FFD700', '#FFA500', '#FF6347', '#32CD32']
          })
        }
        
        setPreviousStreak(newStreak)
      }
    }
  }, [streak, lastCheckDate])

  const badges: BadgeData[] = [
    {
      id: 'offline-learner',
      name: 'Offline Learner',
      icon: Star,
      emoji: '🌱',
      description: 'Không hỏi AI trong 1 ngày',
      requirement: 1,
      earned: streak >= 1,
      color: 'text-green-600 dark:text-green-400',
      bgColor: 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-700'
    },
    {
      id: 'critical-thinker',
      name: 'Critical Thinker', 
      icon: Medal,
      emoji: '🧠',
      description: 'Không hỏi AI trong 3 ngày',
      requirement: 3,
      earned: streak >= 3,
      color: 'text-blue-600 dark:text-blue-400',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-700'
    },
    {
      id: 'ai-fasting',
      name: 'AI-Fasting 7d',
      icon: Crown,
      emoji: '🏆',
      description: 'Không hỏi AI trong 7 ngày',
      requirement: 7,
      earned: streak >= 7,
      color: 'text-yellow-600 dark:text-yellow-400',
      bgColor: 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-700'
    }
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6"
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1 }}
        className="flex items-center justify-between mb-6"
      >
        <div className="flex items-center space-x-3">
          <motion.div
            animate={{
              rotate: [0, 10, -10, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="p-2 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg"
          >
            <Trophy className="text-white" size={24} />
          </motion.div>
          <h2 className="text-xl font-bold text-gray-800 dark:text-white">
            Huy Hiệu Tự Lập
          </h2>
        </div>
        
        <motion.div
          className="flex items-center space-x-2 px-3 py-1 bg-purple-100 dark:bg-purple-900/20 
                     rounded-full text-sm font-medium text-purple-700 dark:text-purple-300"
          animate={streak > 0 ? {
            scale: [1, 1.05, 1],
          } : {}}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <Flame className="text-orange-500" size={16} />
          <span>Streak: {streak} ngày</span>
        </motion.div>
      </motion.div>

      {/* Streak Display */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="mb-8"
      >
        <div className="relative p-6 bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 
                        dark:from-purple-900/20 dark:via-pink-900/20 dark:to-orange-900/20 
                        rounded-xl border border-purple-100 dark:border-purple-800 overflow-hidden">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 -mt-8 -mr-8 w-24 h-24 bg-purple-100 dark:bg-purple-800/20 rounded-full opacity-50" />
          <div className="absolute bottom-0 left-0 -mb-8 -ml-8 w-20 h-20 bg-pink-100 dark:bg-pink-800/20 rounded-full opacity-50" />
          
          <div className="relative z-10 text-center">
            <motion.div
              key={streak}
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-5xl font-bold text-purple-600 dark:text-purple-400 mb-2"
            >
              {streak}
            </motion.div>
            <div className="text-sm text-gray-600 dark:text-gray-300 font-medium">
              ngày không hỏi AI
            </div>
            <div className="flex items-center justify-center space-x-1 mt-2">
              <Calendar size={14} className="text-gray-400" />
              <span className="text-xs text-gray-500 dark:text-gray-400">
                Mục tiêu tiếp theo: {streak < 7 ? (streak < 3 ? 3 : 7) : '∞'} ngày
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Badges */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="space-y-4 mb-6"
      >
        {badges.map((badge, index) => {
          const IconComponent = badge.icon
          return (
            <motion.div
              key={badge.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
              className={`relative overflow-hidden rounded-xl border-2 transition-all duration-300 ${
                badge.earned 
                  ? `${badge.bgColor} shadow-lg` 
                  : 'border-gray-200 bg-gray-50 dark:border-gray-600 dark:bg-gray-700/20'
              }`}
            >
              <motion.div
                className="flex items-center p-4"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {/* Badge Icon */}
                <motion.div
                  className={`relative mr-4 ${badge.earned ? '' : 'grayscale opacity-50'}`}
                  animate={badge.earned ? {
                    rotate: [0, 5, -5, 0],
                  } : {}}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <div className="text-3xl">{badge.emoji}</div>
                  {badge.earned && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full 
                                 flex items-center justify-center"
                    >
                      <IconComponent className="text-white" size={12} />
                    </motion.div>
                  )}
                </motion.div>
                
                {/* Badge Info */}
                <div className="flex-1">
                  <motion.div
                    className={`font-semibold text-lg ${
                      badge.earned 
                        ? badge.color
                        : 'text-gray-600 dark:text-gray-400'
                    }`}
                  >
                    {badge.name}
                  </motion.div>
                  <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    {badge.description}
                  </div>
                  <div className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                    {streak >= badge.requirement 
                      ? `Đạt được ${streak - badge.requirement + 1} ngày trước`
                      : `Còn ${badge.requirement - streak} ngày nữa`
                    }
                  </div>
                </div>

                {/* Earned Indicator */}
                <AnimatePresence>
                  {badge.earned && (
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      exit={{ scale: 0, rotate: 180 }}
                      className="text-green-500 text-2xl"
                    >
                      ✓
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* New Badge Indicator */}
                <AnimatePresence>
                  {newlyEarned.includes(badge.requirement.toString()) && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ 
                        opacity: [1, 0.5, 1], 
                        scale: [1, 1.2, 1],
                        rotate: [0, 360]
                      }}
                      exit={{ opacity: 0, scale: 0 }}
                      transition={{ 
                        duration: 2,
                        repeat: 3,
                        ease: "easeInOut"
                      }}
                      onAnimationComplete={() => {
                        setNewlyEarned(prev => prev.filter(id => id !== badge.requirement.toString()))
                      }}
                      className="absolute top-2 right-2 bg-yellow-400 text-yellow-900 
                                 text-xs font-bold px-2 py-1 rounded-full"
                    >
                      MỚI!
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </motion.div>
          )
        })}
      </motion.div>

      {/* Tip Section */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="p-4 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 
                   rounded-xl border border-blue-100 dark:border-blue-800"
      >
        <div className="flex items-start space-x-3">
          <motion.div
            animate={{
              rotate: [0, 10, -10, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="text-blue-500 mt-1"
          >
            💡
          </motion.div>
          <div>
            <p className="text-sm text-blue-800 dark:text-blue-200 font-medium">
              <strong>Bí quyết thành công:</strong> Càng ít phụ thuộc AI, bạn càng phát triển khả năng tư duy độc lập!
            </p>
            <p className="text-xs text-blue-700 dark:text-blue-300 mt-1">
              Mỗi ngày không dùng AI là một bước tiến lớn! 🚀
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
} 