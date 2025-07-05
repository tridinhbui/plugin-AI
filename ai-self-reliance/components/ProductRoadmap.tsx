import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Play, CheckCircle, ArrowRight, Clock, Target, Trophy, Brain, 
  Zap, Star, Lightbulb, TrendingUp,
  ChevronDown, X, Map, LucideIcon
} from 'lucide-react'

interface RoadmapProps {
  visible: boolean
  onClose: () => void
}

interface RoadmapStep {
  id: number
  title: string
  description: string
  icon: LucideIcon
  color: string
  bgColor: string
  details: string[]
  tips: string[]
  duration: string
  difficulty: 'Dễ' | 'Trung bình' | 'Khó'
}

const roadmapData: RoadmapStep[] = [
  {
    id: 1,
    title: "Khởi động hành trình",
    description: "Làm quen với giao diện và hiểu rõ mục tiêu của ứng dụng",
    icon: Play,
    color: "text-blue-600",
    bgColor: "from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20",
    details: [
      "Xem tutorial hướng dẫn chi tiết",
      "Khám phá các tính năng chính",
      "Đặt mục tiêu học tập cá nhân",
      "Tìm hiểu về hệ thống badge và streak"
    ],
    tips: [
      "Dành 10-15 phút để xem tutorial",
      "Ghi chú lại các tính năng quan tâm",
      "Thiết lập thói quen học tập hàng ngày"
    ],
    duration: "15 phút",
    difficulty: "Dễ"
  },
  {
    id: 2,
    title: "Thực hành tự học",
    description: "Bắt đầu áp dụng các tip hàng ngày và thử tự giải quyết vấn đề",
    icon: Target,
    color: "text-green-600",
    bgColor: "from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20",
    details: [
      "Đọc và áp dụng tip hàng ngày",
      "Thử tự giải quyết ít nhất 1 vấn đề/ngày",
      "Sử dụng Google và documentation trước",
      "Ghi lại quá trình học tập của bạn"
    ],
    tips: [
      "Bắt đầu với các vấn đề đơn giản",
      "Chia nhỏ bài toán phức tạp",
      "Đặt timer 15-30 phút trước khi hỏi AI"
    ],
    duration: "1-2 tuần",
    difficulty: "Trung bình"
  },
  {
    id: 3,
    title: "Kiểm soát AI usage",
    description: "Học cách sử dụng AI một cách có ý thức và hiệu quả",
    icon: Brain,
    color: "text-purple-600",
    bgColor: "from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20",
    details: [
      "Chỉ sử dụng AI khi thực sự cần thiết",
      "Hiểu rõ limitation của 3 lần/chu kỳ",
      "Sử dụng reflection popup như gợi ý",
      "Theo dõi usage statistics"
    ],
    tips: [
      "Đặt câu hỏi cụ thể, rõ ràng cho AI",
      "Sử dụng AI để verify solution, không phải tạo solution",
      "Học cách prompt engineering hiệu quả"
    ],
    duration: "2-3 tuần",
    difficulty: "Trung bình"
  },
  {
    id: 4,
    title: "Xây dựng streak",
    description: "Tạo thói quen không phụ thuộc AI và tích lũy streak dài hạn",
    icon: Zap,
    color: "text-orange-600",
    bgColor: "from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20",
    details: [
      "Mục tiêu 1 ngày không sử dụng AI",
      "Mở rộng thành 3 ngày liên tiếp",
      "Thử thách 7 ngày streak",
      "Chia sẻ achievement với cộng đồng"
    ],
    tips: [
      "Chuẩn bị resources trước khi bắt đầu streak",
      "Tìm buddy để accountability",
      "Reward bản thân khi đạt milestone"
    ],
    duration: "1-2 tháng",
    difficulty: "Khó"
  },
  {
    id: 5,
    title: "Thành thạo tự lập",
    description: "Trở thành expert trong việc tự học và giải quyết vấn đề",
    icon: Trophy,
    color: "text-yellow-600",
    bgColor: "from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20",
    details: [
      "Đạt được tất cả badges",
      "Maintain streak >7 ngày thường xuyên",
      "Tỷ lệ tự giải quyết >70%",
      "Mentoring người khác"
    ],
    tips: [
      "Document lại learning journey",
      "Tạo personal knowledge base",
      "Chia sẻ kinh nghiệm với community"
    ],
    duration: "Liên tục",
    difficulty: "Khó"
  }
]

export default function ProductRoadmap({ visible, onClose }: RoadmapProps) {
  const [expandedStep, setExpandedStep] = useState<number | null>(null)
  const [completedSteps, setCompletedSteps] = useState<number[]>([])

  const toggleStepExpansion = (stepId: number) => {
    setExpandedStep(expandedStep === stepId ? null : stepId)
  }

  const toggleStepCompletion = (stepId: number) => {
    if (completedSteps.includes(stepId)) {
      setCompletedSteps(completedSteps.filter(id => id !== stepId))
    } else {
      setCompletedSteps([...completedSteps, stepId])
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Dễ': return 'text-green-600 bg-green-100 dark:bg-green-900/20'
      case 'Trung bình': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20'
      case 'Khó': return 'text-red-600 bg-red-100 dark:bg-red-900/20'
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-900/20'
    }
  }

  if (!visible) return null

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
          className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl rounded-3xl shadow-2xl 
                     max-w-4xl w-full max-h-[90vh] overflow-hidden"
        >
          {/* Header */}
          <div className="relative p-6 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white">
            <motion.button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-full transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <X size={24} />
            </motion.button>

            <div className="flex items-center space-x-4">
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
                className="p-3 bg-white/20 rounded-xl"
              >
                <Map size={32} />
              </motion.div>
              
              <div>
                <h2 className="text-3xl font-bold mb-2">
                  🗺️ Roadmap Thành Thạo Tự Lập
                </h2>
                <p className="text-blue-100">
                  Hành trình 5 bước để trở thành expert tự học và giảm phụ thuộc AI
                </p>
              </div>
            </div>

            {/* Progress Overview */}
            <div className="mt-6 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="text-sm">
                  <span className="text-blue-100">Tiến độ:</span>
                  <span className="ml-2 font-bold">
                    {completedSteps.length}/{roadmapData.length} bước
                  </span>
                </div>
                <div className="w-32 bg-white/20 rounded-full h-2">
                  <motion.div
                    className="bg-white h-2 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ 
                      width: `${(completedSteps.length / roadmapData.length) * 100}%` 
                    }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </div>
              
              <div className="text-right text-sm">
                <div className="text-blue-100">Estimated Time:</div>
                <div className="font-bold">2-3 tháng</div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 max-h-[calc(90vh-200px)] overflow-y-auto">
            <div className="space-y-6">
              {roadmapData.map((step, index) => {
                const IconComponent = step.icon
                const isCompleted = completedSteps.includes(step.id)
                const isExpanded = expandedStep === step.id
                
                return (
                  <motion.div
                    key={step.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`relative overflow-hidden rounded-2xl border-2 transition-all duration-300 ${
                      isCompleted 
                        ? 'border-green-300 dark:border-green-700 bg-green-50 dark:bg-green-900/10' 
                        : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800'
                    }`}
                  >
                    {/* Step Header */}
                    <div 
                      className="p-6 cursor-pointer"
                      onClick={() => toggleStepExpansion(step.id)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          {/* Step Number & Icon */}
                          <div className="relative">
                            <motion.div
                              className={`w-16 h-16 rounded-xl bg-gradient-to-br ${step.bgColor} 
                                         flex items-center justify-center border-2 ${
                                isCompleted ? 'border-green-400' : 'border-gray-300 dark:border-gray-600'
                              }`}
                              whileHover={{ scale: 1.05 }}
                            >
                              <IconComponent className={step.color} size={24} />
                            </motion.div>
                            
                            <motion.div
                              className="absolute -top-2 -right-2 w-6 h-6 bg-white rounded-full 
                                         border-2 border-gray-300 dark:border-gray-600 dark:bg-gray-800
                                         flex items-center justify-center text-xs font-bold"
                              whileHover={{ scale: 1.1 }}
                            >
                              {step.id}
                            </motion.div>

                            {isCompleted && (
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="absolute -bottom-2 -right-2 w-6 h-6 bg-green-500 
                                           rounded-full flex items-center justify-center"
                              >
                                <CheckCircle className="text-white" size={14} />
                              </motion.div>
                            )}
                          </div>

                          {/* Step Info */}
                          <div className="flex-1">
                            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-1">
                              {step.title}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300 mb-3">
                              {step.description}
                            </p>
                            
                            <div className="flex items-center space-x-4">
                              <span className={`px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(step.difficulty)}`}>
                                {step.difficulty}
                              </span>
                              <span className="flex items-center space-x-1 text-sm text-gray-500 dark:text-gray-400">
                                <Clock size={14} />
                                <span>{step.duration}</span>
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center space-x-3">
                          <motion.button
                            onClick={(e) => {
                              e.stopPropagation()
                              toggleStepCompletion(step.id)
                            }}
                            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                              isCompleted
                                ? 'bg-green-500 text-white'
                                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                            }`}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            {isCompleted ? 'Hoàn thành ✓' : 'Đánh dấu'}
                          </motion.button>
                          
                          <motion.div
                            animate={{ rotate: isExpanded ? 180 : 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            <ChevronDown className="text-gray-400" size={20} />
                          </motion.div>
                        </div>
                      </div>
                    </div>

                    {/* Step Details */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="px-6 pb-6 border-t border-gray-200 dark:border-gray-700">
                            <div className="pt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                              {/* Action Items */}
                              <div>
                                <h4 className="font-semibold text-gray-800 dark:text-white mb-3 flex items-center">
                                  <Lightbulb className="text-blue-500 mr-2" size={16} />
                                  Hành động cần làm
                                </h4>
                                <ul className="space-y-2">
                                  {step.details.map((detail, idx) => (
                                    <motion.li
                                      key={idx}
                                      initial={{ opacity: 0, x: -10 }}
                                      animate={{ opacity: 1, x: 0 }}
                                      transition={{ delay: idx * 0.1 }}
                                      className="flex items-start space-x-2 text-sm text-gray-600 dark:text-gray-300"
                                    >
                                      <ArrowRight className="text-blue-500 mt-0.5 flex-shrink-0" size={12} />
                                      <span>{detail}</span>
                                    </motion.li>
                                  ))}
                                </ul>
                              </div>

                              {/* Tips */}
                              <div>
                                <h4 className="font-semibold text-gray-800 dark:text-white mb-3 flex items-center">
                                  <Star className="text-yellow-500 mr-2" size={16} />
                                  Tips thành công
                                </h4>
                                <ul className="space-y-2">
                                  {step.tips.map((tip, idx) => (
                                    <motion.li
                                      key={idx}
                                      initial={{ opacity: 0, x: -10 }}
                                      animate={{ opacity: 1, x: 0 }}
                                      transition={{ delay: idx * 0.1 + 0.2 }}
                                      className="flex items-start space-x-2 text-sm text-gray-600 dark:text-gray-300"
                                    >
                                      <TrendingUp className="text-green-500 mt-0.5 flex-shrink-0" size={12} />
                                      <span>{tip}</span>
                                    </motion.li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                )
              })}
            </div>

            {/* Success Message */}
            {completedSteps.length === roadmapData.length && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-8 p-6 bg-gradient-to-r from-green-50 to-emerald-50 
                           dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl 
                           border border-green-200 dark:border-green-700"
              >
                <div className="text-center">
                  <motion.div
                    animate={{
                      scale: [1, 1.2, 1],
                      rotate: [0, 10, -10, 0]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity
                    }}
                    className="text-6xl mb-4"
                  >
                    🎉
                  </motion.div>
                  <h3 className="text-2xl font-bold text-green-800 dark:text-green-200 mb-2">
                    Chúc mừng! Bạn đã hoàn thành roadmap!
                  </h3>
                  <p className="text-green-700 dark:text-green-300">
                    Bạn đã trở thành một expert trong việc tự học và độc lập với AI! 
                    Hãy tiếp tục maintain những thói quen tốt này.
                  </p>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
} 