// Mock data for ADmyBRAND Insights Dashboard

export const metricsData = {
  revenue: {
    current: 1245000,
    previous: 1180000,
    change: 5.5,
    trend: 'up'
  },
  users: {
    current: 45678,
    previous: 42345,
    change: 7.9,
    trend: 'up'
  },
  conversions: {
    current: 2345,
    previous: 2189,
    change: 7.1,
    trend: 'up'
  },
  growth: {
    current: 12.3,
    previous: 10.8,
    change: 1.5,
    trend: 'up'
  }
}

export const revenueData = [
  { month: 'Jan', revenue: 850000, target: 800000 },
  { month: 'Feb', revenue: 920000, target: 850000 },
  { month: 'Mar', revenue: 980000, target: 900000 },
  { month: 'Apr', revenue: 1050000, target: 950000 },
  { month: 'May', revenue: 1120000, target: 1000000 },
  { month: 'Jun', revenue: 1180000, target: 1050000 },
  { month: 'Jul', revenue: 1245000, target: 1100000 },
  { month: 'Aug', revenue: 1310000, target: 1150000 },
  { month: 'Sep', revenue: 1380000, target: 1200000 },
  { month: 'Oct', revenue: 1450000, target: 1250000 },
  { month: 'Nov', revenue: 1520000, target: 1300000 },
  { month: 'Dec', revenue: 1600000, target: 1350000 }
]

export const userGrowthData = [
  { month: 'Jan', users: 32000, newUsers: 2800 },
  { month: 'Feb', users: 34500, newUsers: 3100 },
  { month: 'Mar', users: 36800, newUsers: 3300 },
  { month: 'Apr', users: 39200, newUsers: 3500 },
  { month: 'May', users: 41500, newUsers: 3800 },
  { month: 'Jun', users: 43800, newUsers: 4000 },
  { month: 'Jul', users: 46200, newUsers: 4200 },
  { month: 'Aug', users: 48500, newUsers: 4500 },
  { month: 'Sep', users: 50800, newUsers: 4700 },
  { month: 'Oct', users: 53200, newUsers: 5000 },
  { month: 'Nov', users: 55500, newUsers: 5200 },
  { month: 'Dec', users: 57800, newUsers: 5500 }
]

export const conversionData = [
  { month: 'Jan', conversions: 1800, rate: 5.6 },
  { month: 'Feb', conversions: 1950, rate: 5.7 },
  { month: 'Mar', conversions: 2100, rate: 5.8 },
  { month: 'Apr', conversions: 2250, rate: 5.9 },
  { month: 'May', conversions: 2400, rate: 6.0 },
  { month: 'Jun', conversions: 2550, rate: 6.1 },
  { month: 'Jul', conversions: 2700, rate: 6.2 },
  { month: 'Aug', conversions: 2850, rate: 6.3 },
  { month: 'Sep', conversions: 3000, rate: 6.4 },
  { month: 'Oct', conversions: 3150, rate: 6.5 },
  { month: 'Nov', conversions: 3300, rate: 6.6 },
  { month: 'Dec', conversions: 3450, rate: 6.7 }
]

export const channelData = [
  { name: 'Organic Search', value: 35, color: '#0ea5e9' },
  { name: 'Direct Traffic', value: 25, color: '#8b5cf6' },
  { name: 'Social Media', value: 20, color: '#10b981' },
  { name: 'Email Marketing', value: 12, color: '#f59e0b' },
  { name: 'Paid Ads', value: 8, color: '#ef4444' }
]

export const campaignData = [
  { 
    name: 'Summer Sale', 
    budget: 50000, 
    spent: 48500, 
    impressions: 1250000, 
    clicks: 125000, 
    conversions: 6250, 
    ctr: 10.0, 
    cpc: 0.39, 
    cpa: 7.76,
    status: 'completed',
    startDate: '2024-06-01',
    endDate: '2024-08-31',
    platform: 'Google Ads'
  },
  { 
    name: 'Black Friday', 
    budget: 75000, 
    spent: 73200, 
    impressions: 1800000, 
    clicks: 180000, 
    conversions: 9000, 
    ctr: 10.0, 
    cpc: 0.41, 
    cpa: 8.13,
    status: 'active',
    startDate: '2024-11-20',
    endDate: '2024-11-30',
    platform: 'Facebook Ads'
  },
  { 
    name: 'Holiday Special', 
    budget: 60000, 
    spent: 58400, 
    impressions: 1500000, 
    clicks: 150000, 
    conversions: 7500, 
    ctr: 10.0, 
    cpc: 0.39, 
    cpa: 7.79,
    status: 'active',
    startDate: '2024-12-01',
    endDate: '2024-12-25',
    platform: 'Google Ads'
  },
  { 
    name: 'New Year', 
    budget: 40000, 
    spent: 39200, 
    impressions: 1000000, 
    clicks: 100000, 
    conversions: 5000, 
    ctr: 10.0, 
    cpc: 0.39, 
    cpa: 7.84,
    status: 'completed',
    startDate: '2024-01-01',
    endDate: '2024-01-15',
    platform: 'Instagram Ads'
  },
  { 
    name: 'Spring Collection', 
    budget: 45000, 
    spent: 43800, 
    impressions: 1100000, 
    clicks: 110000, 
    conversions: 5500, 
    ctr: 10.0, 
    cpc: 0.40, 
    cpa: 7.96,
    status: 'completed',
    startDate: '2024-03-01',
    endDate: '2024-05-31',
    platform: 'Google Ads'
  },
  { 
    name: 'Back to School', 
    budget: 55000, 
    spent: 53400, 
    impressions: 1350000, 
    clicks: 135000, 
    conversions: 6750, 
    ctr: 10.0, 
    cpc: 0.40, 
    cpa: 7.91,
    status: 'completed',
    startDate: '2024-08-15',
    endDate: '2024-09-30',
    platform: 'Facebook Ads'
  },
  { 
    name: 'Cyber Monday', 
    budget: 80000, 
    spent: 77600, 
    impressions: 2000000, 
    clicks: 200000, 
    conversions: 10000, 
    ctr: 10.0, 
    cpc: 0.39, 
    cpa: 7.76,
    status: 'active',
    startDate: '2024-11-25',
    endDate: '2024-12-02',
    platform: 'Google Ads'
  },
  { 
    name: 'Valentine\'s Day', 
    budget: 35000, 
    spent: 34200, 
    impressions: 900000, 
    clicks: 90000, 
    conversions: 4500, 
    ctr: 10.0, 
    cpc: 0.38, 
    cpa: 7.60,
    status: 'completed',
    startDate: '2024-02-01',
    endDate: '2024-02-14',
    platform: 'Instagram Ads'
  }
]

export const recentActivity = [
  { id: 1, type: 'campaign', action: 'Campaign "Summer Sale" completed', time: '2 hours ago', status: 'completed' },
  { id: 2, type: 'user', action: 'New user registration: john.doe@email.com', time: '3 hours ago', status: 'new' },
  { id: 3, type: 'conversion', action: 'High-value conversion: $2,500', time: '4 hours ago', status: 'success' },
  { id: 4, type: 'alert', action: 'Budget alert: "Black Friday" campaign at 95%', time: '5 hours ago', status: 'warning' },
  { id: 5, type: 'update', action: 'Analytics data updated for Q3', time: '6 hours ago', status: 'info' },
  { id: 6, type: 'campaign', action: 'Campaign "Holiday Special" launched', time: '1 day ago', status: 'active' },
  { id: 7, type: 'user', action: 'User feedback received: 5-star rating', time: '1 day ago', status: 'success' },
  { id: 8, type: 'conversion', action: 'Conversion rate improved by 2.3%', time: '2 days ago', status: 'success' }
]

export const topProducts = [
  { name: 'Premium Widget Pro', sales: 1250, revenue: 187500, growth: 12.5 },
  { name: 'Smart Gadget X', sales: 980, revenue: 147000, growth: 8.9 },
  { name: 'Eco-Friendly Kit', sales: 850, revenue: 127500, growth: 15.2 },
  { name: 'Digital Assistant', sales: 720, revenue: 108000, growth: 6.7 },
  { name: 'Home Security Bundle', sales: 650, revenue: 97500, growth: 11.3 }
]

export const geographicData = [
  { country: 'United States', users: 18500, revenue: 485000, growth: 8.5 },
  { country: 'United Kingdom', users: 8200, revenue: 215000, growth: 12.3 },
  { country: 'Canada', users: 6500, revenue: 168000, growth: 9.8 },
  { country: 'Germany', users: 5800, revenue: 152000, growth: 11.2 },
  { country: 'Australia', users: 4200, revenue: 110000, growth: 7.9 },
  { country: 'France', users: 3800, revenue: 98000, growth: 10.1 },
  { country: 'Japan', users: 3200, revenue: 84000, growth: 6.4 },
  { country: 'Brazil', users: 2800, revenue: 73000, growth: 13.7 }
]

export const deviceData = [
  { device: 'Desktop', users: 25600, percentage: 56.1 },
  { device: 'Mobile', users: 16800, percentage: 36.8 },
  { device: 'Tablet', users: 3278, percentage: 7.1 }
]

export const timeData = [
  { hour: '00:00', users: 1200, conversions: 60 },
  { hour: '02:00', users: 800, conversions: 40 },
  { hour: '04:00', users: 600, conversions: 30 },
  { hour: '06:00', users: 900, conversions: 45 },
  { hour: '08:00', users: 1800, conversions: 90 },
  { hour: '10:00', users: 2200, conversions: 110 },
  { hour: '12:00', users: 2400, conversions: 120 },
  { hour: '14:00', users: 2600, conversions: 130 },
  { hour: '16:00', users: 2800, conversions: 140 },
  { hour: '18:00', users: 3000, conversions: 150 },
  { hour: '20:00', users: 3200, conversions: 160 },
  { hour: '22:00', users: 2000, conversions: 100 }
] 