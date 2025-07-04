import React, { useState, useEffect } from 'react'

interface CooldownModalProps {
  seconds: number
  onFinish: () => void
}

export default function CooldownModal({ seconds, onFinish }: CooldownModalProps) {
  const [timeLeft, setTimeLeft] = useState(seconds)

  useEffect(() => {
    if (timeLeft <= 0) {
      onFinish()
      return
    }

    const timer = setTimeout(() => {
      setTimeLeft(timeLeft - 1)
    }, 1000)

    return () => clearTimeout(timer)
  }, [timeLeft, onFinish])

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-8 max-w-md w-full mx-4 text-center">
        <div className="mb-4">
          <div className="text-6xl mb-4">⏳</div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
            Bạn đã hỏi AI quá nhiều!
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Hãy nghỉ ngơi và thử tự giải quyết vấn đề trước khi tiếp tục.
          </p>
        </div>

        <div className="mb-6">
          <div className="text-4xl font-bold text-blue-500 mb-2">
            {timeLeft}
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            giây còn lại
          </div>
        </div>

        <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4">
          <p className="text-sm text-gray-600 dark:text-gray-300">
            💡 <strong>Gợi ý:</strong> Hãy thử Google, đọc tài liệu, 
            hoặc suy nghĩ về vấn đề từ góc độ khác!
          </p>
        </div>

        <div className="mt-4 w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
          <div 
            className="bg-blue-500 h-2 rounded-full transition-all duration-1000"
            style={{ width: `${(timeLeft / seconds) * 100}%` }}
          />
        </div>
      </div>
    </div>
  )
} 