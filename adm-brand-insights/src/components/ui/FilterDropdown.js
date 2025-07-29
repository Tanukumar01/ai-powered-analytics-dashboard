import React, { useState } from 'react'
import { ChevronDown, Filter } from 'lucide-react'
import { Button } from './Button'
import { Card, CardContent } from './Card'
import { Badge } from './Badge'

const FilterDropdown = ({ 
  title, 
  options, 
  selectedValues, 
  onFilterChange, 
  multiple = true,
  className = '' 
}) => {
  const [isOpen, setIsOpen] = useState(false)

  const handleToggle = (value) => {
    if (multiple) {
      const newValues = selectedValues.includes(value)
        ? selectedValues.filter(v => v !== value)
        : [...selectedValues, value]
      onFilterChange(newValues)
    } else {
      onFilterChange(selectedValues.includes(value) ? [] : [value])
      setIsOpen(false)
    }
  }

  const getDisplayText = () => {
    if (selectedValues.length === 0) return title
    if (selectedValues.length === 1) return selectedValues[0]
    if (selectedValues.length <= 2) return selectedValues.join(', ')
    return `${selectedValues.length} selected`
  }

  return (
    <div className={`relative ${className}`}>
      <Button
        onClick={() => setIsOpen(!isOpen)}
        variant="outline"
        size="sm"
        className="flex items-center space-x-2"
      >
        <Filter className="w-4 h-4" />
        <span>{getDisplayText()}</span>
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </Button>

      {isOpen && (
        <Card className="absolute top-full mt-2 z-50 w-48 shadow-xl border-0">
          <CardContent className="p-3">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-foreground">{title}</h3>
                {selectedValues.length > 0 && (
                  <Button
                    onClick={() => onFilterChange([])}
                    variant="ghost"
                    size="sm"
                    className="h-6 px-2 text-xs"
                  >
                    Clear
                  </Button>
                )}
              </div>

              <div className="space-y-1 max-h-48 overflow-y-auto">
                {options.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => handleToggle(option.value)}
                    className={`w-full text-left px-2 py-1.5 rounded text-sm transition-colors ${
                      selectedValues.includes(option.value)
                        ? 'bg-brand-50 text-brand-700 dark:bg-brand-900 dark:text-brand-300'
                        : 'hover:bg-gray-50 dark:hover:bg-gray-800'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span>{option.label}</span>
                      {option.badge && (
                        <Badge variant="secondary" className="text-xs">
                          {option.badge}
                        </Badge>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

export default FilterDropdown