import React from 'react'
import { motion } from 'framer-motion'
import { Calendar, Target, RefreshCw, Lightbulb } from 'lucide-react'

export default function DailyChallenge() {
  const tips = [
    "🔍 Thử Google với từ khóa tiếng Anh để có kết quả tốt hơn",
    "📚 Đọc documentation chính thức trước khi hỏi AI",
    "🤔 Phân tích vấn đề thành các phần nhỏ trước khi tìm giải pháp",
    "💡 Brainstorm 3 cách giải quyết khác nhau trước khi chọn",
    "🔨 Thử implement một phiên bản đơn giản trước",
    "📝 Viết ra những gì bạn đã biết về vấn đề",
    "🎯 Xác định rõ mục tiêu cuối cùng bạn muốn đạt được",
    "🧩 Chia nhỏ bài toán phức tạp thành các bước cơ bản",
    "🔄 Xem lại code cũ để tìm pattern tương tự",
    "🗣️ Giải thích vấn đề cho người khác (rubber duck debugging)"
  ]

  const today = new Date()
  const dayIndex = today.getDate() % tips.length
  const todayTip = tips[dayIndex]

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
              rotate: [0, 5, -5, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="p-2 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-lg"
          >
            <Target className="text-white" size={24} />
          </motion.div>
          <h2 className="text-xl font-bold text-gray-800 dark:text-white">
            Thử Thách Hôm Nay
          </h2>
        </div>

        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="text-blue-500 dark:text-blue-400"
        >
          <RefreshCw size={20} />
        </motion.div>
      </motion.div>

      {/* Main Tip */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 
                   dark:from-blue-900/20 dark:via-indigo-900/20 dark:to-purple-900/20 
                   rounded-xl p-6 mb-6 border border-blue-100 dark:border-blue-800"
      >
        {/* Background decoration */}
        <div className="absolute top-0 right-0 -mt-4 -mr-4 w-20 h-20 bg-blue-100 dark:bg-blue-800/20 rounded-full opacity-50" />
        <div className="absolute bottom-0 left-0 -mb-4 -ml-4 w-16 h-16 bg-purple-100 dark:bg-purple-800/20 rounded-full opacity-50" />
        
        <div className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex items-start space-x-3 mb-4"
          >
            <motion.div
              animate={{
                bounce: [0, -5, 0],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Lightbulb className="text-yellow-500" size={24} />
            </motion.div>
            <p className="text-gray-700 dark:text-gray-300 font-medium text-lg leading-relaxed">
              {todayTip}
            </p>
          </motion.div>
        </div>
      </motion.div>

      {/* Info Section */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="flex justify-between items-center mb-4"
      >
        <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
          <Calendar size={16} />
          <span>Ngày {today.getDate()}/{today.getMonth() + 1}</span>
        </div>
        
        <div className="flex items-center space-x-2">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Tip #{dayIndex + 1}/10
          </div>
          <div className="flex space-x-1">
            {Array.from({ length: 10 }, (_, i) => (
              <motion.div
                key={i}
                className={`w-2 h-2 rounded-full ${
                  i === dayIndex 
                    ? 'bg-blue-500' 
                    : i < dayIndex 
                    ? 'bg-blue-300' 
                    : 'bg-gray-200 dark:bg-gray-600'
                }`}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5 + i * 0.05 }}
              />
            ))}
          </div>
        </div>
      </motion.div>

      {/* Goal Section */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="relative p-4 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 
                   rounded-xl border-l-4 border-yellow-400"
      >
        <div className="flex items-start space-x-3">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="text-yellow-500 mt-1"
          >
            🎯
          </motion.div>
          <div>
            <p className="text-sm text-yellow-800 dark:text-yellow-200 font-medium">
              <strong>Mục tiêu hôm nay:</strong> Hãy thử áp dụng tip này ít nhất 1 lần!
            </p>
            <p className="text-xs text-yellow-700 dark:text-yellow-300 mt-1">
              Mỗi lần thực hành sẽ giúp bạn trở nên độc lập hơn 💪
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
} 