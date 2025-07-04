import React from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, Brain, User, BarChart3 } from 'lucide-react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend, ChartConfiguration } from 'chart.js'
import { Pie } from 'react-chartjs-2'

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend)

interface ProgressPieProps {
  selfSolved: number
  aiSolved: number
}

export default function ProgressPie({ selfSolved, aiSolved }: ProgressPieProps) {
  const total = selfSolved + aiSolved
  
  const chartData = {
    labels: ['Tự giải quyết', 'Dùng AI'],
    datasets: [
      {
        data: [selfSolved, aiSolved],
        backgroundColor: [
          'rgba(34, 197, 94, 0.8)',  // Green for self-solved
          'rgba(239, 68, 68, 0.8)'   // Red for AI usage
        ],
        borderColor: [
          'rgba(34, 197, 94, 1)',
          'rgba(239, 68, 68, 1)'
        ],
        borderWidth: 2,
        hoverBackgroundColor: [
          'rgba(34, 197, 94, 0.9)',
          'rgba(239, 68, 68, 0.9)'
        ]
      }
    ]
  }

  const chartOptions: ChartConfiguration<'pie'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          padding: 20,
          usePointStyle: true,
          font: {
            size: 12,
            weight: 'bold'
          },
          color: '#6B7280'
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#FFFFFF',
        bodyColor: '#FFFFFF',
        borderColor: '#374151',
        borderWidth: 1,
        callbacks: {
          label: function(context: { label?: string; parsed: number; dataset: { data: number[] } }) {
            const label = context.label || ''
            const value = context.parsed
            const total = context.dataset.data.reduce((a: number, b: number) => a + b, 0)
            const percentage = total > 0 ? ((value / total) * 100).toFixed(1) : '0'
            return `${label}: ${value} (${percentage}%)`
          }
        }
      }
    },
    animation: {
      animateRotate: true,
      animateScale: true,
      duration: 1000,
      easing: 'easeOutQuart'
    }
  }

  if (total === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center p-8"
      >
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
          className="text-7xl mb-6"
        >
          📊
        </motion.div>
        <motion.h3
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-xl font-bold text-gray-800 dark:text-white mb-3"
        >
          Tiến Trình Học Tập
        </motion.h3>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-gray-500 dark:text-gray-400 text-sm"
        >
          Chưa có dữ liệu. Hãy bắt đầu giải quyết vấn đề! 🚀
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-6 grid grid-cols-2 gap-4"
        >
          <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-700">
            <User className="text-green-500 mx-auto mb-2" size={20} />
            <div className="text-xs text-green-700 dark:text-green-300">Tự Giải Quyết</div>
          </div>
          <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-700">
            <Brain className="text-blue-500 mx-auto mb-2" size={20} />
            <div className="text-xs text-blue-700 dark:text-blue-300">Hỏi AI</div>
          </div>
        </motion.div>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center"
    >
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex items-center justify-center space-x-2 mb-6"
      >
        <motion.div
          animate={{
            rotate: [0, 360],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          <BarChart3 className="text-blue-500" size={24} />
        </motion.div>
        <h3 className="text-xl font-bold text-gray-800 dark:text-white">
          Tiến Trình Học Tập
        </h3>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        className="h-56 mb-6 relative"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-green-50/50 
                        dark:from-blue-900/10 dark:to-green-900/10 rounded-2xl" />
        <div className="relative z-10 h-full">
          <Pie data={chartData} options={chartOptions} />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="grid grid-cols-2 gap-4 text-sm mb-6"
      >
        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 
                     p-4 rounded-xl border border-green-200 dark:border-green-700"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
            className="flex items-center justify-center mb-2"
          >
            <User className="text-green-500 mr-2" size={20} />
            <motion.div
              key={selfSolved}
              initial={{ scale: 1.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-3xl font-bold text-green-600 dark:text-green-400"
            >
              {selfSolved}
            </motion.div>
          </motion.div>
          <div className="text-green-700 dark:text-green-300 font-medium">
            Tự Giải Quyết
          </div>
          <div className="text-xs text-green-600 dark:text-green-400 mt-1">
            {total > 0 ? `${((selfSolved / total) * 100).toFixed(1)}%` : '0%'} tổng số
          </div>
        </motion.div>
        
        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 
                     p-4 rounded-xl border border-blue-200 dark:border-blue-700"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
            className="flex items-center justify-center mb-2"
          >
            <Brain className="text-blue-500 mr-2" size={20} />
            <motion.div
              key={aiSolved}
              initial={{ scale: 1.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-3xl font-bold text-blue-600 dark:text-blue-400"
            >
              {aiSolved}
            </motion.div>
          </motion.div>
          <div className="text-blue-700 dark:text-blue-300 font-medium">
            Hỏi AI
          </div>
          <div className="text-xs text-blue-600 dark:text-blue-400 mt-1">
            {total > 0 ? `${((aiSolved / total) * 100).toFixed(1)}%` : '0%'} tổng số
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="relative overflow-hidden p-4 bg-gradient-to-r from-gray-50 to-slate-50 
                   dark:from-gray-700 dark:to-slate-700 rounded-xl border border-gray-200 dark:border-gray-600"
      >
        {/* Background decoration */}
        <div className="absolute top-0 right-0 -mt-6 -mr-6 w-16 h-16 bg-gradient-to-br from-blue-100 to-green-100 
                        dark:from-blue-800/20 dark:to-green-800/20 rounded-full opacity-50" />
        
        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <TrendingUp className="text-gray-500 dark:text-gray-400" size={20} />
            <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
              Tỷ lệ tự lập:
            </span>
          </div>
          
          <motion.span
            key={total > 0 ? ((selfSolved / total) * 100).toFixed(1) : 0}
            initial={{ scale: 1.2, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className={`text-xl font-bold ${
              total > 0 && (selfSolved / total) >= 0.7 
                ? 'text-green-600 dark:text-green-400' 
                : total > 0 && (selfSolved / total) >= 0.5 
                  ? 'text-yellow-600 dark:text-yellow-400'
                  : 'text-red-600 dark:text-red-400'
            }`}
          >
            {total > 0 ? ((selfSolved / total) * 100).toFixed(1) : 0}%
          </motion.span>
        </div>

        {/* Progress bar */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ delay: 0.8, duration: 1 }}
          className="mt-3 w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2"
        >
          <motion.div
            initial={{ width: 0 }}
            animate={{ 
              width: total > 0 ? `${(selfSolved / total) * 100}%` : "0%" 
            }}
            transition={{ delay: 1, duration: 1, ease: "easeOut" }}
            className={`h-2 rounded-full transition-colors ${
              total > 0 && (selfSolved / total) >= 0.7 
                ? 'bg-green-500' 
                : total > 0 && (selfSolved / total) >= 0.5 
                  ? 'bg-yellow-500'
                  : 'bg-red-500'
            }`}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="text-xs text-gray-500 dark:text-gray-400 mt-2 text-center"
        >
          {total > 0 && (selfSolved / total) >= 0.7 
            ? '🎉 Xuất sắc! Bạn rất độc lập!'
            : total > 0 && (selfSolved / total) >= 0.5 
              ? '👍 Tốt! Tiếp tục cố gắng!'
              : '💪 Hãy thử tự giải quyết nhiều hơn!'
          }
        </motion.div>
      </motion.div>
    </motion.div>
  )
} 