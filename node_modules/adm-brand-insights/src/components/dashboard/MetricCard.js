import React from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown, DollarSign, Users, Target, TrendingUp as GrowthIcon } from 'lucide-react'
import { Card, CardContent } from '../ui/Card'
import { formatCurrency, formatNumber, formatPercentage } from '../../lib/utils'

const MetricCard = ({ title, value, change, trend, icon, type = 'number' }) => {
  const icons = {
    revenue: DollarSign,
    users: Users,
    conversions: Target,
    growth: GrowthIcon
  }

  const IconComponent = icons[icon] || icon

  const formatValue = (val) => {
    if (type === 'currency') return formatCurrency(val)
    if (type === 'percentage') return `${val}%`
    return formatNumber(val)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.02 }}
      className="group"
    >
      <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 shadow-lg hover:shadow-xl transition-all duration-300">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <p className="text-sm font-medium text-muted-foreground mb-2">
                {title}
              </p>
              <div className="flex items-baseline space-x-2">
                <h3 className="text-3xl font-bold text-foreground">
                  {formatValue(value)}
                </h3>
                <div className={`flex items-center text-sm font-medium ${
                  change >= 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  {change >= 0 ? (
                    <TrendingUp className="w-4 h-4 mr-1" />
                  ) : (
                    <TrendingDown className="w-4 h-4 mr-1" />
                  )}
                  {Math.abs(change)}%
                </div>
              </div>
            </div>
            <div className="flex-shrink-0">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-brand-500 to-brand-600 flex items-center justify-center text-white shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                <IconComponent className="w-6 h-6" />
              </div>
            </div>
          </div>
          
          {/* Animated background gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default MetricCard 