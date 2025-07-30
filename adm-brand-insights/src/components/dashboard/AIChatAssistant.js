import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, Send, Bot, User, Sparkles, TrendingUp, AlertTriangle, Lightbulb } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card'
import { Button } from '../ui/Button'
import { Badge } from '../ui/Badge'

const AIChatAssistant = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'ai',
      content: "Hello! I'm your AI analytics assistant. I can help you understand your data, find insights, and optimize your campaigns. What would you like to know?",
      timestamp: new Date(),
      suggestions: [
        "Show me top performing campaigns",
        "What's causing the conversion drop?",
        "Predict next month's revenue",
        "Optimize my ad spend"
      ]
    }
  ])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const aiResponses = {
    'performance': {
      content: "Your top performing campaigns are:\n\n1. **Black Friday** - 23% above average ROI\n2. **Holiday Special** - 18% conversion rate\n3. **Cyber Monday** - 31% revenue growth\n\nI recommend increasing budget allocation to these campaigns.",
      type: 'insight',
      data: { revenue: 485000, growth: 12.5 }
    },
    'conversion': {
      content: "I've analyzed your conversion data and found:\n\n• Mobile conversion rate dropped 8% this week\n• Desktop conversions are stable (+2%)\n• Email campaigns show 15% better conversion\n\n**Recommendation:** Optimize mobile landing pages and increase email marketing budget.",
      type: 'alert',
      data: { conversions: 6250, change: -8 }
    },
    'revenue': {
      content: "Based on current trends and historical data, I predict:\n\n• **Next Month:** $520k (+7.2%)\n• **Q1 2025:** $1.8M (+15%)\n• **Confidence Level:** 87%\n\nKey drivers: Holiday season, improved targeting, and new product launches.",
      type: 'prediction',
      data: { predicted: 520000, confidence: 87 }
    },
    'optimize': {
      content: "Here are my optimization recommendations:\n\n1. **Budget Reallocation:** Move 15% from underperforming to top campaigns\n2. **Targeting:** Switch to custom audiences (+12% expected)\n3. **Bidding:** Enable auto-bidding for efficiency\n4. **Creative:** Implement dynamic ads (+15% engagement)\n\nExpected impact: +18% overall ROI",
      type: 'optimization',
      data: { potentialGain: 18 }
    }
  }

  const handleSendMessage = async (message) => {
    if (!message.trim()) return

    // Add user message
    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: message,
      timestamp: new Date()
    }
    setMessages(prev => [...prev, userMessage])
    setInputValue('')

    // Simulate AI thinking
    setIsTyping(true)
    await new Promise(resolve => setTimeout(resolve, 1500))

    // Generate AI response
    let aiResponse = {
      id: Date.now() + 1,
      type: 'ai',
      content: "I understand you're asking about your analytics. Let me analyze the data and provide you with actionable insights.",
      timestamp: new Date(),
      type: 'general'
    }

    // Match keywords to specific responses
    const lowerMessage = message.toLowerCase()
    if (lowerMessage.includes('performance') || lowerMessage.includes('top') || lowerMessage.includes('best')) {
      aiResponse = {
        ...aiResponse,
        content: aiResponses.performance.content,
        type: 'insight',
        data: aiResponses.performance.data
      }
    } else if (lowerMessage.includes('conversion') || lowerMessage.includes('drop') || lowerMessage.includes('decline')) {
      aiResponse = {
        ...aiResponse,
        content: aiResponses.conversion.content,
        type: 'alert',
        data: aiResponses.conversion.data
      }
    } else if (lowerMessage.includes('revenue') || lowerMessage.includes('predict') || lowerMessage.includes('forecast')) {
      aiResponse = {
        ...aiResponse,
        content: aiResponses.revenue.content,
        type: 'prediction',
        data: aiResponses.revenue.data
      }
    } else if (lowerMessage.includes('optimize') || lowerMessage.includes('improve') || lowerMessage.includes('better')) {
      aiResponse = {
        ...aiResponse,
        content: aiResponses.optimize.content,
        type: 'optimization',
        data: aiResponses.optimize.data
      }
    }

    setMessages(prev => [...prev, aiResponse])
    setIsTyping(false)
  }

  const handleSuggestionClick = (suggestion) => {
    handleSendMessage(suggestion)
  }

  const getMessageIcon = (type) => {
    switch (type) {
      case 'insight': return <TrendingUp className="w-4 h-4 text-green-600" />
      case 'alert': return <AlertTriangle className="w-4 h-4 text-yellow-600" />
      case 'prediction': return <Sparkles className="w-4 h-4 text-purple-600" />
      case 'optimization': return <Lightbulb className="w-4 h-4 text-blue-600" />
      default: return <Bot className="w-4 h-4 text-brand-600" />
    }
  }

  const getMessageStyle = (type) => {
    switch (type) {
      case 'insight': return 'border-l-4 border-l-green-500 bg-green-50 dark:bg-green-900/20'
      case 'alert': return 'border-l-4 border-l-yellow-500 bg-yellow-50 dark:bg-yellow-900/20'
      case 'prediction': return 'border-l-4 border-l-purple-500 bg-purple-50 dark:bg-purple-900/20'
      case 'optimization': return 'border-l-4 border-l-blue-500 bg-blue-50 dark:bg-blue-900/20'
      default: return 'border-l-4 border-l-brand-500 bg-brand-50 dark:bg-brand-900/20'
    }
  }

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
    >
      <Card className="border-0 shadow-lg h-[500px] sm:h-[600px] flex flex-col">
        <CardHeader className="p-4 sm:p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-brand-500 to-purple-600 rounded-full flex items-center justify-center">
              <Bot className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </div>
            <div>
              <CardTitle className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">
                AI Analytics Assistant
              </CardTitle>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Ask me anything about your data
              </p>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-0 flex-1 flex flex-col">
          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
            <AnimatePresence>
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[85%] sm:max-w-[75%] ${message.type === 'user' ? 'order-2' : 'order-1'}`}>
                    <div className={`flex items-start space-x-2 ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                      <div className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                        message.type === 'user' 
                          ? 'bg-brand-500' 
                          : 'bg-gradient-to-br from-brand-500 to-purple-600'
                      }`}>
                        {getMessageIcon(message.type)}
                      </div>
                      <div className={`rounded-lg p-3 sm:p-4 ${getMessageStyle(message.type)}`}>
                        <div className="text-sm sm:text-base text-gray-900 dark:text-gray-100 whitespace-pre-wrap">
                          {message.content}
                        </div>
                        {message.data && (
                          <div className="mt-3 p-2 sm:p-3 bg-white/50 dark:bg-gray-800/50 rounded-md">
                            <div className="grid grid-cols-2 gap-2 sm:gap-4 text-xs sm:text-sm">
                              {Object.entries(message.data).map(([key, value]) => (
                                <div key={key} className="flex justify-between">
                                  <span className="text-gray-600 dark:text-gray-400 capitalize">
                                    {key.replace(/([A-Z])/g, ' $1').trim()}:
                                  </span>
                                  <span className="font-medium text-gray-900 dark:text-gray-100">
                                    {typeof value === 'number' && key.includes('revenue') ? formatCurrency(value) :
                                     typeof value === 'number' && key.includes('confidence') ? `${value}%` :
                                     typeof value === 'number' && key.includes('gain') ? `+${value}%` :
                                     typeof value === 'number' && key.includes('change') ? `${value > 0 ? '+' : ''}${value}%` :
                                     typeof value === 'number' ? value.toLocaleString() : value}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                        {message.suggestions && (
                          <div className="mt-3 space-y-2">
                            <p className="text-xs text-gray-600 dark:text-gray-400">Quick suggestions:</p>
                            <div className="flex flex-wrap gap-2">
                              {message.suggestions.map((suggestion, index) => (
                                <Button
                                  key={index}
                                  onClick={() => handleSuggestionClick(suggestion)}
                                  variant="outline"
                                  size="sm"
                                  className="text-xs h-7 sm:h-8 px-2 sm:px-3"
                                >
                                  {suggestion}
                                </Button>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Typing Indicator */}
            {isTyping && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-start"
              >
                <div className="max-w-[75%]">
                  <div className="flex items-start space-x-2">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-brand-500 to-purple-600 rounded-full flex items-center justify-center">
                      <Bot className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                    </div>
                    <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-3 sm:p-4">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="border-t border-gray-200 dark:border-gray-700 p-4 sm:p-6">
            <div className="flex space-x-2 sm:space-x-3">
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage(inputValue)}
                  placeholder="Ask about your analytics..."
                  className="w-full pl-3 sm:pl-4 pr-10 sm:pr-12 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                />
                <Button
                  onClick={() => handleSendMessage(inputValue)}
                  disabled={!inputValue.trim() || isTyping}
                  size="icon"
                  className="absolute right-1 top-1/2 transform -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10"
                >
                  <Send className="w-4 h-4 sm:w-5 sm:h-5" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default AIChatAssistant