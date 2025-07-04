import React from 'react'
import { motion } from 'framer-motion'
import { Brain, Loader2 } from 'lucide-react'

const LoadingScreen: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-white z-50 flex items-center justify-center">
      <div className="text-center">
        {/* Logo */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="w-20 h-20 mx-auto bg-black rounded-lg flex items-center justify-center mb-4">
            <Brain className="text-white" size={40} />
          </div>
          <h1 className="text-2xl font-bold text-black">AI Self-Reliance</h1>
          <p className="text-gray-600 mt-2">Tư duy độc lập</p>
        </motion.div>

        {/* Loading Spinner */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex items-center justify-center space-x-2 text-gray-600"
        >
          <Loader2 className="animate-spin" size={20} />
          <span>Đang tải...</span>
        </motion.div>

        {/* Progress Bar */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 2, ease: "easeInOut" }}
          className="w-64 h-1 bg-gray-200 rounded-full mx-auto mt-6 overflow-hidden"
        >
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 2, ease: "easeInOut" }}
            className="h-full bg-black rounded-full"
          />
        </motion.div>

        {/* Loading Text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-sm text-gray-500 mt-4"
        >
          Chuẩn bị trải nghiệm tuyệt vời...
        </motion.p>
      </div>
    </div>
  )
}

export default LoadingScreen 