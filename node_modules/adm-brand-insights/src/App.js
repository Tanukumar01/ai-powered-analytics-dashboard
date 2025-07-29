import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Toaster, toast } from 'react-hot-toast'
import Header from './components/layout/Header'
import MetricCard from './components/dashboard/MetricCard'
import RevenueChart from './components/dashboard/RevenueChart'
import UserGrowthChart from './components/dashboard/UserGrowthChart'
import ChannelPieChart from './components/dashboard/ChannelPieChart'
import DataTable from './components/dashboard/DataTable'
import AIPredictions from './components/dashboard/AIPredictions'
import AIAutoOptimizer from './components/dashboard/AIAutoOptimizer'
import AIChatAssistant from './components/dashboard/AIChatAssistant'
import AIAnomalyDetector from './components/dashboard/AIAnomalyDetector'
import AISentimentAnalyzer from './components/dashboard/AISentimentAnalyzer'
import {
  metricsData,
  revenueData,
  userGrowthData,
  channelData,
  campaignData,
  recentActivity,
  topProducts,
  geographicData,
  deviceData,
  timeData
} from './data/mockData'

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [currentMetrics, setCurrentMetrics] = useState(metricsData)

  // Simulate real-time updates
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
      toast.success('AI-powered dashboard loaded successfully!')
    }, 1500)

    // Simulate real-time metric updates
    const updateInterval = setInterval(() => {
      setCurrentMetrics(prev => ({
        revenue: {
          ...prev.revenue,
          current: prev.revenue.current + Math.floor(Math.random() * 1000 - 500)
        },
        users: {
          ...prev.users,
          current: prev.users.current + Math.floor(Math.random() * 10 - 5)
        },
        conversions: {
          ...prev.conversions,
          current: prev.conversions.current + Math.floor(Math.random() * 5 - 2)
        },
        growth: {
          ...prev.growth,
          current: prev.growth.current + (Math.random() * 0.2 - 0.1)
        }
      }))
    }, 10000) // Update every 10 seconds

    return () => {
      clearTimeout(timer)
      clearInterval(updateInterval)
    }
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-brand-500 mx-auto"></div>
          <h2 className="mt-4 text-xl font-semibold text-foreground">Loading ADmyBRAND Insights...</h2>
          <p className="mt-2 text-muted-foreground">Preparing your advanced AI-powered analytics dashboard</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Toaster position="top-right" />
      <Header />
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Welcome back, Admin! 👋
          </h1>
          <p className="text-muted-foreground">
            Your advanced AI-powered analytics dashboard is ready with intelligent insights and real-time monitoring
          </p>
        </motion.div>

        {/* Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard
            title="Total Revenue"
            value={currentMetrics.revenue.current}
            change={currentMetrics.revenue.change}
            trend={currentMetrics.revenue.trend}
            icon="revenue"
            type="currency"
          />
          <MetricCard
            title="Active Users"
            value={currentMetrics.users.current}
            change={currentMetrics.users.change}
            trend={currentMetrics.users.trend}
            icon="users"
            type="number"
          />
          <MetricCard
            title="Conversions"
            value={currentMetrics.conversions.current}
            change={currentMetrics.conversions.change}
            trend={currentMetrics.conversions.trend}
            icon="conversions"
            type="number"
          />
          <MetricCard
            title="Growth Rate"
            value={currentMetrics.growth.current}
            change={currentMetrics.growth.change}
            trend={currentMetrics.growth.trend}
            icon="growth"
            type="percentage"
          />
        </div>

        {/* AI Predictions Section */}
        <div className="mb-8">
          <AIPredictions />
        </div>

        {/* AI Anomaly Detector Section */}
        <div className="mb-8">
          <AIAnomalyDetector />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <RevenueChart data={revenueData} />
          <UserGrowthChart data={userGrowthData} />
        </div>

        {/* Traffic Sources Chart */}
        <div className="mb-8">
          <ChannelPieChart data={channelData} />
        </div>

        {/* AI Auto-Optimizer Section */}
        <div className="mb-8">
          <AIAutoOptimizer />
        </div>

        {/* AI Sentiment Analyzer Section */}
        <div className="mb-8">
          <AISentimentAnalyzer />
        </div>

        {/* Campaign Performance Table */}
        <div className="mb-8">
          <DataTable
            data={campaignData}
            title="Campaign Performance"
            description="Detailed performance metrics for all active campaigns"
          />
        </div>

        {/* AI Chat Assistant and Additional Insights */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* AI Chat Assistant */}
          <AIChatAssistant />

          {/* Additional Insights Grid */}
          <div className="space-y-6">
            {/* Top Products */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-lg p-6"
            >
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Top Products</h3>
              <div className="space-y-3">
                {topProducts.map((product, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{product.name}</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        {product.sales} sales • {product.revenue.toLocaleString()}
                      </p>
                    </div>
                    <span className={`text-xs font-medium ${
                      product.growth > 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {product.growth > 0 ? '+' : ''}{product.growth}%
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Geographic Performance */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-lg p-6"
            >
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Top Markets</h3>
              <div className="space-y-3">
                {geographicData.slice(0, 5).map((country, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{country.country}</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        {country.users.toLocaleString()} users
                      </p>
                    </div>
                    <span className="text-xs font-medium text-green-600">
                      +{country.growth}%
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Device Distribution */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-lg p-6"
            >
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Device Usage</h3>
              <div className="space-y-3">
                {deviceData.map((device, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-900 dark:text-gray-100">{device.device}</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-16 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div
                          className="bg-brand-500 h-2 rounded-full"
                          style={{ width: `${device.percentage}%` }}
                        ></div>
                      </div>
                      <span className="text-xs text-gray-600 dark:text-gray-400">{device.percentage}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-lg p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Recent Activity</h3>
          <div className="space-y-3">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-center space-x-3">
                <div className={`w-2 h-2 rounded-full ${
                  activity.status === 'success' ? 'bg-green-500' :
                  activity.status === 'warning' ? 'bg-yellow-500' :
                  activity.status === 'info' ? 'bg-blue-500' :
                  'bg-gray-500'
                }`}></div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900 dark:text-gray-100">{activity.action}</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </main>
    </div>
  )
}

export default App 