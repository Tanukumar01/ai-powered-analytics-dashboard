# AI-Powered Analytics Dashboard

This repository contains the ADmyBRAND Insights - an advanced AI-powered analytics dashboard for digital marketing agencies.

## 📁 Project Structure

```
Ai Powered Anayltics DashBoard/
├── .git/                        # Git version control
├── adm-brand-insights/          # React application
│   ├── src/                     # Source code
│   │   ├── components/          # React components
│   │   │   ├── dashboard/       # Dashboard-specific components
│   │   │   ├── ui/             # Reusable UI components
│   │   │   └── layout/         # Layout components
│   │   ├── data/               # Mock data and configurations
│   │   ├── lib/                # Utility functions
│   │   ├── App.js              # Main application component
│   │   ├── index.js            # React entry point
│   │   └── index.css           # Global styles
│   ├── public/                 # Public assets
│   │   ├── index.html          # Main HTML file
│   │   └── manifest.json       # PWA manifest
│   ├── package.json            # Dependencies and scripts
│   ├── package-lock.json       # Locked dependency versions
│   ├── tailwind.config.js      # Tailwind CSS configuration
│   ├── postcss.config.js       # PostCSS configuration
│   ├── .gitignore              # Git ignore rules
│   ├── README.md               # Detailed documentation
│   └── build/                  # Production build (generated)
└── README.md                   # This file
```

## 🚀 Deployment

### Vercel Deployment
1. Go to [vercel.com](https://vercel.com)
2. Import this repository
3. Configure project settings:
   - **Root Directory**: `adm-brand-insights`
   - **Framework Preset**: Create React App
   - **Build Command**: `npm run build`
   - **Output Directory**: `build`
   - **Install Command**: `npm install`

### Local Development
```bash
cd adm-brand-insights
npm install
npm start
```

## 🛠️ Technologies Used

- **React.js 18.2.0** - Frontend framework
- **Tailwind CSS 3.3.0** - Utility-first CSS
- **shadcn/ui** - Modern UI components
- **Framer Motion** - Animations
- **Recharts** - Data visualization
- **Lucide React** - Icons
- **React Hot Toast** - Notifications

## 🤖 AI Features

- **AI Predictions** - ML-powered forecasting
- **AI Auto-Optimizer** - Automated campaign optimization
- **AI Chat Assistant** - Natural language queries
- **AI Anomaly Detector** - Pattern recognition
- **AI Sentiment Analyzer** - Customer feedback analysis

## 📊 Dashboard Features

- **Real-time Metrics** - Live data updates
- **Interactive Charts** - Multiple chart types
- **Advanced Filtering** - Date ranges and multi-select
- **Dark/Light Mode** - Theme switching
- **Responsive Design** - Mobile and desktop optimized
- **Export Functionality** - CSV export with filtering

## 🔧 Development

### Prerequisites
- Node.js 18+
- npm or yarn

### Setup
```bash
git clone <repository-url>
cd adm-brand-insights
npm install
npm start
```

### Build
```bash
npm run build
```

## 📝 License

This project is licensed under the MIT License.

---

**Built with ❤️ for modern analytics dashboards**