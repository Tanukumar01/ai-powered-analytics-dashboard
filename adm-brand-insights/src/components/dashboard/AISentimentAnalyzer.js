import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Heart, MessageCircle, Smile, Frown, Meh, TrendingUp, Users, Star, Activity } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card'
import { Badge } from '../ui/Badge'
import { Button } from '../ui/Button'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts'

const AISentimentAnalyzer = () => {
  const [sentimentData, setSentimentData] = useState({
    overall: 78,
    positive: 65,
    neutral: 20,
    negative: 15,
    trend: 'up',
    change: 12
  })

  const [feedback, setFeedback] = useState([
    {
      id: 1,
      text: "Amazing product! The quality exceeded my expectations. Highly recommend!",
      sentiment: 'positive',
      score: 0.92,
      source: 'Website Review',
      timestamp: '2 hours ago',
      category: 'Product Quality',
      keywords: ['amazing', 'quality', 'recommend']
    },
    {
      id: 2,
      text: "Customer service was terrible. Waited 30 minutes on hold.",
      sentiment: 'negative',
      score: 0.15,
      source: 'Social Media',
      timestamp: '4 hours ago',
      category: 'Customer Service',
      keywords: ['terrible', 'waited', 'hold']
    },
    {
      id: 3,
      text: "The app works fine, nothing special but gets the job done.",
      sentiment: 'neutral',
      score: 0.48,
      source: 'App Store',
      timestamp: '6 hours ago',
      category: 'User Experience',
      keywords: ['works', 'fine', 'done']
    },
    {
      id: 4,
      text: "Love the new features! Interface is so intuitive now.",
      sentiment: 'positive',
      score: 0.89,
      source: 'Email Survey',
      timestamp: '1 day ago',
      category: 'User Experience',
      keywords: ['love', 'features', 'intuitive']
    },
    {
      id: 5,
      text: "Pricing is too high for what you get. Not worth it.",
      sentiment: 'negative',
      score: 0.23,
      source: 'Website Review',
      timestamp: '1 day ago',
      category: 'Pricing',
      keywords: ['pricing', 'high', 'worth']
    }
  ])

  const [sentimentTrend, setSentimentTrend] = useState([
    { day: 'Mon', positive: 62, neutral: 25, negative: 13 },
    { day: 'Tue', positive: 68, neutral: 22, negative: 10 },
    { day: 'Wed', positive: 71, neutral: 20, negative: 9 },
    { day: 'Thu', positive: 65, neutral: 23, negative: 12 },
    { day: 'Fri', positive: 75, neutral: 18, negative: 7 },
    { day: 'Sat', positive: 78, neutral: 17, negative: 5 },
    { day: 'Sun', positive: 82, neutral: 15, negative: 3 }
  ])

  const [isAnalyzing, setIsAnalyzing] = useState(false)

  useEffect(() => {
    // Simulate real-time sentiment analysis
    const interval = setInterval(() => {
      setIsAnalyzing(true)
      setTimeout(() => {
        setSentimentData(prev => ({
          ...prev,
          overall: prev.overall + Math.floor(Math.random() * 6 - 3),
          positive: prev.positive + Math.floor(Math.random() * 4 - 2),
          neutral: prev.neutral + Math.floor(Math.random() * 3 - 1),
          negative: prev.negative + Math.floor(Math.random() * 3 - 1)
        }))
        setIsAnalyzing(false)
      }, 2000)
    }, 60000) // Update every minute

    return () => clearInterval(interval)
  }, [])

  const getSentimentIcon = (sentiment) => {
    switch (sentiment) {
      case 'positive': return <Smile className="w-5 h-5 text-green-600" />
      case 'negative': return <Frown className="w-5 h-5 text-red-600" />
      case 'neutral': return <Meh className="w-5 h-5 text-yellow-600" />
      default: return <MessageCircle className="w-5 h-5 text-gray-600" />
    }
  }

  const getSentimentColor = (sentiment) => {
    switch (sentiment) {
      case 'positive': return 'bg-green-50 text-green-700 border-green-200'
      case 'negative': return 'bg-red-50 text-red-700 border-red-200'
      case 'neutral': return 'bg-yellow-50 text-yellow-700 border-yellow-200'
      default: return 'bg-gray-50 text-gray-700 border-gray-200'
    }
  }

  const getSourceIcon = (source) => {
    switch (source) {
      case 'Website Review': return <Star className="w-4 h-4" />
      case 'Social Media': return <MessageCircle className="w-4 h-4" />
      case 'App Store': return <Users className="w-4 h-4" />
      case 'Email Survey': return <Heart className="w-4 h-4" />
      default: return <Activity className="w-4 h-4" />
    }
  }

  const pieData = [
    { name: 'Positive', value: sentimentData.positive, color: '#10b981' },
    { name: 'Neutral', value: sentimentData.neutral, color: '#f59e0b' },
    { name: 'Negative', value: sentimentData.negative, color: '#ef4444' }
  ]

  return (
    <div className="space-y-6">
      {/* AI Sentiment Analyzer Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-gradient-to-r from-pink-500 to-purple-500 rounded-lg">
            <Heart className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-foreground">AI Sentiment Analyzer</h2>
            <p className="text-muted-foreground">Customer feedback and social media sentiment analysis</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          {isAnalyzing && (
            <Badge variant="secondary" className="animate-pulse">
              <Activity className="w-3 h-3 mr-1" />
              Analyzing...
            </Badge>
          )}
          <Badge variant="outline" className="flex items-center space-x-1">
            <TrendingUp className="w-3 h-3" />
            <span>+{sentimentData.change}%</span>
          </Badge>
        </div>
      </motion.div>

      {/* Sentiment Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-0 shadow-lg">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Overall Score</p>
                <p className="text-2xl font-bold text-foreground">{sentimentData.overall}/100</p>
              </div>
              <div className="p-2 bg-gradient-to-r from-green-100 to-blue-100 rounded-lg">
                <Smile className="w-5 h-5 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Positive</p>
                <p className="text-2xl font-bold text-green-600">{sentimentData.positive}%</p>
              </div>
              <div className="p-2 bg-green-100 rounded-lg">
                <Smile className="w-5 h-5 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Neutral</p>
                <p className="text-2xl font-bold text-yellow-600">{sentimentData.neutral}%</p>
              </div>
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Meh className="w-5 h-5 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Negative</p>
                <p className="text-2xl font-bold text-red-600">{sentimentData.negative}%</p>
              </div>
              <div className="p-2 bg-red-100 rounded-lg">
                <Frown className="w-5 h-5 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sentiment Analysis Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sentiment Distribution */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Heart className="w-5 h-5 text-pink-600" />
              <span>Sentiment Distribution</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value}%`, 'Sentiment']} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Sentiment Trend */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-blue-600" />
              <span>Sentiment Trend</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={sentimentTrend}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="positive" fill="#10b981" stackId="a" />
                <Bar dataKey="neutral" fill="#f59e0b" stackId="a" />
                <Bar dataKey="negative" fill="#ef4444" stackId="a" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Feedback */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <MessageCircle className="w-5 h-5 text-purple-600" />
            <span>Recent Customer Feedback</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {feedback.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-4 border rounded-lg hover:shadow-md transition-shadow"
              >
                <div className="flex items-start space-x-3">
                  {getSentimentIcon(item.sentiment)}
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <Badge className={`text-xs ${getSentimentColor(item.sentiment)}`}>
                          {item.sentiment}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {Math.round(item.score * 100)}% confidence
                        </Badge>
                      </div>
                      <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                        {getSourceIcon(item.source)}
                        <span>{item.source}</span>
                      </div>
                    </div>
                    <p className="text-sm text-foreground mb-2">{item.text}</p>
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center space-x-4">
                        <span className="text-muted-foreground">{item.category}</span>
                        <span className="text-muted-foreground">{item.timestamp}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        {item.keywords.map((keyword, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs">
                            {keyword}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default AISentimentAnalyzer