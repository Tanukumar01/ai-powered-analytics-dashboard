import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Settings, Play, Pause, Target, TrendingUp, DollarSign, Users, Zap, CheckCircle } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card'
import { Button } from '../ui/Button'
import { Badge } from '../ui/Badge'

const AIAutoOptimizer = () => {
  const [optimizations, setOptimizations] = useState([
    {
      id: 1,
      type: 'budget',
      campaign: 'Black Friday',
      current: 73200,
      suggested: 85000,
      impact: 'high',
      confidence: 94,
      status: 'pending',
      description: 'Increase budget allocation based on high conversion rate',
      potentialGain: '+18% revenue'
    },
    {
      id: 2,
      type: 'targeting',
      campaign: 'Holiday Special',
      current: 'Broad',
      suggested: 'Custom Audiences',
      impact: 'medium',
      confidence: 87,
      status: 'applied',
      description: 'Switch to custom audience targeting for better ROI',
      potentialGain: '+12% conversions'
    },
    {
      id: 3,
      type: 'bidding',
      campaign: 'Summer Sale',
      current: 'Manual',
      suggested: 'Auto Bidding',
      impact: 'low',
      confidence: 76,
      status: 'pending',
      description: 'Enable automated bidding for optimal cost management',
      potentialGain: '+8% efficiency'
    },
    {
      id: 4,
      type: 'creative',
      campaign: 'New Year',
      current: 'Static',
      suggested: 'Dynamic',
      impact: 'medium',
      confidence: 82,
      status: 'applied',
      description: 'Implement dynamic creative optimization',
      potentialGain: '+15% engagement'
    }
  ])

  const [autoMode, setAutoMode] = useState(false)
  const [isOptimizing, setIsOptimizing] = useState(false)

  useEffect(() => {
    if (autoMode) {
      const interval = setInterval(() => {
        setIsOptimizing(true)
        setTimeout(() => {
          // Simulate AI optimization
          setOptimizations(prev => 
            prev.map(opt => 
              Math.random() > 0.7 ? { ...opt, status: 'applied' } : opt
            )
          )
          setIsOptimizing(false)
        }, 2000)
      }, 60000) // Check every minute

      return () => clearInterval(interval)
    }
  }, [autoMode])

  const getOptimizationIcon = (type) => {
    switch (type) {
      case 'budget': return <DollarSign className="w-5 h-5 text-green-600" />
      case 'targeting': return <Target className="w-5 h-5 text-blue-600" />
      case 'bidding': return <TrendingUp className="w-5 h-5 text-purple-600" />
      case 'creative': return <Users className="w-5 h-5 text-orange-600" />
      default: return <Settings className="w-5 h-5 text-gray-600" />
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

  const getStatusColor = (status) => {
    switch (status) {
      case 'applied': return 'bg-green-100 text-green-800'
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'rejected': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const applyOptimization = (id) => {
    setOptimizations(prev => 
      prev.map(opt => 
        opt.id === id ? { ...opt, status: 'applied' } : opt
      )
    )
  }

  const rejectOptimization = (id) => {
    setOptimizations(prev => 
      prev.map(opt => 
        opt.id === id ? { ...opt, status: 'rejected' } : opt
      )
    )
  }

  const appliedOptimizations = optimizations.filter(opt => opt.status === 'applied').length
  const pendingOptimizations = optimizations.filter(opt => opt.status === 'pending').length

  return (
    <div className="space-y-6">
      {/* AI Auto-Optimizer Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg">
            <Settings className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-foreground">AI Auto-Optimizer</h2>
            <p className="text-muted-foreground">Automated campaign optimization</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          {isOptimizing && (
            <Badge variant="secondary" className="animate-pulse">
              <Zap className="w-3 h-3 mr-1" />
              Optimizing...
            </Badge>
          )}
          <Button
            onClick={() => setAutoMode(!autoMode)}
            variant={autoMode ? "default" : "outline"}
            size="sm"
            className="flex items-center space-x-2"
          >
            {autoMode ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            <span>{autoMode ? 'Auto Mode ON' : 'Auto Mode OFF'}</span>
          </Button>
        </div>
      </motion.div>

      {/* Optimization Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-0 shadow-lg">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Applied</p>
                <p className="text-2xl font-bold text-green-600">{appliedOptimizations}</p>
              </div>
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Pending</p>
                <p className="text-2xl font-bold text-yellow-600">{pendingOptimizations}</p>
              </div>
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Target className="w-5 h-5 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Success Rate</p>
                <p className="text-2xl font-bold text-blue-600">
                  {optimizations.length > 0 ? Math.round((appliedOptimizations / optimizations.length) * 100) : 0}%
                </p>
              </div>
              <div className="p-2 bg-blue-100 rounded-lg">
                <TrendingUp className="w-5 h-5 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Optimization Suggestions */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Target className="w-5 h-5 text-brand-600" />
            <span>AI Optimization Suggestions</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {optimizations.map((optimization, index) => (
              <motion.div
                key={optimization.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-4 border rounded-lg hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3 flex-1">
                    {getOptimizationIcon(optimization.type)}
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-sm font-semibold text-foreground">
                          {optimization.campaign} - {optimization.type.charAt(0).toUpperCase() + optimization.type.slice(1)}
                        </h4>
                        <div className="flex items-center space-x-2">
                          <Badge className={`text-xs ${getImpactColor(optimization.impact)}`}>
                            {optimization.impact} impact
                          </Badge>
                          <Badge className={`text-xs ${getStatusColor(optimization.status)}`}>
                            {optimization.status}
                          </Badge>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground mb-2">{optimization.description}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 text-xs">
                          <span className="text-muted-foreground">
                            Current: {typeof optimization.current === 'number' ? `$${(optimization.current / 1000).toFixed(0)}k` : optimization.current}
                          </span>
                          <span className="text-muted-foreground">
                            Suggested: {typeof optimization.suggested === 'number' ? `$${(optimization.suggested / 1000).toFixed(0)}k` : optimization.suggested}
                          </span>
                          <span className="text-green-600 font-medium">
                            {optimization.potentialGain}
                          </span>
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {optimization.confidence}% confidence
                        </span>
                      </div>
                    </div>
                  </div>
                  {optimization.status === 'pending' && (
                    <div className="flex items-center space-x-2 ml-4">
                      <Button
                        onClick={() => applyOptimization(optimization.id)}
                        size="sm"
                        variant="outline"
                        className="text-green-600 border-green-600 hover:bg-green-50"
                      >
                        Apply
                      </Button>
                      <Button
                        onClick={() => rejectOptimization(optimization.id)}
                        size="sm"
                        variant="outline"
                        className="text-red-600 border-red-600 hover:bg-red-50"
                      >
                        Reject
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
  )
}

export default AIAutoOptimizer