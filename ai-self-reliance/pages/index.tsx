import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HelpCircle, Brain, Target, TrendingUp, Map, Menu, X, ChevronDown } from 'lucide-react'
import DailyChallenge from '../components/DailyChallenge'
import AiBox from '../components/AiBox'
import BadgeBoard from '../components/BadgeBoard'
import Tutorial from '../components/Tutorial'
import ProductRoadmap from '../components/ProductRoadmap'
import LoadingScreen from '../components/LoadingScreen'

export default function Home() {
  const [showTutorial, setShowTutorial] = useState(false)
  const [showRoadmap, setShowRoadmap] = useState(false)
  const [isFirstVisit, setIsFirstVisit] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const loadingTimer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)

    const hasVisited = localStorage.getItem('hasVisitedBefore')
    if (!hasVisited) {
      setIsFirstVisit(true)
      setTimeout(() => {
        setShowTutorial(true)
      }, 2000)
      localStorage.setItem('hasVisitedBefore', 'true')
    }

    return () => clearTimeout(loadingTimer)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      const offset = 80
      const elementPosition = element.offsetTop - offset
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      })
    }
    setMobileMenuOpen(false)
  }

  if (isLoading) {
    return <LoadingScreen />
  }

  const features = [
    {
      value: "∞",
      label: "Tự Giải Quyết",
      description: "Không giới hạn khả năng học tập và sáng tạo của bạn",
      icon: Target,
      color: "from-green-500 to-emerald-600"
    },
    {
      value: "3",
      label: "Lần Hỏi AI/Chu Kỳ",
      description: "Khuyến khích tìm hiểu và nghiên cứu trước khi nhờ AI",
      icon: Brain,
      color: "from-blue-500 to-indigo-600"
    },
    {
      value: "7+",
      label: "Ngày Streak Tối Đa",
      description: "Mục tiêu dài hạn để xây dựng thói quen tự lập",
      icon: TrendingUp,
      color: "from-purple-500 to-pink-600"
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Modern Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-md border-b border-gray-200/50 shadow-sm z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-gray-900 to-gray-700 rounded-xl flex items-center justify-center shadow-lg">
                <Brain className="text-white" size={20} />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold text-gray-900">AI Self-Reliance</h1>
                <p className="text-xs text-gray-500 -mt-1">Tư duy độc lập</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              <button 
                onClick={() => scrollToSection('hero')}
                className="text-gray-600 hover:text-gray-900 font-medium transition-colors duration-200"
              >
                Trang chủ
              </button>
              <button 
                onClick={() => scrollToSection('features')}
                className="text-gray-600 hover:text-gray-900 font-medium transition-colors duration-200"
              >
                Tính năng
              </button>
              <button 
                onClick={() => scrollToSection('dashboard')}
                className="text-gray-600 hover:text-gray-900 font-medium transition-colors duration-200"
              >
                Dashboard
              </button>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setShowTutorial(true)}
                className="hidden sm:flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg font-medium transition-all duration-200"
              >
                <HelpCircle size={16} />
                <span>Hướng dẫn</span>
              </button>
              
              <button
                onClick={() => setShowRoadmap(true)}
                className="hidden sm:flex items-center space-x-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 font-medium transition-all duration-200 shadow-lg"
              >
                <Map size={16} />
                <span>Roadmap</span>
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all duration-200"
              >
                {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className="lg:hidden border-t border-gray-200 py-4 mt-2"
              >
                <div className="flex flex-col space-y-3">
                  <button 
                    onClick={() => scrollToSection('hero')}
                    className="text-left text-gray-600 hover:text-gray-900 font-medium py-2 px-2 hover:bg-gray-50 rounded transition-all duration-200"
                  >
                    Trang chủ
                  </button>
                  <button 
                    onClick={() => scrollToSection('features')}
                    className="text-left text-gray-600 hover:text-gray-900 font-medium py-2 px-2 hover:bg-gray-50 rounded transition-all duration-200"
                  >
                    Tính năng
                  </button>
                  <button 
                    onClick={() => scrollToSection('dashboard')}
                    className="text-left text-gray-600 hover:text-gray-900 font-medium py-2 px-2 hover:bg-gray-50 rounded transition-all duration-200"
                  >
                    Dashboard
                  </button>
                  
                  <div className="pt-3 mt-3 border-t border-gray-200 space-y-2">
                    <button
                      onClick={() => {
                        setShowTutorial(true)
                        setMobileMenuOpen(false)
                      }}
                      className="flex items-center space-x-2 w-full text-left px-2 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded transition-all duration-200"
                    >
                      <HelpCircle size={16} />
                      <span>Hướng dẫn</span>
                    </button>
                    
                    <button
                      onClick={() => {
                        setShowRoadmap(true)
                        setMobileMenuOpen(false)
                      }}
                      className="flex items-center space-x-2 w-full px-2 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-all duration-200"
                    >
                      <Map size={16} />
                      <span>Roadmap</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-16">
        {/* Hero Section */}
        <section id="hero" className="relative py-20 lg:py-32 bg-gradient-to-br from-white via-gray-50 to-gray-100 overflow-hidden">
          <div className="absolute inset-0 opacity-30">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.03'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
            }}></div>
          </div>
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="inline-flex items-center px-4 py-2 rounded-full bg-gray-900/10 text-gray-900 text-sm font-medium mb-8"
              >
                <Brain size={16} className="mr-2" />
                Tăng cường tư duy độc lập
              </motion.div>

              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="text-4xl sm:text-5xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight"
              >
                AI Self-Reliance
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="text-lg sm:text-xl text-gray-600 max-w-4xl mx-auto mb-12 leading-relaxed"
              >
                Khuyến khích bạn hạn chế lệ thuộc AI bằng cách theo dõi số lần sử dụng, 
                thử thách tự học hằng ngày và tích lũy huy hiệu tự-lập.
              </motion.p>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
              >
                <button
                  onClick={() => setShowTutorial(true)}
                  className="group flex items-center space-x-3 px-8 py-4 bg-gray-900 text-white rounded-xl hover:bg-gray-800 font-semibold transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105"
                >
                  <HelpCircle size={20} />
                  <span>Bắt đầu hướng dẫn</span>
                  <ChevronDown size={16} className="group-hover:translate-x-1 transition-transform duration-200" />
                </button>

                <button
                  onClick={() => setShowRoadmap(true)}
                  className="flex items-center space-x-3 px-8 py-4 border-2 border-gray-900 text-gray-900 rounded-xl hover:bg-gray-900 hover:text-white font-semibold transition-all duration-300"
                >
                  <Map size={20} />
                  <span>Xem Roadmap</span>
                </button>
              </motion.div>

              {isFirstVisit && (
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", duration: 0.8, delay: 1 }}
                  className="inline-flex items-center px-6 py-3 bg-blue-50 border border-blue-200 text-blue-800 rounded-xl font-medium shadow-lg"
                >
                  🎉 Chào mừng đến với trải nghiệm mới!
                </motion.div>
              )}
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 lg:py-32 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-20"
            >
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Thống kê thời gian thực
              </h2>
              <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
                Theo dõi tiến độ phát triển tư duy độc lập của bạn với hệ thống metrics thông minh
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
              {features.map((stat, index) => {
                const IconComponent = stat.icon
                return (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.8 }}
                    viewport={{ once: true }}
                    className="group relative p-8 lg:p-10 bg-white border border-gray-200 rounded-2xl hover:shadow-2xl transition-all duration-500 hover:scale-105"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-500 from-gray-900 to-gray-600"></div>
                    
                    <div className={`w-16 h-16 lg:w-20 lg:h-20 mx-auto mb-6 bg-gradient-to-br ${stat.color} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <IconComponent className="text-white" size={32} />
                    </div>
                    
                    <div className="text-5xl lg:text-6xl font-bold text-gray-900 mb-4 group-hover:scale-110 transition-transform duration-300">
                      {stat.value}
                    </div>
                    
                    <div className="text-xl lg:text-2xl font-bold text-gray-900 mb-4">
                      {stat.label}
                    </div>
                    
                    <div className="text-gray-600 leading-relaxed">
                      {stat.description}
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Dashboard Section */}
        <section id="dashboard" className="py-20 lg:py-32 bg-gradient-to-br from-gray-50 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-20"
            >
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Dashboard Cá Nhân
              </h2>
              <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
                Quản lý thói quen học tập và theo dõi tiến độ phát triển tư duy độc lập
              </p>
            </motion.div>

            <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 lg:gap-12">
              {/* Left Column - Challenges & Badges */}
              <div className="xl:col-span-4 space-y-8">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2, duration: 0.8 }}
                  viewport={{ once: true }}
                >
                  <DailyChallenge />
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                  viewport={{ once: true }}
                >
                  <BadgeBoard />
                </motion.div>
              </div>

              {/* Right Column - AI Assistant */}
              <div className="xl:col-span-8">
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                  viewport={{ once: true }}
                >
                  <AiBox />
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Enhanced Footer */}
        <footer className="relative py-20 bg-gray-900 text-white overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black"></div>
          <div className="absolute inset-0 opacity-30">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
            }}></div>
          </div>
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="mb-12"
              >
                <div className="flex items-center justify-center space-x-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-white to-gray-300 rounded-2xl flex items-center justify-center shadow-2xl">
                    <Brain className="text-gray-900" size={32} />
                  </div>
                  <h3 className="text-3xl lg:text-4xl font-bold">AI Self-Reliance</h3>
                </div>
                <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
                  Khuyến khích tư duy độc lập, giảm phụ thuộc vào AI
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-gray-800 to-gray-700 rounded-3xl p-12 mb-12 border border-gray-700"
              >
                <div className="text-6xl mb-6">💡</div>
                <h4 className="text-2xl lg:text-3xl font-bold text-white mb-6">
                  Triết lý của chúng tôi
                </h4>
                <p className="text-lg lg:text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto mb-8">
                  <strong className="text-white text-2xl">
                    &ldquo;Càng ít phụ thuộc AI, bạn càng phát triển khả năng tư duy độc lập!&rdquo;
                  </strong>
                  <br /><br />
                  Hãy sử dụng AI như một công cụ hỗ trợ, không phải thay thế cho việc suy nghĩ của bạn.
                </p>
                
                <div className="flex items-center justify-center space-x-3 text-white font-semibold text-lg">
                  <span>→</span>
                  <span>Bắt đầu hành trình tự lập ngay hôm nay!</span>
                  <span>←</span>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                viewport={{ once: true }}
                className="text-gray-400 space-y-4 pt-8 border-t border-gray-700"
              >
                <div className="text-lg">Made with ❤️ for independent thinkers</div>
                <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-6">
                  <span>© 2024 AI Self-Reliance</span>
                  <span className="hidden sm:block">•</span>
                  <span>Empowering minds, one thought at a time</span>
                </div>
              </motion.div>
            </div>
          </div>
        </footer>
      </main>

      {/* Modals */}
      <Tutorial
        visible={showTutorial}
        onClose={() => setShowTutorial(false)}
      />

      <ProductRoadmap
        visible={showRoadmap}
        onClose={() => setShowRoadmap(false)}
      />
    </div>
  )
} 