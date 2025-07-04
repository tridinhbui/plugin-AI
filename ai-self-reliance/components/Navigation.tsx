import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Brain, Menu, X, HelpCircle, Map, 
  ChevronDown, Star, TrendingUp, Target, Award, Zap
} from 'lucide-react'

interface NavigationProps {
  onTutorial: () => void
  onRoadmap: () => void
}

export default function Navigation({ onTutorial, onRoadmap }: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isStatsOpen, setIsStatsOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { 
      label: 'Dashboard', 
      icon: TrendingUp, 
      href: '#dashboard',
      description: 'Xem tổng quan tiến độ' 
    },
    { 
      label: 'Thử thách', 
      icon: Target, 
      href: '#challenges',
      description: 'Thực hành kỹ năng tự lập' 
    },
    { 
      label: 'Huy hiệu', 
      icon: Award, 
      href: '#badges',
      description: 'Khám phá thành tích' 
    },
    { 
      label: 'AI Assistant', 
      icon: Zap, 
      href: '#ai-box',
      description: 'Trợ lý thông minh' 
    }
  ]

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled 
            ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl shadow-lg border-b border-gray-200/50 dark:border-gray-700/50' 
            : 'bg-transparent'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <motion.div 
              className="flex items-center space-x-3"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                className="relative"
                animate={{
                  rotate: [0, 10, -10, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <div className="w-10 h-10 bg-gradient-to-tr from-blue-500 via-purple-600 to-pink-500 
                               rounded-xl flex items-center justify-center shadow-lg">
                  <Brain className="text-white" size={20} />
                </div>
                <motion.div
                  className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full"
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.7, 1, 0.7],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </motion.div>
              
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 
                               bg-clip-text text-transparent">
                  AI Self-Reliance
                </h1>
                <p className="text-xs text-gray-500 dark:text-gray-400 -mt-1">
                  Tư duy độc lập
                </p>
              </div>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item, index) => {
                const IconComponent = item.icon
                return (
                  <motion.a
                    key={item.label}
                    href={item.href}
                    className="group relative flex items-center space-x-2 px-3 py-2 rounded-lg
                               text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400
                               transition-colors duration-200"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 + 0.3 }}
                  >
                    <IconComponent size={18} />
                    <span className="font-medium">{item.label}</span>
                    
                    {/* Tooltip */}
                    <motion.div
                      className="absolute top-12 left-1/2 transform -translate-x-1/2 
                                 bg-gray-900 dark:bg-gray-700 text-white text-xs 
                                 px-3 py-2 rounded-lg shadow-lg opacity-0 
                                 group-hover:opacity-100 pointer-events-none
                                 whitespace-nowrap z-50"
                      initial={{ opacity: 0, y: 10 }}
                      whileHover={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      {item.description}
                      <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 
                                      w-2 h-2 bg-gray-900 dark:bg-gray-700 rotate-45" />
                    </motion.div>
                    
                    {/* Hover effect */}
                    <motion.div
                      className="absolute inset-0 bg-blue-50 dark:bg-blue-900/20 rounded-lg -z-10"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileHover={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.2 }}
                    />
                  </motion.a>
                )
              })}
            </div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-3">
              {/* Stats Dropdown */}
              <div className="relative">
                <motion.button
                  onClick={() => setIsStatsOpen(!isStatsOpen)}
                  className="hidden sm:flex items-center space-x-2 px-4 py-2 
                             bg-gradient-to-r from-blue-500 to-purple-600 
                             hover:from-blue-600 hover:to-purple-700 
                             text-white rounded-lg font-medium shadow-lg
                             transition-all duration-300"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Star size={16} />
                  <span>Stats</span>
                  <motion.div
                    animate={{ rotate: isStatsOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown size={16} />
                  </motion.div>
                </motion.button>

                <AnimatePresence>
                  {isStatsOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.9 }}
                      className="absolute top-12 right-0 w-64 bg-white dark:bg-gray-800 
                                 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 
                                 p-4 z-50"
                    >
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600 dark:text-gray-400">Tự giải quyết</span>
                          <span className="font-bold text-green-600">∞</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600 dark:text-gray-400">AI sử dụng</span>
                          <span className="font-bold text-orange-600">3/chu kỳ</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600 dark:text-gray-400">Streak tối đa</span>
                          <span className="font-bold text-blue-600">7 ngày</span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Tutorial Button */}
              <motion.button
                onClick={onTutorial}
                className="flex items-center space-x-2 px-4 py-2 
                           bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600
                           text-gray-700 dark:text-gray-300 rounded-lg font-medium
                           transition-colors duration-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <HelpCircle size={16} />
                <span className="hidden sm:inline">Hướng dẫn</span>
              </motion.button>

              {/* Roadmap Button */}
              <motion.button
                onClick={onRoadmap}
                className="flex items-center space-x-2 px-4 py-2 
                           bg-gradient-to-r from-indigo-500 to-pink-600 
                           hover:from-indigo-600 hover:to-pink-700 
                           text-white rounded-lg font-medium shadow-lg
                           transition-all duration-300"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Map size={16} />
                <span className="hidden sm:inline">Roadmap</span>
              </motion.button>

              {/* Mobile Menu Button */}
              <motion.button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 text-gray-700 dark:text-gray-300 
                           hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <AnimatePresence mode="wait">
                  {isMobileMenuOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <X size={24} />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Menu size={24} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="fixed top-16 left-0 right-0 bg-white dark:bg-gray-900 
                       border-b border-gray-200 dark:border-gray-700 z-30 md:hidden"
          >
            <div className="px-4 py-6 space-y-4">
              {navItems.map((item, index) => {
                const IconComponent = item.icon
                return (
                  <motion.a
                    key={item.label}
                    href={item.href}
                    className="flex items-center space-x-3 px-4 py-3 rounded-lg
                               text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800
                               transition-colors duration-200"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <IconComponent size={20} />
                    <div>
                      <div className="font-medium">{item.label}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {item.description}
                      </div>
                    </div>
                  </motion.a>
                )
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Overlay for mobile menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 z-20 md:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  )
} 