import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Clock, AlertTriangle, Coffee, BookOpen, Users, Search } from 'lucide-react'

interface CooldownModalProps {
  visible: boolean
  onClose: () => void
  dailyUsage: number
  dailyLimit: number
  remainingTime?: number
}

const CooldownModal: React.FC<CooldownModalProps> = ({ 
  visible, 
  onClose, 
  dailyUsage, 
  dailyLimit, 
  remainingTime = 0 
}) => {
  const isExhausted = dailyUsage >= dailyLimit
  const isOnCooldown = remainingTime > 0 && dailyUsage < dailyLimit

  return (
    <AnimatePresence>
      {visible && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div className="flex items-center space-x-3">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                  isExhausted ? 'bg-red-100' : 'bg-orange-100'
                }`}>
                  {isExhausted ? (
                    <AlertTriangle className="text-red-600" size={24} />
                  ) : (
                    <Clock className="text-orange-600" size={24} />
                  )}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">
                    {isExhausted ? 'Đã hết lượt hỏi' : 'Đang trong thời gian chờ'}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {isExhausted ? 'Hãy quay lại vào ngày mai' : 'Vui lòng chờ một chút'}
                  </p>
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
              {/* Illustration */}
              <div className="text-center mb-6">
                <div className="text-6xl mb-4">
                  {isExhausted ? '🚫' : '⏳'}
                </div>
                
                <h2 className="text-2xl font-bold text-gray-900 mb-3">
                  {isExhausted 
                    ? `Bạn đã sử dụng hết ${dailyLimit} câu hỏi hôm nay!`
                    : 'Hãy chờ một chút để tiếp tục'
                  }
                </h2>
                
                <p className="text-gray-600 leading-relaxed">
                  {isExhausted 
                    ? 'Đây là cơ hội tuyệt vời để phát triển khả năng tự giải quyết vấn đề của bạn.'
                    : 'Thời gian chờ giúp bạn suy nghĩ kỹ hơn trước khi đặt câu hỏi tiếp theo.'
                  }
                </p>
              </div>

              {/* Cooldown Timer */}
              {isOnCooldown && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mb-6 p-4 bg-orange-50 border border-orange-200 rounded-xl"
                >
                  <div className="flex items-center justify-center space-x-3">
                    <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                      <Clock className="text-orange-600" size={20} />
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-orange-700">
                        {Math.ceil(remainingTime)}
                      </div>
                      <div className="text-sm text-orange-600">phút còn lại</div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Usage Counter */}
              <div className="mb-6 p-4 bg-gray-50 border border-gray-200 rounded-xl">
                <div className="text-sm font-medium text-gray-700 mb-3 text-center">
                  Số lượt đã sử dụng hôm nay
                </div>
                <div className="flex items-center justify-center space-x-2 mb-3">
                  {Array.from({ length: dailyLimit }, (_, i) => (
                    <motion.div
                      key={i}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: i * 0.1 }}
                      className={`w-4 h-4 rounded-full transition-colors duration-300 ${
                        i < dailyUsage ? 'bg-red-500' : 'bg-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <div className="text-center text-sm text-gray-600">
                  <span className="font-semibold text-gray-900">{dailyUsage}</span>
                  /{dailyLimit} lượt đã sử dụng
                </div>
              </div>

              {/* Tips */}
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 mb-6">
                <h4 className="font-semibold text-blue-800 mb-4 flex items-center">
                  <BookOpen size={18} className="mr-2" />
                  💡 Các cách thay thế hiệu quả:
                </h4>
                <div className="grid grid-cols-1 gap-3">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Search size={16} className="text-blue-600" />
                    </div>
                    <div>
                      <div className="font-medium text-blue-800 text-sm">Tìm kiếm thông minh</div>
                      <div className="text-blue-700 text-xs">Google với từ khóa cụ thể và rõ ràng</div>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <BookOpen size={16} className="text-blue-600" />
                    </div>
                    <div>
                      <div className="font-medium text-blue-800 text-sm">Đọc tài liệu</div>
                      <div className="text-blue-700 text-xs">Tài liệu chính thức và hướng dẫn có sẵn</div>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Users size={16} className="text-blue-600" />
                    </div>
                    <div>
                      <div className="font-medium text-blue-800 text-sm">Thảo luận</div>
                      <div className="text-blue-700 text-xs">Hỏi đồng nghiệp hoặc cộng đồng developer</div>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Coffee size={16} className="text-blue-600" />
                    </div>
                    <div>
                      <div className="font-medium text-blue-800 text-sm">Nghỉ ngơi</div>
                      <div className="text-blue-700 text-xs">Đôi khi giải pháp đến khi bạn nghỉ ngơi</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Motivation Quote */}
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-xl p-4 mb-6">
                <div className="text-center">
                  <div className="text-3xl mb-2">🧠</div>
                  <blockquote className="text-purple-800 font-medium text-sm italic">
                    &ldquo;Tôi không thất bại. Tôi chỉ tìm ra 10,000 cách không hoạt động.&rdquo;
                  </blockquote>
                  <cite className="text-purple-600 text-xs mt-1 block">- Thomas Edison</cite>
                </div>
              </div>

              {/* Action Button */}
              <motion.button
                onClick={onClose}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gray-900 text-white py-4 px-6 rounded-xl font-semibold hover:bg-gray-800 transition-all duration-200 shadow-lg"
              >
                {isExhausted ? 'Tôi sẽ tự giải quyết!' : 'Tôi hiểu rồi'}
              </motion.button>
            </div>

            {/* Footer Message */}
            <div className="px-6 pb-6">
              <div className="text-center text-sm text-gray-500 bg-gray-50 py-3 rounded-xl border">
                {isExhausted ? (
                  <span>🌅 Số lượt sẽ được reset vào lúc 00:00 ngày mai</span>
                ) : (
                  <span>⏱️ Hãy sử dụng thời gian này để suy nghĩ sâu hơn</span>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

export default CooldownModal 