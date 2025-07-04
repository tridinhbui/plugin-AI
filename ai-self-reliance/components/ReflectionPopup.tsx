import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Lightbulb, Search, FileText, Layers, Code, X } from 'lucide-react'

interface ReflectionPopupProps {
  visible: boolean
  setVisible: (visible: boolean) => void
}

export default function ReflectionPopup({ visible, setVisible }: ReflectionPopupProps) {
  if (!visible) return null

  const reflectionQuestions = [
    "🤔 Bạn đã thử Google vấn đề này chưa?",
    "📚 Có tài liệu nào bạn có thể tham khảo không?",
    "🔍 Bạn có thể chia nhỏ vấn đề thành các phần đơn giản hơn?",
    "💡 Có cách nào khác để tiếp cận vấn đề này?",
    "🧠 Bạn đã suy nghĩ về vấn đề này trong bao lâu?",
    "📝 Hãy viết ra những gì bạn đã biết về vấn đề này?"
  ]

  const randomQuestion = reflectionQuestions[Math.floor(Math.random() * reflectionQuestions.length)]

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-40 p-4"
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0, y: 50 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.8, opacity: 0, y: 50 }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-lg w-full mx-4 overflow-hidden"
        >
          {/* Header */}
          <div className="relative p-6 bg-gradient-to-br from-purple-500 via-blue-500 to-indigo-600 text-white">
            <motion.button
              onClick={() => setVisible(false)}
              className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-full transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <X size={20} />
            </motion.button>

            <div className="text-center">
              <motion.div
                animate={{
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="text-6xl mb-4"
              >
                💭
              </motion.div>
              <motion.h3
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-2xl font-bold mb-2"
              >
                Dừng lại và suy nghĩ!
              </motion.h3>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-blue-100 text-sm"
              >
                Trước khi hỏi AI, hãy thử tự giải quyết vấn đề nhé!
              </motion.p>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            {/* Random Question */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="relative mb-6 p-4 bg-gradient-to-br from-blue-50 to-indigo-50 
                         dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl border border-blue-200 dark:border-blue-700"
            >
              <div className="absolute top-2 right-2">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                >
                  <Lightbulb className="text-yellow-500" size={20} />
                </motion.div>
              </div>
              <p className="text-blue-800 dark:text-blue-200 font-medium text-center pr-8">
                {randomQuestion}
              </p>
            </motion.div>

            {/* Action Steps */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="space-y-4 mb-6"
            >
              {[
                { icon: Search, text: "Thử tìm kiếm trên Google hoặc Stack Overflow", color: "text-green-500" },
                { icon: FileText, text: "Đọc documentation chính thức", color: "text-blue-500" },
                { icon: Layers, text: "Chia nhỏ vấn đề thành các bước đơn giản", color: "text-purple-500" },
                { icon: Code, text: "Thử implement một phiên bản đơn giản", color: "text-orange-500" }
              ].map((step, index) => {
                const IconComponent = step.icon
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                  >
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                      className={`${step.color} mt-1`}
                    >
                      <IconComponent size={20} />
                    </motion.div>
                    <div className="text-sm text-gray-600 dark:text-gray-300 font-medium">
                      {step.text}
                    </div>
                  </motion.div>
                )
              })}
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="flex flex-col sm:flex-row gap-3"
            >
              <motion.button
                onClick={() => setVisible(false)}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 
                           hover:from-blue-600 hover:to-purple-700 text-white rounded-xl 
                           font-medium transition-all duration-300 shadow-lg hover:shadow-xl
                           flex items-center justify-center space-x-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span>Tôi sẽ tự thử!</span>
                <span>💪</span>
              </motion.button>
              
              <motion.button
                onClick={() => setVisible(false)}
                className="px-6 py-3 bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 
                           dark:hover:bg-gray-500 text-gray-700 dark:text-gray-300 
                           rounded-xl font-medium transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Đóng
              </motion.button>
            </motion.div>

            {/* Motivation Text */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1 }}
              className="mt-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 
                         dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl 
                         border border-green-200 dark:border-green-700"
            >
              <div className="flex items-center space-x-2">
                <motion.div
                  animate={{
                    rotate: [0, 15, -15, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="text-green-500"
                >
                  🚀
                </motion.div>
                <p className="text-sm text-green-800 dark:text-green-200 font-medium">
                  <strong>Nhớ rằng:</strong> Mỗi lần tự giải quyết vấn đề, bạn sẽ trở nên mạnh mẽ hơn!
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
} 