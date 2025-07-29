import React, { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { ChevronUp, ChevronDown, Search, Filter, Download, X } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card'
import { Button } from '../ui/Button'
import { Badge } from '../ui/Badge'
import DateRangePicker from '../ui/DateRangePicker'
import FilterDropdown from '../ui/FilterDropdown'
import { formatCurrency, formatNumber } from '../../lib/utils'

const DataTable = ({ data, title, description }) => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' })
  const [filterText, setFilterText] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(5)
  const [dateRange, setDateRange] = useState({ startDate: '', endDate: '' })
  const [statusFilter, setStatusFilter] = useState([])
  const [platformFilter, setPlatformFilter] = useState([])
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false)

  // Filter options
  const statusOptions = [
    { value: 'active', label: 'Active', badge: '3' },
    { value: 'completed', label: 'Completed', badge: '5' },
    { value: 'paused', label: 'Paused', badge: '0' }
  ]

  const platformOptions = [
    { value: 'Google Ads', label: 'Google Ads', badge: '4' },
    { value: 'Facebook Ads', label: 'Facebook Ads', badge: '2' },
    { value: 'Instagram Ads', label: 'Instagram Ads', badge: '2' }
  ]

  const filteredData = useMemo(() => {
    let filtered = data.filter(item => {
      // Text search filter
      const textMatch = Object.values(item).some(value =>
        value.toString().toLowerCase().includes(filterText.toLowerCase())
      )

      // Date range filter
      let dateMatch = true
      if (dateRange.startDate && dateRange.endDate) {
        const itemStartDate = new Date(item.startDate)
        const filterStartDate = new Date(dateRange.startDate)
        const filterEndDate = new Date(dateRange.endDate)
        dateMatch = itemStartDate >= filterStartDate && itemStartDate <= filterEndDate
      }

      // Status filter
      let statusMatch = true
      if (statusFilter.length > 0) {
        statusMatch = statusFilter.includes(item.status)
      }

      // Platform filter
      let platformMatch = true
      if (platformFilter.length > 0) {
        platformMatch = platformFilter.includes(item.platform)
      }

      return textMatch && dateMatch && statusMatch && platformMatch
    })

    if (sortConfig.key) {
      filtered.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? -1 : 1
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? 1 : -1
        }
        return 0
      })
    }

    return filtered
  }, [data, filterText, sortConfig, dateRange, statusFilter, platformFilter])

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    return filteredData.slice(startIndex, startIndex + itemsPerPage)
  }, [filteredData, currentPage, itemsPerPage])

  const totalPages = Math.ceil(filteredData.length / itemsPerPage)

  const requestSort = (key) => {
    let direction = 'asc'
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc'
    }
    setSortConfig({ key, direction })
  }

  const getSortIcon = (key) => {
    if (sortConfig.key !== key) {
      return <ChevronUp className="w-4 h-4 text-gray-400" />
    }
    return sortConfig.direction === 'asc' 
      ? <ChevronUp className="w-4 h-4 text-brand-600" />
      : <ChevronDown className="w-4 h-4 text-brand-600" />
  }

  const formatCellValue = (value, key) => {
    if (key.includes('budget') || key.includes('spent') || key.includes('revenue')) {
      return formatCurrency(value)
    }
    if (key.includes('impressions') || key.includes('clicks') || key.includes('conversions')) {
      return formatNumber(value)
    }
    if (key.includes('ctr') || key.includes('cpc') || key.includes('cpa')) {
      return typeof value === 'number' ? value.toFixed(2) : value
    }
    if (key === 'status') {
      return (
        <Badge 
          variant={value === 'active' ? 'success' : value === 'completed' ? 'secondary' : 'warning'}
          className="text-xs"
        >
          {value}
        </Badge>
      )
    }
    return value
  }

  const exportToCSV = () => {
    const headers = Object.keys(data[0]).join(',')
    const csvContent = [headers, ...filteredData.map(row => 
      Object.values(row).map(value => `"${value}"`).join(',')
    )].join('\n')
    
    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${title.toLowerCase().replace(/\s+/g, '-')}-data.csv`
    a.click()
    window.URL.revokeObjectURL(url)
  }

  const clearAllFilters = () => {
    setFilterText('')
    setDateRange({ startDate: '', endDate: '' })
    setStatusFilter([])
    setPlatformFilter([])
    setCurrentPage(1)
  }

  const hasActiveFilters = filterText || dateRange.startDate || statusFilter.length > 0 || platformFilter.length > 0

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
    >
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white">
                {title}
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                {description}
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <Button 
                onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                variant="outline" 
                size="sm"
                className="flex items-center space-x-2"
              >
                <Filter className="w-4 h-4" />
                <span>Filters</span>
                {hasActiveFilters && (
                  <Badge variant="secondary" className="ml-1 text-xs">
                    {[filterText, dateRange.startDate, statusFilter.length, platformFilter.length].filter(Boolean).length}
                  </Badge>
                )}
              </Button>
              <Button onClick={exportToCSV} variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Advanced Filters */}
          {showAdvancedFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-foreground">Advanced Filters</h3>
                {hasActiveFilters && (
                  <Button
                    onClick={clearAllFilters}
                    variant="ghost"
                    size="sm"
                    className="text-xs"
                  >
                    <X className="w-3 h-3 mr-1" />
                    Clear All
                  </Button>
                )}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-2">
                    Search
                  </label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      placeholder="Search campaigns..."
                      value={filterText}
                      onChange={(e) => setFilterText(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-2">
                    Date Range
                  </label>
                  <DateRangePicker
                    onDateRangeChange={setDateRange}
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-2">
                    Status
                  </label>
                  <FilterDropdown
                    title="All Status"
                    options={statusOptions}
                    selectedValues={statusFilter}
                    onFilterChange={setStatusFilter}
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-2">
                    Platform
                  </label>
                  <FilterDropdown
                    title="All Platforms"
                    options={platformOptions}
                    selectedValues={platformFilter}
                    onFilterChange={setPlatformFilter}
                  />
                </div>
              </div>
            </motion.div>
          )}

          {/* Results Summary */}
          <div className="mb-4 flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              Showing {filteredData.length} of {data.length} campaigns
              {hasActiveFilters && (
                <span className="ml-2 text-brand-600">
                  (filtered)
                </span>
              )}
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  {Object.keys(data[0]).map((key) => (
                    <th
                      key={key}
                      onClick={() => requestSort(key)}
                      className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center space-x-1">
                        <span>{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</span>
                        {getSortIcon(key)}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {paginatedData.map((row, index) => (
                  <motion.tr
                    key={index}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                  >
                    {Object.entries(row).map(([key, value]) => (
                      <td key={key} className="px-4 py-3 text-sm text-gray-900">
                        {formatCellValue(value, key)}
                      </td>
                    ))}
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-4">
              <div className="text-sm text-gray-700">
                Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredData.length)} of {filteredData.length} results
              </div>
              <div className="flex space-x-2">
                <Button
                  onClick={() => setCurrentPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  variant="outline"
                  size="sm"
                >
                  Previous
                </Button>
                <span className="px-3 py-2 text-sm text-gray-700">
                  Page {currentPage} of {totalPages}
                </span>
                <Button
                  onClick={() => setCurrentPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  variant="outline"
                  size="sm"
                >
                  Next
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default DataTable 