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
        <CardHeader className="p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
            <div>
              <CardTitle className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">
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
                className="flex items-center space-x-1 sm:space-x-2 text-xs sm:text-sm"
              >
                <Filter className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">Filters</span>
                {hasActiveFilters && (
                  <Badge variant="secondary" className="ml-1 text-xs">
                    {[filterText, dateRange.startDate, statusFilter.length, platformFilter.length].filter(Boolean).length}
                  </Badge>
                )}
              </Button>
              <Button onClick={exportToCSV} variant="outline" size="sm" className="text-xs sm:text-sm">
                <Download className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                <span className="hidden sm:inline">Export</span>
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-4 sm:p-6">
          {/* Advanced Filters */}
          {showAdvancedFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-4 sm:mb-6 p-3 sm:p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border"
            >
              <div className="flex items-center justify-between mb-3 sm:mb-4">
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
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1 sm:mb-2">
                    Search
                  </label>
                  <div className="relative">
                    <Search className="absolute left-2 sm:left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-3 h-3 sm:w-4 sm:h-4" />
                    <input
                      type="text"
                      placeholder="Search campaigns..."
                      value={filterText}
                      onChange={(e) => setFilterText(e.target.value)}
                      className="w-full pl-7 sm:pl-10 pr-3 sm:pr-4 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1 sm:mb-2">
                    Date Range
                  </label>
                  <DateRangePicker
                    onDateRangeChange={setDateRange}
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1 sm:mb-2">
                    Status
                  </label>
                  <FilterDropdown
                    title="All Status"
                    options={statusOptions}
                    selectedValues={statusFilter}
                    onFilterChange={setStatusFilter}
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1 sm:mb-2">
                    Platform
                  </label>
                  <FilterDropdown
                    title="All Platforms"
                    options={platformOptions}
                    selectedValues={platformFilter}
                    onFilterChange={setPlatformFilter}
                    className="w-full"
                  />
                </div>
              </div>
            </motion.div>
          )}

          {/* Search Bar */}
          <div className="mb-4 sm:mb-6">
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

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  {Object.keys(data[0] || {}).map((key) => (
                    <th
                      key={key}
                      onClick={() => requestSort(key)}
                      className="text-left py-3 px-2 sm:px-3 font-medium text-gray-900 dark:text-white cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                    >
                      <div className="flex items-center space-x-1">
                        <span className="capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                        {getSortIcon(key)}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {paginatedData.map((item, index) => (
                  <tr
                    key={index}
                    className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  >
                    {Object.entries(item).map(([key, value]) => (
                      <td key={key} className="py-3 px-2 sm:px-3 text-gray-900 dark:text-gray-100">
                        {formatCellValue(value, key)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between mt-4 sm:mt-6">
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredData.length)} of {filteredData.length} results
            </div>
            <div className="flex items-center space-x-2">
              <Button
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
                variant="outline"
                size="sm"
                className="text-xs sm:text-sm"
              >
                Previous
              </Button>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Page {currentPage} of {totalPages}
              </span>
              <Button
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                variant="outline"
                size="sm"
                className="text-xs sm:text-sm"
              >
                Next
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default DataTable 