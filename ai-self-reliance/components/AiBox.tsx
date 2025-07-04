import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, Sparkles, Brain, CheckCircle, Clock, Zap } from 'lucide-react'
import confetti from 'canvas-confetti'
import CooldownModal from './CooldownModal'
import ReflectionPopup from './ReflectionPopup'
import ProgressPie from './ProgressPie'

interface AiBoxState {
  usageCount: number
  selfSolved: number
  aiSolved: number
  streak: number
  lastUsageDate: string
}

export default function AiBox() {
  const [prompt, setPrompt] = useState('')
  const [response, setResponse] = useState('')
  const [state, setState] = useState<AiBoxState>({
    usageCount: 0,
    selfSolved: 0,
    aiSolved: 0,
    streak: 0,
    lastUsageDate: ''
  })
  const [cooldown, setCooldown] = useState(false)
  const [cooldownSeconds, setCooldownSeconds] = useState(30)
  const [showRefPopup, setShowRefPopup] = useState(false)

  // Load state from localStorage
  useEffect(() => {
    const savedState = localStorage.getItem('aiBoxState')
    if (savedState) {
      setState(JSON.parse(savedState))
    }
  }, [])

  // Save state to localStorage
  useEffect(() => {
    localStorage.setItem('aiBoxState', JSON.stringify(state))
  }, [state])

  // Show reflection popup when typing > 50 characters
  useEffect(() => {
    if (prompt.length >= 50 && !showRefPopup) {
      setShowRefPopup(true)
    }
  }, [prompt, showRefPopup])

  const simulateAiResponse = (userPrompt: string) => {
    const responses = [
      `Tôi hiểu bạn muốn hỏi về "${userPrompt.slice(0, 30)}...". Đây là một câu trả lời mô phỏng từ AI.`,
      `Về vấn đề "${userPrompt.slice(0, 30)}...", đây là gợi ý: Hãy thử tự tìm hiểu trước khi hỏi AI.`,
      `Câu hỏi "${userPrompt.slice(0, 30)}..." rất hay! Nhưng bạn đã thử Google chưa?`,
      `Đối với "${userPrompt.slice(0, 30)}...", tôi khuyên bạn nên tự research trước.`,
      `Về "${userPrompt.slice(0, 30)}...", hãy thử suy nghĩ độc lập trước khi dựa vào AI.`
    ]
    return responses[Math.floor(Math.random() * responses.length)]
  }

  const handleAskAi = () => {
    if (cooldown || prompt.trim() === '') return

    const aiResponse = simulateAiResponse(prompt)
    setResponse(aiResponse)

    const newUsageCount = state.usageCount + 1
    const newState = {
      ...state,
      usageCount: newUsageCount,
      aiSolved: state.aiSolved + 1,
      lastUsageDate: new Date().toDateString()
    }

    setState(newState)

    // Trigger cooldown after 3 uses
    if (newUsageCount >= 3) {
      setCooldown(true)
      setCooldownSeconds(30)
      setState(prev => ({ ...prev, usageCount: 0 }))
    }

    setPrompt('')
  }

  const handleCooldownFinish = () => {
    setCooldown(false)
  }

  const handleSelfSolved = () => {
    setState(prev => ({
      ...prev,
      selfSolved: prev.selfSolved + 1
    }))
    
    // Trigger confetti effect
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#10B981', '#34D399', '#6EE7B7']
    })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6 lg:p-8"
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1 }}
        className="flex justify-between items-center mb-6"
      >
        <div className="flex items-center space-x-3">
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
            className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg"
          >
            <Brain className="text-white" size={24} />
          </motion.div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
            AI Assistant
          </h2>
        </div>
        
        <motion.div
          className={`flex items-center space-x-2 px-3 py-1 rounded-full text-sm font-medium ${
            state.usageCount === 0
              ? 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400'
              : state.usageCount <= 1
              ? 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400'
              : 'bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400'
          }`}
          animate={{
            scale: state.usageCount >= 2 ? [1, 1.05, 1] : 1
          }}
          transition={{
            duration: 0.5,
            repeat: state.usageCount >= 2 ? Infinity : 0
          }}
        >
          <Clock size={16} />
          <span>Sử dụng: {state.usageCount}/3</span>
        </motion.div>
      </motion.div>

      {/* Progress Chart */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="mb-8"
      >
        <ProgressPie selfSolved={state.selfSolved} aiSolved={state.aiSolved} />
      </motion.div>

      {/* Input Area */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="space-y-6"
      >
        <div className="relative">
          <motion.textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Nhập câu hỏi của bạn... (>50 ký tự sẽ có gợi ý tư duy)"
            className="w-full h-40 p-4 border-2 border-gray-200 dark:border-gray-600 rounded-xl 
                       bg-white/50 dark:bg-gray-700/50 text-gray-800 dark:text-white
                       focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:border-blue-400
                       resize-none transition-all duration-300 backdrop-blur-sm
                       placeholder:text-gray-400 dark:placeholder:text-gray-500"
            whileFocus={{ scale: 1.01 }}
          />
          
          {/* Character counter */}
          <div className="absolute bottom-3 right-3 text-xs text-gray-400 dark:text-gray-500">
            {prompt.length}/∞
          </div>
          
          {/* Reflection warning */}
          <AnimatePresence>
            {prompt.length >= 40 && prompt.length < 50 && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute -top-8 right-0 bg-yellow-100 dark:bg-yellow-900/20 
                           text-yellow-700 dark:text-yellow-400 px-2 py-1 rounded text-xs"
              >
                Còn {50 - prompt.length} ký tự nữa sẽ có gợi ý! 💭
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <motion.button
            onClick={handleAskAi}
            disabled={cooldown || prompt.trim() === ''}
            className={`flex-1 flex items-center justify-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
              cooldown || prompt.trim() === ''
                ? 'bg-gray-200 dark:bg-gray-600 text-gray-500 cursor-not-allowed'
                : 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg hover:shadow-xl'
            }`}
            whileHover={cooldown || prompt.trim() === '' ? {} : { scale: 1.02 }}
            whileTap={cooldown || prompt.trim() === '' ? {} : { scale: 0.98 }}
          >
            {cooldown ? (
              <>
                <Clock size={20} />
                <span>Đang Cooldown...</span>
              </>
            ) : (
              <>
                <Send size={20} />
                <span>Gửi cho AI</span>
              </>
            )}
          </motion.button>

          <motion.button
            onClick={handleSelfSolved}
            className="flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 
                       hover:from-green-600 hover:to-green-700 text-white rounded-xl font-medium 
                       transition-all duration-300 shadow-lg hover:shadow-xl"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <CheckCircle size={20} />
            <span>Tự Giải Quyết</span>
            <Sparkles size={16} />
          </motion.button>
        </div>
      </motion.div>

      {/* Response Area */}
      <AnimatePresence>
        {response && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-8 overflow-hidden"
          >
            <motion.div
              initial={{ y: 20 }}
              animate={{ y: 0 }}
              className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 
                         rounded-xl border border-blue-100 dark:border-blue-800"
            >
              <div className="flex items-center space-x-2 mb-3">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                >
                  <Zap className="text-blue-500" size={20} />
                </motion.div>
                <h3 className="font-semibold text-blue-800 dark:text-blue-200">
                  Phản hồi từ AI:
                </h3>
              </div>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {response}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Usage Tips */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-6 p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 
                   rounded-xl border border-purple-100 dark:border-purple-800"
      >
        <div className="text-sm text-purple-700 dark:text-purple-300">
          <strong>💡 Gợi ý:</strong> Hãy thử Google, đọc docs, hoặc chia nhỏ vấn đề trước khi hỏi AI!
        </div>
      </motion.div>

      {/* Cooldown Modal */}
      <AnimatePresence>
        {cooldown && (
          <CooldownModal
            seconds={cooldownSeconds}
            onFinish={handleCooldownFinish}
          />
        )}
      </AnimatePresence>

      {/* Reflection Popup */}
      <ReflectionPopup
        visible={showRefPopup}
        setVisible={setShowRefPopup}
      />
    </motion.div>
  )
} 