import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Lightbulb, Search, FileText, Code, X, ArrowRight, Brain } from 'lucide-react'

interface ReflectionPopupProps {
  visible: boolean
  onClose: () => void
  onContinue: () => void
  questionLength: number
}

const ReflectionPopup: React.FC<ReflectionPopupProps> = ({ 
  visible, 
  onClose, 
  onContinue,
  questionLength 
}) => {
  const reflectionQuestions = [
    "🤔 Bạn đã thử Google vấn đề này chưa?",
    "📚 Có tài liệu nào bạn có thể tham khảo không?",
    "🔍 Bạn có thể chia nhỏ vấn đề thành các phần đơn giản hơn?",
    "💡 Có cách nào khác để tiếp cận vấn đề này?",
    "🧠 Bạn đã suy nghĩ về vấn đề này trong bao lâu?",
    "📝 Hãy viết ra những gì bạn đã biết về vấn đề này?",
    "🔨 Bạn có thể thử nghiệm một cách tiếp cận khác?",
    "👥 Có ai trong team có thể giúp bạn không?"
  ]

  const randomQuestion = reflectionQuestions[Math.floor(Math.random() * reflectionQuestions.length)]

  return (
    <AnimatePresence>
      {visible && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-yellow-100 to-orange-100 rounded-xl flex items-center justify-center">
                  <Lightbulb className="text-yellow-600" size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Dừng lại và suy nghĩ!</h3>
                  <p className="text-sm text-gray-600">Hãy thử tự giải quyết trước</p>
                </div>
              </div>
              
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 p-2 rounded-lg transition-all duration-200"
              >
                <X size={20} />
              </button>
            </div>

            {/* Content */}
            <div className="p-6">
              <div className="text-center mb-6">
                <div className="text-6xl mb-4">💭</div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">
                  Câu hỏi khá dài!
                </h4>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Câu hỏi dài <span className="font-semibold text-gray-900">({questionLength} ký tự)</span> cho thấy 
                  bạn có đủ hiểu biết để tự giải quyết vấn đề này!
                </p>
              </div>

              {/* Random Reflection Question */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl"
              >
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Brain className="text-blue-600" size={16} />
                  </div>
                  <h5 className="font-semibold text-blue-800">Hãy tự hỏi mình:</h5>
                </div>
                <p className="text-blue-800 font-medium text-center text-lg">
                  {randomQuestion}
                </p>
              </motion.div>

              {/* Action Steps */}
              <div className="space-y-3 mb-6">
                <h5 className="font-semibold text-gray-800 mb-3 flex items-center">
                  <ArrowRight className="mr-2" size={16} />
                  Các bước thử trước khi hỏi AI:
                </h5>
                {[
                  { 
                    icon: Search, 
                    text: "Tìm kiếm trên Google, Stack Overflow hoặc documentation",
                    tip: "Sử dụng từ khóa cụ thể và mô tả lỗi chính xác"
                  },
                  { 
                    icon: FileText, 
                    text: "Đọc tài liệu chính thức của framework/library",
                    tip: "Thường có ví dụ và best practices hữu ích"
                  },
                  { 
                    icon: Code, 
                    text: "Thử implement một phiên bản đơn giản để test",
                    tip: "Debug từng bước nhỏ sẽ giúp tìm ra vấn đề"
                  }
                ].map((step, index) => {
                  const IconComponent = step.icon
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      className="flex items-start space-x-3 p-4 bg-gray-50 rounded-xl border border-gray-200 hover:bg-gray-100 transition-colors duration-200"
                    >
                      <div className="w-8 h-8 bg-gray-200 rounded-lg flex items-center justify-center flex-shrink-0">
                        <IconComponent className="text-gray-600" size={16} />
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-medium text-gray-800 mb-1">
                          {step.text}
                        </div>
                        <div className="text-xs text-gray-600">
                          {step.tip}
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
              </div>

              {/* Statistics */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="mb-6 p-4 bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-xl"
              >
                <div className="text-center">
                  <div className="text-3xl mb-2">📊</div>
                  <h5 className="font-semibold text-purple-800 mb-2">Thống kê thú vị</h5>
                  <p className="text-sm text-purple-700">
                    <strong>85%</strong> các câu hỏi dài có thể được giải quyết bằng cách 
                    tìm kiếm thông minh và đọc documentation kỹ lưỡng!
                  </p>
                </div>
              </motion.div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <motion.button
                  onClick={onClose}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 bg-gray-900 text-white py-4 px-6 rounded-xl font-semibold hover:bg-gray-800 transition-all duration-200 shadow-lg flex items-center justify-center space-x-2"
                >
                  <span>Tôi sẽ tự thử!</span>
                  <span>💪</span>
                </motion.button>
                
                <motion.button
                  onClick={onContinue}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="sm:flex-1 px-6 py-4 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-all duration-200 border border-gray-300"
                >
                  Vẫn muốn hỏi AI
                </motion.button>
              </div>

              {/* Motivation */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="mt-6 p-4 bg-green-50 border border-green-200 rounded-xl"
              >
                <div className="text-center">
                  <div className="text-2xl mb-2">🌟</div>
                  <p className="text-sm text-green-800">
                    <strong>Ghi nhớ:</strong> Mỗi lần tự giải quyết vấn đề, bạn sẽ trở nên 
                    mạnh mẽ và tự tin hơn trong công việc!
                  </p>
                </div>
              </motion.div>

              {/* Progress Hint */}
              <div className="mt-4 text-center">
                <p className="text-xs text-gray-500">
                  Việc tự nghiên cứu giúp phát triển kỹ năng problem-solving và critical thinking
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

export default ReflectionPopup 