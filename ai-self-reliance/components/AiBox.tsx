import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Clock, AlertCircle, Send, Bot, User, Sparkles } from 'lucide-react'
import CooldownModal from './CooldownModal'
import ReflectionPopup from './ReflectionPopup'

interface Message {
  id: string
  type: 'user' | 'ai'
  content: string
  timestamp: Date
}

export default function AiBox() {
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<Message[]>([])
  const [dailyUsage, setDailyUsage] = useState(0)
  const [lastUsed, setLastUsed] = useState<Date | null>(null)
  const [showCooldown, setShowCooldown] = useState(false)
  const [showReflection, setShowReflection] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const DAILY_LIMIT = 3
  const COOLDOWN_MINUTES = 0.5 // 30 seconds for demo

  useEffect(() => {
    const stored = localStorage.getItem('aiUsageData')
    if (stored) {
      const data = JSON.parse(stored)
      const today = new Date().toDateString()
      
      if (data.date === today) {
        setDailyUsage(data.count)
        setLastUsed(data.lastUsed ? new Date(data.lastUsed) : null)
      } else {
        // Reset for new day
        setDailyUsage(0)
        setLastUsed(null)
        localStorage.setItem('aiUsageData', JSON.stringify({
          date: today,
          count: 0,
          lastUsed: null
        }))
      }
    }

    // Load messages
    const storedMessages = localStorage.getItem('aiMessages')
    if (storedMessages) {
      const parsedMessages = JSON.parse(storedMessages).map((msg: Message) => ({
        ...msg,
        timestamp: new Date(msg.timestamp)
      }))
      setMessages(parsedMessages)
    }
  }, [])

  const canUseAI = () => {
    if (dailyUsage >= DAILY_LIMIT) return false
    
    if (lastUsed) {
      const timeDiff = (new Date().getTime() - lastUsed.getTime()) / (1000 * 60)
      return timeDiff >= COOLDOWN_MINUTES
    }
    
    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!input.trim()) return

    // Check for reflection popup
    if (input.length > 50) {
      setShowReflection(true)
      return
    }

    if (!canUseAI()) {
      setShowCooldown(true)
      return
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: input,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: `Tôi hiểu bạn đang tìm hiểu về "${input}". Tuy nhiên, hãy thử tự suy nghĩ trước! Bạn có thể:\n\n• Tìm kiếm thông tin từ nhiều nguồn đáng tin cậy\n• Phân tích vấn đề từ nhiều góc độ khác nhau\n• Thảo luận với bạn bè hoặc chuyên gia\n• Ghi chép lại suy nghĩ của bạn\n\nViệc tự tìm hiểu sẽ giúp bạn hiểu sâu hơn và nhớ lâu hơn!`,
        timestamp: new Date()
      }

      setMessages(prev => [...prev, aiMessage])
      setIsLoading(false)

      // Update usage
      const newUsage = dailyUsage + 1
      const now = new Date()
      setDailyUsage(newUsage)
      setLastUsed(now)

      const today = new Date().toDateString()
      localStorage.setItem('aiUsageData', JSON.stringify({
        date: today,
        count: newUsage,
        lastUsed: now.toISOString()
      }))

      // Save messages
      localStorage.setItem('aiMessages', JSON.stringify([...messages, userMessage, aiMessage]))
    }, 1500)
  }

  const handleContinueSubmit = () => {
    setShowReflection(false)
    const submitEvent = { preventDefault: () => {} } as React.FormEvent
    handleSubmit(submitEvent)
  }

  const getRemainingTime = () => {
    if (!lastUsed) return 0
    const timeDiff = (new Date().getTime() - lastUsed.getTime()) / (1000 * 60)
    return Math.max(0, COOLDOWN_MINUTES - timeDiff)
  }

  const remainingUses = DAILY_LIMIT - dailyUsage
  const remainingTime = getRemainingTime()

  return (
    <div className="w-full">
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
        {/* Header - Enhanced */}
        <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gray-900 rounded-xl shadow-lg">
                <Bot className="text-white" size={20} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">AI Assistant</h3>
                <p className="text-sm text-gray-600">Sử dụng có giới hạn để khuyến khích tự học</p>
              </div>
            </div>
            <div className="hidden sm:flex items-center space-x-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">{remainingUses}</div>
                <div className="text-xs text-gray-500">Lượt còn lại</div>
              </div>
              {remainingTime > 0 && (
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">
                    {Math.ceil(remainingTime)}
                  </div>
                  <div className="text-xs text-gray-500">Phút chờ</div>
                </div>
              )}
            </div>
          </div>

          {/* Mobile usage info */}
          <div className="sm:hidden mt-3 flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <div className="flex space-x-1">
                {[...Array(DAILY_LIMIT)].map((_, i) => (
                  <div
                    key={i}
                    className={`w-3 h-3 rounded-full ${
                      i < dailyUsage ? 'bg-red-400' : 'bg-green-400'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-600">
                {remainingUses} lượt còn lại
              </span>
            </div>
            {remainingTime > 0 && (
              <div className="flex items-center space-x-1 text-orange-600">
                <Clock size={14} />
                <span className="text-sm font-medium">
                  {Math.ceil(remainingTime)}p
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Chat Messages - Enhanced */}
        <div className="h-80 lg:h-96 overflow-y-auto p-4 space-y-4 custom-scrollbar">
          <AnimatePresence>
            {messages.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-8"
              >
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl flex items-center justify-center">
                  <Sparkles className="text-blue-600" size={24} />
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">
                  Trợ lý AI của bạn
                </h4>
                <p className="text-gray-600 text-sm max-w-md mx-auto leading-relaxed">
                  Hãy thử tự suy nghĩ trước khi hỏi! Mỗi ngày bạn chỉ có 3 lượt hỏi.
                </p>
              </motion.div>
            ) : (
              messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex items-start space-x-3 max-w-[85%] ${
                    message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                  }`}>
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 ${
                      message.type === 'user' 
                        ? 'bg-gray-900 text-white' 
                        : 'bg-gradient-to-br from-blue-500 to-indigo-600 text-white'
                    }`}>
                      {message.type === 'user' ? <User size={16} /> : <Bot size={16} />}
                    </div>
                    <div className={`rounded-2xl px-4 py-3 ${
                      message.type === 'user'
                        ? 'bg-gray-900 text-white'
                        : 'bg-gray-50 text-gray-900 border border-gray-200'
                    }`}>
                      <div className="text-sm leading-relaxed whitespace-pre-line">
                        {message.content}
                      </div>
                      <div className={`text-xs mt-2 ${
                        message.type === 'user' ? 'text-gray-300' : 'text-gray-500'
                      }`}>
                        {message.timestamp.toLocaleTimeString('vi-VN', {
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </AnimatePresence>

          {isLoading && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-start"
            >
              <div className="flex items-start space-x-3 max-w-[85%]">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white flex items-center justify-center">
                  <Bot size={16} />
                </div>
                <div className="bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3">
                  <div className="flex space-x-1">
                    {[...Array(3)].map((_, i) => (
                      <div
                        key={i}
                        className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"
                        style={{ animationDelay: `${i * 0.2}s` }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Input Form - Enhanced */}
        <div className="border-t border-gray-200 bg-gray-50 p-4">
          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="relative">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Nhập câu hỏi của bạn... (Hãy cố gắng tự suy nghĩ trước!)"
                className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-all duration-200 text-sm"
                rows={2}
                disabled={!canUseAI() || isLoading}
              />
              <button
                type="submit"
                disabled={!input.trim() || !canUseAI() || isLoading}
                className="absolute right-2 bottom-2 p-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all duration-200"
              >
                <Send size={16} />
              </button>
            </div>

            {/* Status Messages */}
            <AnimatePresence>
              {input.length > 50 && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="flex items-center space-x-2 text-orange-600 text-sm bg-orange-50 border border-orange-200 rounded-lg px-3 py-2"
                >
                  <AlertCircle size={16} />
                  <span>Câu hỏi dài - hãy thử tự suy nghĩ trước!</span>
                </motion.div>
              )}

              {dailyUsage >= DAILY_LIMIT && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="flex items-center space-x-2 text-red-600 text-sm bg-red-50 border border-red-200 rounded-lg px-3 py-2"
                >
                  <AlertCircle size={16} />
                  <span>Đã hết lượt hỏi hôm nay. Hãy quay lại vào ngày mai!</span>
                </motion.div>
              )}

              {remainingTime > 0 && dailyUsage < DAILY_LIMIT && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="flex items-center space-x-2 text-blue-600 text-sm bg-blue-50 border border-blue-200 rounded-lg px-3 py-2"
                >
                  <Clock size={16} />
                  <span>
                    Còn {Math.ceil(remainingTime)} phút nữa để sử dụng tiếp
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </div>
      </div>

      {/* Modals */}
      <CooldownModal
        visible={showCooldown}
        onClose={() => setShowCooldown(false)}
        remainingTime={Math.ceil(remainingTime)}
        dailyUsage={dailyUsage}
        dailyLimit={DAILY_LIMIT}
      />

      <ReflectionPopup
        visible={showReflection}
        onClose={() => setShowReflection(false)}
        onContinue={handleContinueSubmit}
        questionLength={input.length}
      />
    </div>
  )
} 