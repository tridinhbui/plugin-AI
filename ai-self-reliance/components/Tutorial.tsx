import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { BookOpen, Target, Trophy, Brain, Zap, ArrowRight, X } from 'lucide-react'

interface TutorialProps {
  visible: boolean
  onClose: () => void
}

const steps = [
  {
    id: 1,
    icon: BookOpen,
    title: "Chào mừng đến với AI Self-Reliance!",
    description: "Ứng dụng giúp bạn giảm phụ thuộc vào AI và phát triển tư duy độc lập.",
    color: "bg-blue-500",
    details: "Hệ thống sẽ theo dõi và khuyến khích bạn tự giải quyết vấn đề trước khi hỏi AI."
  },
  {
    id: 2,
    icon: Target,
    title: "Thử Thách Hằng Ngày",
    description: "Mỗi ngày một tip mới để cải thiện kỹ năng tự học.",
    color: "bg-green-500",
    details: "10 tips xoay vòng theo ngày, giúp bạn phát triển thói quen học tập tích cực."
  },
  {
    id: 3,
    icon: Brain,
    title: "AI Assistant có Giới Hạn",
    description: "Chỉ 3 lần hỏi AI, sau đó 30 giây cooldown.",
    color: "bg-orange-500",
    details: "Hệ thống khuyến khích bạn suy nghĩ kỹ trước khi hỏi và tự giải quyết vấn đề."
  },
  {
    id: 4,
    icon: Zap,
    title: "Reflection Popup",
    description: "Khi gõ >50 ký tự, popup nhắc nhở tự suy nghĩ.",
    color: "bg-purple-500",
    details: "Gợi ý các cách tiếp cận khác nhau trước khi dựa vào AI."
  },
  {
    id: 5,
    icon: Trophy,
    title: "Huy Hiệu & Streak",
    description: "Tích lũy streak và nhận huy hiệu khi không dùng AI.",
    color: "bg-yellow-500",
    details: "3 cấp độ: Offline Learner (1 ngày), Critical Thinker (3 ngày), AI-Fasting (7 ngày)."
  }
]

export default function Tutorial({ visible, onClose }: TutorialProps) {
  const [currentStep, setCurrentStep] = useState(0)

  if (!visible) return null

  const currentStepData = steps[currentStep]
  const Icon = currentStepData.icon

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      onClose()
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden"
        >
          {/* Header */}
          <div className="relative p-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-full transition-colors"
            >
              <X size={20} />
            </button>
            
            <div className="flex items-center space-x-4">
              <motion.div
                key={currentStep}
                initial={{ scale: 0.5, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                className={`p-3 rounded-full ${currentStepData.color} bg-white/20`}
              >
                <Icon size={32} />
              </motion.div>
              
              <div>
                <motion.h2
                  key={currentStep}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  className="text-2xl font-bold"
                >
                  {currentStepData.title}
                </motion.h2>
                
                <div className="flex items-center space-x-2 mt-2">
                  {steps.map((_, index) => (
                    <div
                      key={index}
                      className={`h-2 w-8 rounded-full transition-all duration-300 ${
                        index === currentStep
                          ? 'bg-white'
                          : index < currentStep
                          ? 'bg-white/70'
                          : 'bg-white/30'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            <motion.div
              key={currentStep}
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
                {currentStepData.description}
              </p>
              
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-6">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {currentStepData.details}
                </p>
              </div>

              {/* Special content for specific steps */}
              {currentStep === 2 && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">3</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Lần hỏi/chu kỳ</div>
                  </div>
                  <div className="text-center p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                    <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">30s</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Thời gian cooldown</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <div className="text-2xl font-bold text-green-600 dark:text-green-400">∞</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Tự giải quyết</div>
                  </div>
                </div>
              )}

              {currentStep === 4 && (
                <div className="space-y-3 mb-6">
                  <div className="flex items-center space-x-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-sm">Offline Learner - 1 ngày không AI</span>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span className="text-sm">Critical Thinker - 3 ngày không AI</span>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <span className="text-sm">AI-Fasting 7d - 7 ngày không AI</span>
                  </div>
                </div>
              )}
            </motion.div>
          </div>

          {/* Footer */}
          <div className="px-6 pb-6 flex justify-between items-center">
            <button
              onClick={prevStep}
              disabled={currentStep === 0}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                currentStep === 0
                  ? 'bg-gray-100 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 text-gray-700 dark:text-gray-300'
              }`}
            >
              Quay lại
            </button>

            <span className="text-sm text-gray-500 dark:text-gray-400">
              {currentStep + 1} / {steps.length}
            </span>

            <button
              onClick={nextStep}
              className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 
                         hover:from-blue-600 hover:to-purple-700 text-white 
                         rounded-lg font-medium transition-all transform hover:scale-105
                         flex items-center space-x-2"
            >
              <span>{currentStep === steps.length - 1 ? 'Bắt đầu!' : 'Tiếp theo'}</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
} 