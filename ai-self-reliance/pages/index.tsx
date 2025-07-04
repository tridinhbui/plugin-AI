import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { HelpCircle, Sparkles, Brain, Target, TrendingUp, Map, Zap, Star } from 'lucide-react'
import DailyChallenge from '../components/DailyChallenge'
import AiBox from '../components/AiBox'
import BadgeBoard from '../components/BadgeBoard'
import Tutorial from '../components/Tutorial'
import ProductRoadmap from '../components/ProductRoadmap'
import AnimatedBackground from '../components/AnimatedBackground'
import MagicCursor from '../components/MagicCursor'

export default function Home() {
  const [showTutorial, setShowTutorial] = useState(false)
  const [showRoadmap, setShowRoadmap] = useState(false)
  const [isFirstVisit, setIsFirstVisit] = useState(false)

  useEffect(() => {
    const hasVisited = localStorage.getItem('hasVisitedBefore')
    if (!hasVisited) {
      setIsFirstVisit(true)
      setShowTutorial(true)
      localStorage.setItem('hasVisitedBefore', 'true')
    }
  }, [])

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  }



  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900/20 dark:to-purple-900/20 relative overflow-hidden">
      {/* Animated Background */}
      <AnimatedBackground />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-7xl mx-auto px-4 py-6 relative z-10"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center mb-12">
          <div className="relative inline-block">
            <motion.h1
              className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent mb-6"
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "linear"
              }}
              style={{
                backgroundSize: "200% 200%"
              }}
            >
              AI Self-Reliance
            </motion.h1>
            
            <motion.div
              className="absolute -top-4 -right-4"
              animate={{ rotate: [0, 15, -15, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Sparkles className="text-yellow-400" size={32} />
            </motion.div>
          </div>
          
          <motion.p
            variants={itemVariants}
            className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8 leading-relaxed"
          >
            Khuyến khích bạn hạn chế lệ thuộc AI bằng cách theo dõi số lần sử dụng, 
            thử thách tự học hằng ngày và tích lũy huy hiệu tự-lập.
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8"
          >
            <motion.button
              onClick={() => setShowTutorial(true)}
              className="group hover-effect flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 
                         hover:from-blue-600 hover:to-purple-700 text-white rounded-full font-medium 
                         transition-all duration-300 shadow-lg hover:shadow-xl"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <HelpCircle size={20} />
              <span>Hướng dẫn sử dụng</span>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles size={16} className="opacity-70" />
              </motion.div>
            </motion.button>

            <motion.button
              onClick={() => setShowRoadmap(true)}
              className="group hover-effect flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-indigo-500 to-pink-600 
                         hover:from-indigo-600 hover:to-pink-700 text-white rounded-full font-medium 
                         transition-all duration-300 shadow-lg hover:shadow-xl"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Map size={20} />
              <span>Roadmap Thành Thạo</span>
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <Star size={16} className="opacity-70" />
              </motion.div>
            </motion.button>

            {isFirstVisit && (
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", duration: 0.8 }}
                className="text-sm text-blue-600 dark:text-blue-400 bg-gradient-to-r from-blue-50 to-indigo-50 
                           dark:from-blue-900/20 dark:to-indigo-900/20 px-4 py-2 rounded-full 
                           border border-blue-200 dark:border-blue-700 shadow-lg"
              >
                <motion.span
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  🎉 Chào mừng lần đầu ghé thăm!
                </motion.span>
              </motion.div>
            )}
          </motion.div>

          {/* Stats Overview */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto mb-8"
          >
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">∞</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Tự Giải Quyết</div>
            </div>
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg">
              <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">3</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Lần Hỏi AI/Chu Kỳ</div>
            </div>
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">7</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Ngày Streak Tối Đa</div>
            </div>
          </motion.div>
        </motion.div>

        {/* Main Content Grid */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-1 xl:grid-cols-3 gap-6 lg:gap-8"
        >
          {/* Left Column */}
          <motion.div
            variants={itemVariants}
            className="xl:col-span-1 space-y-6"
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <DailyChallenge />
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <BadgeBoard />
            </motion.div>
          </motion.div>

          {/* Right Column */}
          <motion.div
            variants={itemVariants}
            className="xl:col-span-2"
          >
            <motion.div
              whileHover={{ scale: 1.01 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <AiBox />
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Footer */}
        <motion.div
          variants={itemVariants}
          className="text-center mt-16 py-8"
        >
          <div className="text-sm text-gray-500 dark:text-gray-400">
            💡 <strong>Mẹo:</strong> Càng ít phụ thuộc AI, bạn càng phát triển khả năng tư duy độc lập!
          </div>
        </motion.div>
      </motion.div>

      {/* Tutorial Modal */}
      <Tutorial
        visible={showTutorial}
        onClose={() => setShowTutorial(false)}
      />

      {/* Product Roadmap Modal */}
      <ProductRoadmap
        visible={showRoadmap}
        onClose={() => setShowRoadmap(false)}
      />

      {/* Magic Cursor */}
      <MagicCursor />
    </div>
  )
} 