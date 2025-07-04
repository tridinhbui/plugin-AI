import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Brain, Clock, Star } from 'lucide-react'

const DailyChallenge: React.FC = () => {
  const [currentChallenge, setCurrentChallenge] = useState(0)
  const [isCompleted, setIsCompleted] = useState(false)
  const [streak, setStreak] = useState(0)

  const challenges = [
    "Thử giải một bài toán mà bạn thường hỏi AI",
    "Tìm hiểu một chủ đề mới mà không dùng AI trong 30 phút",
    "Viết code một tính năng đơn giản mà không tra cứu AI",
    "Đọc tài liệu gốc thay vì hỏi AI tóm tắt",
    "Nghĩ ra 5 giải pháp cho một vấn đề trước khi hỏi AI",
    "Sử dụng sách giáo khoa thay vì chatbot để học",
    "Thử debug code mà không dùng AI suggest"
  ]

  useEffect(() => {
    const today = new Date().toDateString()
    const savedDate = localStorage.getItem('dailyChallengeDate')
    const savedIndex = localStorage.getItem('dailyChallengeIndex')
    const savedStreak = localStorage.getItem('dailyChallengeStreak')
    const savedCompleted = localStorage.getItem('dailyChallengeCompleted')

    if (savedDate === today) {
      setCurrentChallenge(parseInt(savedIndex || '0'))
      setIsCompleted(savedCompleted === 'true')
    } else {
      const newIndex = Math.floor(Math.random() * challenges.length)
      setCurrentChallenge(newIndex)
      setIsCompleted(false)
      localStorage.setItem('dailyChallengeDate', today)
      localStorage.setItem('dailyChallengeIndex', newIndex.toString())
      localStorage.setItem('dailyChallengeCompleted', 'false')
    }

    setStreak(parseInt(savedStreak || '0'))
  }, [challenges.length])

  const completeChallenge = () => {
    const newCompleted = !isCompleted
    setIsCompleted(newCompleted)
    localStorage.setItem('dailyChallengeCompleted', newCompleted.toString())

    if (newCompleted) {
      const newStreak = streak + 1
      setStreak(newStreak)
      localStorage.setItem('dailyChallengeStreak', newStreak.toString())
    }
  }

  const getCurrentDayOfWeek = () => {
    const days = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy']
    return days[new Date().getDay()]
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center">
            <Brain className="text-white" size={20} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-black">Thử Thách Hôm Nay</h2>
            <p className="text-sm text-gray-500">{getCurrentDayOfWeek()}</p>
          </div>
        </div>

        <div className="text-right">
          <div className="flex items-center space-x-1 text-black font-semibold">
            <Star size={16} className="text-yellow-500" />
            <span>{streak}</span>
          </div>
          <p className="text-xs text-gray-500">Streak</p>
        </div>
      </div>

      {/* Challenge Content */}
      <div className="mb-6">
        <div className="bg-gray-50 rounded-lg p-4 border">
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center flex-shrink-0 mt-1">
              <Clock className="text-white" size={16} />
            </div>
            <div className="flex-1">
              <p className="text-gray-800 font-medium leading-relaxed">
                {challenges[currentChallenge]}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Action Button */}
      <div className="space-y-3">
        <motion.button
          onClick={completeChallenge}
          className={`w-full py-3 px-4 rounded-lg font-medium transition-all ${
            isCompleted
              ? 'bg-green-50 text-green-700 border border-green-200'
              : 'bg-black text-white hover:bg-gray-800'
          }`}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {isCompleted ? (
            <div className="flex items-center justify-center space-x-2">
              <Star className="text-green-600" size={16} />
              <span>Đã hoàn thành!</span>
            </div>
          ) : (
            'Đánh dấu hoàn thành'
          )}
        </motion.button>

        {isCompleted && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center text-sm text-gray-600 bg-green-50 py-2 rounded border border-green-200"
          >
            🎉 Tuyệt vời! Bạn đang phát triển tư duy độc lập!
          </motion.div>
        )}
      </div>

      {/* Progress Indicator */}
      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="flex items-center justify-between text-sm text-gray-500">
          <span>Tiến độ hôm nay</span>
          <span>{isCompleted ? '100%' : '0%'}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
          <motion.div
            className="bg-black h-2 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: isCompleted ? '100%' : '0%' }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>
    </motion.div>
  )
}

export default DailyChallenge 