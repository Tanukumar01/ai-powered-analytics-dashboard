import React, { useState } from 'react'
import { Calendar, X } from 'lucide-react'
import { Button } from './Button'
import { Card, CardContent } from './Card'

const DateRangePicker = ({ onDateRangeChange, className = '' }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')

  const handleApply = () => {
    if (startDate && endDate) {
      onDateRangeChange({ startDate, endDate })
      setIsOpen(false)
    }
  }

  const handleClear = () => {
    setStartDate('')
    setEndDate('')
    onDateRangeChange({ startDate: '', endDate: '' })
    setIsOpen(false)
  }

  const formatDate = (dateString) => {
    if (!dateString) return ''
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  return (
    <div className={`relative ${className}`}>
      <Button
        onClick={() => setIsOpen(!isOpen)}
        variant="outline"
        size="sm"
        className="flex items-center space-x-2"
      >
        <Calendar className="w-4 h-4" />
        <span>
          {startDate && endDate 
            ? `${formatDate(startDate)} - ${formatDate(endDate)}`
            : 'Select Date Range'
          }
        </span>
      </Button>

      {isOpen && (
        <Card className="absolute top-full mt-2 z-50 w-80 shadow-xl border-0">
          <CardContent className="p-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-foreground">Date Range</h3>
                <Button
                  onClick={() => setIsOpen(false)}
                  variant="ghost"
                  size="sm"
                  className="h-6 w-6 p-0"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1">
                    Start Date
                  </label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1">
                    End Date
                  </label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    min={startDate}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="flex space-x-2 pt-2">
                <Button
                  onClick={handleApply}
                  disabled={!startDate || !endDate}
                  size="sm"
                  className="flex-1"
                >
                  Apply
                </Button>
                <Button
                  onClick={handleClear}
                  variant="outline"
                  size="sm"
                  className="flex-1"
                >
                  Clear
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

export default DateRangePicker