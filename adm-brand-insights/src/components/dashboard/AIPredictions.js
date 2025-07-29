import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, Brain, Zap, Target, AlertTriangle, CheckCircle } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card'
import { Badge } from '../ui/Badge'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const AIPredictions = () => {
  const [predictions, setPredictions] = useState({
    revenue: { current: 485000, predicted: 520000, confidence: 87 },
    conversions: { current: 6250, predicted: 6800, confidence: 92 },
    users: { current: 57800, predicted: 61200, confidence: 89 },
    growth: { current: 12.5, predicted: 14.2, confidence: 85 }
  })

  const [aiInsights, setAiInsights] = useState([
    {
      id: 1,
      type: 'opportunity',
      title: 'High-Performing Campaign Detected',
      description: 'Your "Black Friday" campaign is performing 23% above average. Consider increasing budget allocation.',
      impact: 'high',
      confidence: 94,
      action: 'Increase budget by 15%'
    },
    {
      id: 2,
      type: 'alert',
      title: 'Conversion Rate Decline',
      description: 'Mobile conversion rate dropped 8% this week. AI suggests optimizing mobile landing pages.',
      impact: 'medium',
      confidence: 87,
      action: 'Review mobile UX'
    },
    {
      id: 3,
      type: 'trend',
      title: 'Seasonal Pattern Identified',
      description: 'AI detected a 15% increase in user engagement during evening hours. Consider time-based targeting.',
      impact: 'low',
      confidence: 76,    
      action: 'Adjust ad scheduling'
    },
    {
      id: 4,
      type: 'opportunity',
      title: 'Cross-Platform Synergy',
      description: 'Google Ads + Facebook Ads combination shows 31% better ROI than individual platforms.',
      impact: 'high',
      confidence: 91,
      action: 'Optimize cross-platform strategy'
    }
  ])

  const [isAnalyzing, setIsAnalyzing] = useState(false)

  useEffect(() => {
    // Simulate AI analysis
    const interval = setInterval(() => {
      setIsAnalyzing(true)
      setTimeout(() => {
        setPredictions(prev => ({
          revenue: { ...prev.revenue, predicted: prev.revenue.predicted + Math.floor(Math.random() * 5000 - 2500) },
          conversions: { ...prev.conversions, predicted: prev.conversions.predicted + Math.floor(Math.random() * 100 - 50) },
          users: { ...prev.users, predicted: prev.users.predicted + Math.floor(Math.random() * 500 - 250) },
          growth: { ...prev.growth, predicted: prev.growth.predicted + (Math.random() * 0.5 - 0.25) }
        }))
        setIsAnalyzing(false)
      }, 2000)
    }, 30000) // Update every 30 seconds

    return () => clearInterval(interval)
  }, [])

  const getInsightIcon = (type) => {
    switch (type) {
      case 'opportunity': return <TrendingUp className="w-5 h-5 text-green-600" />
      case 'alert': return <AlertTriangle className="w-5 h-5 text-yellow-600" />
      case 'trend': return <Target className="w-5 h-5 text-blue-600" />
      default: return <Brain className="w-5 h-5 text-purple-600" />
    }
  }

  const getImpactColor = (impact) => {
    switch (impact) {
      case 'high': return 'bg-red-50 text-red-700 border-red-200'
      case 'medium': return 'bg-yellow-50 text-yellow-700 border-yellow-200'
      case 'low': return 'bg-blue-50 text-blue-700 border-blue-200'
      default: return 'bg-gray-50 text-gray-700 border-gray-200'
    }
  }

  const predictionData = [
    { month: 'Current', revenue: predictions.revenue.current, predicted: predictions.revenue.predicted },
    { month: 'Next Month', revenue: predictions.revenue.current * 1.05, predicted: predictions.revenue.predicted * 1.03 },
    { month: '2 Months', revenue: predictions.revenue.current * 1.1, predicted: predictions.revenue.predicted * 1.06 },
    { month: '3 Months', revenue: predictions.revenue.current * 1.15, predicted: predictions.revenue.predicted * 1.09 }
  ]

  return (
    <div className="space-y-6">
      {/* AI Predictions Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center space-x-3"
      >
        <div className="p-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg">
          <Brain className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-foreground">AI Predictions</h2>
          <p className="text-muted-foreground">Machine learning insights and forecasts</p>
        </div>
        {isAnalyzing && (
          <Badge variant="secondary" className="animate-pulse">
            <Zap className="w-3 h-3 mr-1" />
            Analyzing...
          </Badge>
        )}
      </motion.div>

      {/* Prediction Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {Object.entries(predictions).map(([key, value]) => (
          <motion.div
            key={key}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-medium text-muted-foreground capitalize">
                    {key} Prediction
                  </h3>
                  <Badge variant="outline" className="text-xs">
                    {value.confidence}% confidence
                  </Badge>
                </div>
                <div className="space-y-1">
                  <p className="text-2xl font-bold text-foreground">
                    {key === 'revenue' ? `$${(value.predicted / 1000).toFixed(0)}k` :
                     key === 'growth' ? `${value.predicted.toFixed(1)}%` :
                     value.predicted.toLocaleString()}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Current: {key === 'revenue' ? `$${(value.current / 1000).toFixed(0)}k` :
                             key === 'growth' ? `${value.current.toFixed(1)}%` :
                             value.current.toLocaleString()}
                  </p>
                  <div className="flex items-center space-x-1">
                    <TrendingUp className="w-3 h-3 text-green-600" />
                    <span className="text-xs text-green-600 font-medium">
                      +{(((value.predicted - value.current) / value.current) * 100).toFixed(1)}%
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* AI Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Prediction Chart */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-brand-600" />
              <span>Revenue Forecast</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={predictionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => [`$${(value / 1000).toFixed(0)}k`, 'Revenue']} />
                <Legend />
                <Line type="monotone" dataKey="revenue" stroke="#8884d8" strokeWidth={2} />
                <Line type="monotone" dataKey="predicted" stroke="#0ea5e9" strokeWidth={2} strokeDasharray="5 5" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* AI Insights List */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Brain className="w-5 h-5 text-purple-600" />
              <span>AI Insights</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {aiInsights.map((insight, index) => (
                <motion.div
                  key={insight.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-3 border rounded-lg hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start space-x-3">
                    {getInsightIcon(insight.type)}
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="text-sm font-semibold text-foreground">{insight.title}</h4>
                        <Badge className={`text-xs ${getImpactColor(insight.impact)}`}>
                          {insight.impact} impact
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mb-2">{insight.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">
                          {insight.confidence}% confidence
                        </span>
                        <span className="text-xs font-medium text-brand-600">
                          {insight.action}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default AIPredictions