import { TrendingUp, Target, Activity, Zap } from 'lucide-react';

export const PRODUCTS = [
  {
    id: 'pricegenix',
    name: 'PriceGenix',
    icon: TrendingUp,
    description: 'AI-powered price optimization engine for maximizing revenue and profitability',
    path: '/dashboard/pricegenix',
    color: 'from-blue-500 to-blue-600',
    features: ['Dynamic Pricing', 'Profit Optimization', 'Competitor Analysis', 'Real-time Analytics']
  },
  {
    id: 'marketedge',
    name: 'MarketEdge',
    icon: Target,
    description: 'Market intelligence and competitive analysis platform for strategic decisions',
    path: '/dashboard/marketedge',
    color: 'from-purple-500 to-purple-600',
    features: ['Market Analysis', 'Trend Forecasting', 'Competitive Intelligence', 'Market Insights']
  },
  {
    id: 'optiflow',
    name: 'OptiFlow',
    icon: Activity,
    description: 'Workflow optimization and process automation for operational excellence',
    path: '/dashboard/optiflow',
    color: 'from-green-500 to-green-600',
    features: ['Process Automation', 'Workflow Design', 'Performance Tracking', 'Resource Optimization']
  },
  {
    id: 'engagesync',
    name: 'EngageSync',
    icon: Zap,
    description: 'Customer engagement and synchronization platform for better relationships',
    path: '/dashboard/engagesync',
    color: 'from-orange-500 to-orange-600',
    features: ['Customer Engagement', 'Multi-channel Sync', 'Communication Hub', 'Engagement Analytics']
  }
];
