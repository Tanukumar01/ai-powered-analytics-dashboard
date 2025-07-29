import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { AlertTriangle, TrendingDown, TrendingUp, Activity, Zap, Bell, Eye, Shield } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card'
import { Badge } from '../ui/Badge'
import { Button } from '../ui/Button'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts'

const AIAnomalyDetector = () => {
  const [anomalies, setAnomalies] = useState([
    {
      id: 1,
      type: 'spike',
      metric: 'Conversion Rate',
      severity: 'high',
      description: 'Unusual 45% spike in conversion rate detected',
      timestamp: '2 minutes ago',
      value: 8.5,
      normalRange: '2.1 - 4.2',
      confidence: 94,
      status: 'active',
      impact: 'positive',
      recommendation: 'Investigate traffic source quality'
    },
    {
      id: 2,
      type: 'drop',
      metric: 'Revenue',
      severity: 'medium',
      description: 'Revenue dropped 23% below expected range',
      timestamp: '15 minutes ago',
      value: 485000,
      normalRange: '520000 - 580000',
      confidence: 87,
      status: 'investigating',
      impact: 'negative',
      recommendation: 'Check campaign performance and ad spend'
    },
    {
      id: 3,
      type: 'pattern',
      metric: 'User Engagement',
      severity: 'low',
      description: 'New usage pattern detected during off-peak hours',
      timestamp: '1 hour ago',
      value: 85,
      normalRange: '60 - 75',
      confidence: 76,
      status: 'monitoring',
      impact: 'neutral',
      recommendation: 'Monitor for sustained pattern change'
    },
    {
      id: 4,
      type: 'trend',
      metric: 'Bounce Rate',
      severity: 'high',
      description: 'Bounce rate increasing trend detected',
      timestamp: '3 hours ago',
      value: 68,
      normalRange: '45 - 55',
      confidence: 91,
      status: 'resolved',
      impact: 'negative',
      recommendation: 'Optimize landing page experience'
    }
  ])

  const [isMonitoring, setIsMonitoring] = useState(true)
  const [detectionStats, setDetectionStats] = useState({
    total: 24,
    resolved: 18,
    active: 4,
    falsePositive: 2
  })

  const [anomalyData, setAnomalyData] = useState([
    { time: '00:00', value: 2.1, threshold: 4.2, anomaly: false },
    { time: '02:00', value: 2.3, threshold: 4.2, anomaly: false },
    { time: '04:00', value: 2.0, threshold: 4.2, anomaly: false },
    { time: '06:00', value: 2.5, threshold: 4.2, anomaly: false },
    { time: '08:00', value: 2.8, threshold: 4.2, anomaly: false },
    { time: '10:00', value: 3.1, threshold: 4.2, anomaly: false },
    { time: '12:00', value: 8.5, threshold: 4.2, anomaly: true },
    { time: '14:00', value: 7.2, threshold: 4.2, anomaly: true },
    { time: '16:00', value: 4.8, threshold: 4.2, anomaly: true },
    { time: '18:00', value: 3.5, threshold: 4.2, anomaly: false },
    { time: '20:00', value: 3.2, threshold: 4.2, anomaly: false },
    { time: '22:00', value: 2.9, threshold: 4.2, anomaly: false }
  ])

  useEffect(() => {
    // Simulate real-time anomaly detection
    const interval = setInterval(() => {
      if (isMonitoring && Math.random() > 0.8) {
        const newAnomaly = {
          id: Date.now(),
          type: Math.random() > 0.5 ? 'spike' : 'drop',
          metric: ['Conversion Rate', 'Revenue', 'User Engagement', 'Bounce Rate'][Math.floor(Math.random() * 4)],
          severity: ['low', 'medium', 'high'][Math.floor(Math.random() * 3)],
          description: `New anomaly detected in ${['Conversion Rate', 'Revenue', 'User Engagement', 'Bounce Rate'][Math.floor(Math.random() * 4)]}`,
          timestamp: 'Just now',
          value: Math.floor(Math.random() * 1000),
          normalRange: '2.1 - 4.2',
          confidence: Math.floor(Math.random() * 20) + 80,
          status: 'active',
          impact: Math.random() > 0.5 ? 'positive' : 'negative',
          recommendation: 'AI is analyzing the pattern...'
        }
        setAnomalies(prev => [newAnomaly, ...prev.slice(0, 9)])
      }
    }, 30000) // Check every 30 seconds

    return () => clearInterval(interval)
  }, [isMonitoring])

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high': return 'bg-red-50 text-red-700 border-red-200'
      case 'medium': return 'bg-yellow-50 text-yellow-700 border-yellow-200'
      case 'low': return 'bg-blue-50 text-blue-700 border-blue-200'
      default: return 'bg-gray-50 text-gray-700 border-gray-200'
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-red-100 text-red-800'
      case 'investigating': return 'bg-yellow-100 text-yellow-800'
      case 'monitoring': return 'bg-blue-100 text-blue-800'
      case 'resolved': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getImpactIcon = (impact) => {
    switch (impact) {
      case 'positive': return <TrendingUp className="w-4 h-4 text-green-600" />
      case 'negative': return <TrendingDown className="w-4 h-4 text-red-600" />
      default: return <Activity className="w-4 h-4 text-blue-600" />
    }
  }

  const resolveAnomaly = (id) => {
    setAnomalies(prev => 
      prev.map(anomaly => 
        anomaly.id === id ? { ...anomaly, status: 'resolved' } : anomaly
      )
    )
  }

  const dismissAnomaly = (id) => {
    setAnomalies(prev => prev.filter(anomaly => anomaly.id !== id))
  }

  return (
    <div className="space-y-6">
      {/* AI Anomaly Detector Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-gradient-to-r from-red-500 to-orange-500 rounded-lg">
            <AlertTriangle className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-foreground">AI Anomaly Detector</h2>
            <p className="text-muted-foreground">Real-time pattern detection and alerts</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <Badge variant={isMonitoring ? "default" : "secondary"} className="flex items-center space-x-1">
            <Activity className="w-3 h-3" />
            <span>{isMonitoring ? 'Monitoring' : 'Paused'}</span>
          </Badge>
          <Button
            onClick={() => setIsMonitoring(!isMonitoring)}
            variant={isMonitoring ? "outline" : "default"}
            size="sm"
          >
            {isMonitoring ? 'Pause' : 'Resume'}
          </Button>
        </div>
      </motion.div>

      {/* Detection Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-0 shadow-lg">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Detected</p>
                <p className="text-2xl font-bold text-foreground">{detectionStats.total}</p>
              </div>
              <div className="p-2 bg-blue-100 rounded-lg">
                <Eye className="w-5 h-5 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Resolved</p>
                <p className="text-2xl font-bold text-green-600">{detectionStats.resolved}</p>
              </div>
              <div className="p-2 bg-green-100 rounded-lg">
                <Shield className="w-5 h-5 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active</p>
                <p className="text-2xl font-bold text-red-600">{detectionStats.active}</p>
              </div>
              <div className="p-2 bg-red-100 rounded-lg">
                <Bell className="w-5 h-5 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Accuracy</p>
                <p className="text-2xl font-bold text-purple-600">
                  {Math.round(((detectionStats.total - detectionStats.falsePositive) / detectionStats.total) * 100)}%
                </p>
              </div>
              <div className="p-2 bg-purple-100 rounded-lg">
                <Zap className="w-5 h-5 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Anomaly Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Activity className="w-5 h-5 text-red-600" />
              <span>Anomaly Detection Chart</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={anomalyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Area 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#ef4444" 
                  fill="#fef2f2" 
                  strokeWidth={2}
                />
                <Area 
                  type="monotone" 
                  dataKey="threshold" 
                  stroke="#6b7280" 
                  fill="transparent" 
                  strokeDasharray="5 5"
                  strokeWidth={1}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Recent Anomalies */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Bell className="w-5 h-5 text-orange-600" />
              <span>Recent Anomalies</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {anomalies.slice(0, 5).map((anomaly, index) => (
                <motion.div
                  key={anomaly.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-3 border rounded-lg hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3 flex-1">
                      {getImpactIcon(anomaly.impact)}
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="text-sm font-semibold text-foreground">{anomaly.metric}</h4>
                          <div className="flex items-center space-x-2">
                            <Badge className={`text-xs ${getSeverityColor(anomaly.severity)}`}>
                              {anomaly.severity}
                            </Badge>
                            <Badge className={`text-xs ${getStatusColor(anomaly.status)}`}>
                              {anomaly.status}
                            </Badge>
                          </div>
                        </div>
                        <p className="text-xs text-muted-foreground mb-2">{anomaly.description}</p>
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-muted-foreground">{anomaly.timestamp}</span>
                          <span className="text-muted-foreground">{anomaly.confidence}% confidence</span>
                        </div>
                      </div>
                    </div>
                    {anomaly.status === 'active' && (
                      <div className="flex items-center space-x-1 ml-2">
                        <Button
                          onClick={() => resolveAnomaly(anomaly.id)}
                          size="sm"
                          variant="outline"
                          className="text-green-600 border-green-600 hover:bg-green-50"
                        >
                          Resolve
                        </Button>
                        <Button
                          onClick={() => dismissAnomaly(anomaly.id)}
                          size="sm"
                          variant="outline"
                          className="text-red-600 border-red-600 hover:bg-red-50"
                        >
                          Dismiss
                        </Button>
                      </div>
                    )}
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

export default AIAnomalyDetector