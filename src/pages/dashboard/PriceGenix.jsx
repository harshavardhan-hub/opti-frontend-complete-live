import React, { useState } from 'react';
import Navbar from '../../components/common/Navbar';
import PriceGenixSidebar from '../../components/sidebars/PriceGenixSidebar';
import { TrendingUp, DollarSign, Percent, Package, Award, Target, BarChart3, Download, X, TrendingDown, Maximize2, ChevronRight, ArrowUpRight, Clock, ChevronLeft, Eye, AlertCircle, Zap, TrendingDown as TrendingDownIcon, ArrowDown, History } from 'lucide-react';

// Mock Data
const mockOptimizationResults = [
  { article: '#1234', status: 'In-Progress', stock: 50, mop: 100, nlc: 75, maxPrice: 120, minPrice: 80, recoPrice: 95, discount: 5, discountPercent: 5.3, units: 67, dr: 1.2 },
  { article: '#1235', status: 'Completed', stock: 45, mop: 110, nlc: 80, maxPrice: 130, minPrice: 85, recoPrice: 105, discount: 5, discountPercent: 4.8, units: 72, dr: 1.3 },
  { article: '#1236', status: 'In-Progress', stock: 60, mop: 95, nlc: 70, maxPrice: 115, minPrice: 75, recoPrice: 90, discount: 5, discountPercent: 5.6, units: 65, dr: 1.1 },
  { article: '#1237', status: 'Completed', stock: 55, mop: 105, nlc: 78, maxPrice: 125, minPrice: 82, recoPrice: 98, discount: 7, discountPercent: 6.7, units: 70, dr: 1.25 },
  { article: '#1238', status: 'In-Progress', stock: 48, mop: 98, nlc: 72, maxPrice: 118, minPrice: 78, recoPrice: 92, discount: 6, discountPercent: 6.1, units: 68, dr: 1.15 },
];

// Extended Mock Data for Top 50% Articles
const generateTop50MockData = (metric) => {
  const baseData = [
    { id: '#A1234', name: 'Premium Laptop Pro', sales: 4185125, profit: 1255538, units: 13325, discount: 18500, avgPrice: 313836, maxPrice: 368609, minPrice: 245000 },
    { id: '#A1235', name: 'Wireless Headphones Elite', sales: 3850000, profit: 1155000, units: 15400, discount: 15400, avgPrice: 250000, maxPrice: 298000, minPrice: 198000 },
    { id: '#A1236', name: 'Smart Watch Pro', sales: 3200000, profit: 960000, units: 16000, discount: 12800, avgPrice: 200000, maxPrice: 245000, minPrice: 165000 },
    { id: '#A1237', name: 'Gaming Console X', sales: 2950000, profit: 885000, units: 9833, discount: 11800, avgPrice: 300000, maxPrice: 358000, minPrice: 275000 },
    { id: '#A1238', name: 'Tablet Ultra', sales: 2750000, profit: 825000, units: 11000, discount: 11000, avgPrice: 250000, maxPrice: 289000, minPrice: 220000 },
    { id: '#A1239', name: '4K Monitor Premium', sales: 2580000, profit: 774000, units: 8600, discount: 10320, avgPrice: 300000, maxPrice: 345000, minPrice: 268000 },
    { id: '#A1240', name: 'Mechanical Keyboard RGB', sales: 2350000, profit: 705000, units: 23500, discount: 9400, avgPrice: 100000, maxPrice: 125000, minPrice: 85000 },
    { id: '#A1241', name: 'Wireless Mouse Pro', sales: 2180000, profit: 654000, units: 43600, discount: 8720, avgPrice: 50000, maxPrice: 62000, minPrice: 42000 },
    { id: '#A1242', name: 'USB-C Hub Elite', sales: 1950000, profit: 585000, units: 39000, discount: 7800, avgPrice: 50000, maxPrice: 58000, minPrice: 45000 },
    { id: '#A1243', name: 'External SSD 1TB', sales: 1820000, profit: 546000, units: 9100, discount: 7280, avgPrice: 200000, maxPrice: 235000, minPrice: 178000 },
  ];
  
  return baseData.sort((a, b) => b[metric] - a[metric]);
};

// Extended Mock Data for Top 80% Articles
const generateTop80MockData = (metric) => {
  const baseData = [
    { id: '#B5001', name: 'Premium Laptop Pro Max', sales: 6478502, profit: 1943551, units: 20595, discount: 25914, avgPrice: 314500, maxPrice: 371289, minPrice: 268000 },
    { id: '#B5002', name: 'Professional Camera Kit', sales: 5890000, profit: 1767000, units: 19633, discount: 23560, avgPrice: 300000, maxPrice: 358000, minPrice: 265000 },
    { id: '#B5003', name: 'Studio Microphone Pro', sales: 5450000, profit: 1635000, units: 27250, discount: 21800, avgPrice: 200000, maxPrice: 245000, minPrice: 175000 },
    { id: '#B5004', name: 'Graphics Card RTX', sales: 5120000, profit: 1536000, units: 6400, discount: 20480, avgPrice: 800000, maxPrice: 958000, minPrice: 725000 },
    { id: '#B5005', name: 'Gaming Laptop Elite', sales: 4850000, profit: 1455000, units: 9700, discount: 19400, avgPrice: 500000, maxPrice: 598000, minPrice: 445000 },
    { id: '#B5006', name: 'Drone 4K Professional', sales: 4580000, profit: 1374000, units: 9160, discount: 18320, avgPrice: 500000, maxPrice: 578000, minPrice: 458000 },
    { id: '#B5007', name: 'Smartwatch Ultra Pro', sales: 4320000, profit: 1296000, units: 18000, discount: 17280, avgPrice: 240000, maxPrice: 289000, minPrice: 215000 },
    { id: '#B5008', name: 'Bluetooth Speaker Premium', sales: 4050000, profit: 1215000, units: 27000, discount: 16200, avgPrice: 150000, maxPrice: 178000, minPrice: 135000 },
    { id: '#B5009', name: 'Webcam 4K Pro', sales: 3890000, profit: 1167000, units: 32417, discount: 15560, avgPrice: 120000, maxPrice: 145000, minPrice: 105000 },
    { id: '#B5010', name: 'USB Microphone Studio', sales: 3650000, profit: 1095000, units: 36500, discount: 14600, avgPrice: 100000, maxPrice: 125000, minPrice: 88000 },
    { id: '#B5011', name: 'Ring Light Professional', sales: 3420000, profit: 1026000, units: 42750, discount: 13680, avgPrice: 80000, maxPrice: 98000, minPrice: 72000 },
    { id: '#B5012', name: 'HDMI Cable Premium 2m', sales: 3180000, profit: 954000, units: 106000, discount: 12720, avgPrice: 30000, maxPrice: 38000, minPrice: 26000 },
  ];
  
  return baseData.sort((a, b) => b[metric] - a[metric]);
};

// Mock data for Top Articles Summary
const mockTopArticlesSummary = {
  top50: {
    sales: 41851258,
    avgPrice: 3138364,
    maxPrice: 3686090,
    minPrice: 245000,
    discount: 18500,
    count: 1552
  },
  top80: {
    sales: 64785025,
    avgPrice: 5559416,
    maxPrice: 5712895,
    minPrice: 268000,
    discount: 25914,
    count: 2480
  }
};

// 🔥 SIMPLE MOCK DATA - Ready for PostgreSQL
const mockPastIterations = [
  {
    id: 1,
    name: 'Q4 2025 Optimization',
    date: '2025-12-01 14:30',
    objective: 'Sales Maximization',
    constraints: 'Discount: 0%-15%, Profit: 20%-40%',
    sales: 1425000
  },
  {
    id: 2,
    name: 'Holiday Season Test',
    date: '2025-11-28 10:15',
    objective: 'Profit Maximization',
    constraints: 'Discount: 5%-20%, Units: 5000-15000',
    sales: 1380000
  },
];

const PriceGenix = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [uploadedFile, setUploadedFile] = useState('pricing_data_sample.csv');
  const [selectedOptimization, setSelectedOptimization] = useState('sales');
  const [constraints, setConstraints] = useState([]);
  const [scoringLevels, setScoringLevels] = useState(['Article']);
  const [hasResults, setHasResults] = useState(false);
  const [resultsData, setResultsData] = useState([]);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [popupType, setPopupType] = useState(null);
  const [topArticlesTab, setTopArticlesTab] = useState('overview');
  const [topArticlesMetric, setTopArticlesMetric] = useState('sales');
  const [viewMode, setViewMode] = useState('current');
  const [selectedHistoryItem, setSelectedHistoryItem] = useState(null);
  const [isHistoryDropdownOpen, setIsHistoryDropdownOpen] = useState(false);
  
  // ALL DYNAMIC STATE
  const [currentBaseCondition, setCurrentBaseCondition] = useState({ sales: 1250000, profit: 325000, profitability: 26.0, units: 8500 });
  const [currentOptimizedCondition, setCurrentOptimizedCondition] = useState({ sales: 1425000, profit: 398750, profitability: 28.0, units: 9200 });
  const [currentPromotionData, setCurrentPromotionData] = useState({
    avgListPrice: 27955,
    avgSalePrice: 26508,
    incrementalROI: { salesPerRs: 5.58, gpPerRs: 0.44, unitsPerRs: 0.00 },
    percentUnderPromotion: { sales: 5.79, profit: 5.80, units: 1.98 },
    effectiveness: {
      base: { salesPerRs: 11.92, gpPerRs: 0.93 },
      test: { salesPerRs: 11.18, gpPerRs: 0.87 },
      incremental: { salesPerRs: 5.58, gpPerRs: 0.44 }
    }
  });
  const [currentTopArticlesSummary, setCurrentTopArticlesSummary] = useState(mockTopArticlesSummary);

  const scoringOptions = ['Article', 'Brand', 'Category', 'Store', 'Geography'];

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const handleRunOptimization = () => {
    setResultsData(mockOptimizationResults);
    setHasResults(true);
    setViewMode('current');
    setSelectedHistoryItem(null);
  };

  const handleReset = () => {
    setConstraints([]);
    setSelectedOptimization('sales');
    setScoringLevels(['Article']);
    setHasResults(false);
    setResultsData([]);
    setViewMode('current');
    setSelectedHistoryItem(null);
  };

  // 🔥 UPDATED: Close sidebar AND dropdown when viewing history
  const handleViewHistory = (iteration) => {
    setSidebarOpen(false);
    setIsHistoryDropdownOpen(false);
    setSelectedHistoryItem(iteration);
    setResultsData(mockOptimizationResults);
    setHasResults(true);
    setViewMode('history');
  };

  const handleBackToCurrent = () => {
    setViewMode('current');
    setSelectedHistoryItem(null);
    setResultsData(mockOptimizationResults);
  };

  const handleDownload = () => {
    const headers = ['Article', 'Status', 'Stock', 'MOP', 'NLC', 'Max Price', 'Min Price', 'Reco Price', 'Discount', 'Discount %', 'Units', 'DR'];
    const csvContent = [
      headers.join(','),
      ...resultsData.map(row => 
        `${row.article},${row.status},${row.stock},${row.mop},${row.nlc},${row.maxPrice},${row.minPrice},${row.recoPrice},${row.discount},${row.discountPercent},${row.units},${row.dr}`
      )
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `pricegenix-${viewMode === 'history' ? 'history' : 'current'}-results.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const toggleScoringLevel = (level) => {
    if (scoringLevels.includes(level)) {
      setScoringLevels(scoringLevels.filter(l => l !== level));
    } else {
      setScoringLevels([...scoringLevels, level]);
    }
  };

  const handleRowClick = (article) => {
    setSelectedArticle(article);
    setPopupType('article');
    setShowPopup(true);
  };

  const handleCardClick = (type) => {
    setPopupType(type);
    setShowPopup(true);
    if (type === 'topArticles') {
      setTopArticlesTab('overview');
      setTopArticlesMetric('sales');
    }
  };

  const generateTimeSeriesData = (article) => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
    return months.map((month, idx) => ({
      month,
      price: article.mop + (Math.random() * 10 - 5),
      sales: article.units + (Math.random() * 20 - 10)
    }));
  };

  // CALCULATED VALUES
  const growth = {
    sales: ((currentOptimizedCondition.sales - currentBaseCondition.sales) / currentBaseCondition.sales * 100).toFixed(1),
    profit: ((currentOptimizedCondition.profit - currentBaseCondition.profit) / currentBaseCondition.profit * 100).toFixed(1),
    profitability: (currentOptimizedCondition.profitability - currentBaseCondition.profitability).toFixed(1),
    units: ((currentOptimizedCondition.units - currentBaseCondition.units) / currentBaseCondition.units * 100).toFixed(1)
  };

  const priceDifference = currentPromotionData.avgListPrice - currentPromotionData.avgSalePrice;
  const discountPercent = ((priceDifference / currentPromotionData.avgListPrice) * 100).toFixed(1);

  const getFormattedValue = (value, metric) => {
    if (metric === 'sales' || metric === 'profit' || metric === 'discount') {
      return `₹${(value / 100000).toFixed(2)}L`;
    }
    return value.toLocaleString();
  };

  const getMetricLabel = (metric) => {
    const labels = {
      sales: 'Sales',
      profit: 'Profit',
      units: 'Units',
      discount: 'Discount'
    };
    return labels[metric] || 'Sales';
  };

  const renderPopup = () => {
    if (!showPopup) return null;

    if (popupType === 'article' && selectedArticle) {
      return (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={() => setShowPopup(false)}>
          <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="p-6 border-b border-gray-200 flex items-center justify-between bg-gray-50">
              <div>
                <h3 className="text-xl font-semibold text-gray-900">Article {selectedArticle.article}</h3>
                <p className="text-sm text-gray-500 mt-1">Price vs Sales Trend Analysis</p>
              </div>
              <button onClick={() => setShowPopup(false)} className="w-10 h-10 rounded-lg hover:bg-gray-200 flex items-center justify-center transition-colors">
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <p className="text-xs text-gray-500 mb-1">Current Price</p>
                  <p className="text-lg font-semibold text-gray-900">₹{selectedArticle.mop}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <p className="text-xs text-gray-500 mb-1">Recommended Price</p>
                  <p className="text-lg font-semibold text-emerald-700">₹{selectedArticle.recoPrice}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <p className="text-xs text-gray-500 mb-1">Current Units</p>
                  <p className="text-lg font-semibold text-gray-900">{selectedArticle.units}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <p className="text-xs text-gray-500 mb-1">Discount</p>
                  <p className="text-lg font-semibold text-gray-900">{selectedArticle.discountPercent}%</p>
                </div>
              </div>

              <div>
                <h4 className="text-base font-semibold text-gray-900 mb-3">Historical Trend (Last 6 Months)</h4>
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="text-left py-3 px-4 text-xs font-medium text-gray-500">Month</th>
                        <th className="text-right py-3 px-4 text-xs font-medium text-gray-500">Price (₹)</th>
                        <th className="text-right py-3 px-4 text-xs font-medium text-gray-500">Sales (Units)</th>
                        <th className="text-right py-3 px-4 text-xs font-medium text-gray-500">Trend</th>
                      </tr>
                    </thead>
                    <tbody>
                      {generateTimeSeriesData(selectedArticle).map((data, idx) => (
                        <tr key={idx} className="border-t border-gray-100 hover:bg-gray-50 transition-colors">
                          <td className="py-3 px-4 font-medium text-gray-900">{data.month}</td>
                          <td className="py-3 px-4 text-right text-gray-600">₹{data.price.toFixed(2)}</td>
                          <td className="py-3 px-4 text-right text-gray-600">{Math.round(data.sales)}</td>
                          <td className="py-3 px-4 text-right">
                            {idx > 0 && (
                              data.sales > generateTimeSeriesData(selectedArticle)[idx-1].sales ? (
                                <TrendingUp className="w-4 h-4 text-emerald-600 inline" />
                              ) : (
                                <TrendingDown className="w-4 h-4 text-red-500 inline" />
                              )
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 flex justify-end gap-3 bg-gray-50">
              <button onClick={() => setShowPopup(false)} className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors">
                Close
              </button>
            </div>
          </div>
        </div>
      );
    }

    if (popupType === 'comparison') {
      return (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={() => setShowPopup(false)}>
          <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="p-6 border-b border-gray-200 bg-gray-50">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">Performance Comparison</h3>
                  <p className="text-sm text-gray-500 mt-1">Base vs Optimized Analysis</p>
                </div>
                <button onClick={() => setShowPopup(false)} className="w-10 h-10 rounded-lg hover:bg-gray-200 flex items-center justify-center transition-colors">
                  <X className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>

            <div className="p-6 bg-white">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Sales Card */}
                <div className="bg-white rounded-lg border-2 border-gray-200 p-5">
                  <div className="flex items-center gap-2 mb-4 pb-3 border-b-2 border-gray-300">
                    <div className="w-8 h-8 bg-gray-50 rounded-lg flex items-center justify-center border border-gray-200">
                      <DollarSign className="w-5 h-5 text-gray-700" />
                    </div>
                    <h4 className="text-sm font-semibold text-gray-900">Sales</h4>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                      <span className="text-xs font-semibold text-gray-700">Base</span>
                      <span className="text-base font-bold text-gray-900">₹{(currentBaseCondition.sales / 1000).toFixed(0)}K</span>
                    </div>
                    <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                      <span className="text-xs font-semibold text-gray-700">Optimized</span>
                      <span className="text-base font-bold text-emerald-700">₹{(currentOptimizedCondition.sales / 1000).toFixed(0)}K</span>
                    </div>
                    <div className="pt-2 border-t-2 border-gray-300">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-gray-700">Growth</span>
                        <div className="flex items-center gap-1">
                          <ArrowUpRight className="w-3.5 h-3.5 text-emerald-600" />
                          <span className="text-lg font-bold text-emerald-700">+{growth.sales}%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Profit Card */}
                <div className="bg-white rounded-lg border-2 border-gray-200 p-5">
                  <div className="flex items-center gap-2 mb-4 pb-3 border-b-2 border-gray-300">
                    <div className="w-8 h-8 bg-gray-50 rounded-lg flex items-center justify-center border border-gray-200">
                      <TrendingUp className="w-5 h-5 text-gray-700" />
                    </div>
                    <h4 className="text-sm font-semibold text-gray-900">Profit</h4>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                      <span className="text-xs font-semibold text-gray-700">Base</span>
                      <span className="text-base font-bold text-gray-900">₹{(currentBaseCondition.profit / 1000).toFixed(0)}K</span>
                    </div>
                    <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                      <span className="text-xs font-semibold text-gray-700">Optimized</span>
                      <span className="text-base font-bold text-emerald-700">₹{(currentOptimizedCondition.profit / 1000).toFixed(0)}K</span>
                    </div>
                    <div className="pt-2 border-t-2 border-gray-300">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-gray-700">Growth</span>
                        <div className="flex items-center gap-1">
                          <ArrowUpRight className="w-3.5 h-3.5 text-emerald-600" />
                          <span className="text-lg font-bold text-emerald-700">+{growth.profit}%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Profitability Card */}
                <div className="bg-white rounded-lg border-2 border-gray-200 p-5">
                  <div className="flex items-center gap-2 mb-4 pb-3 border-b-2 border-gray-300">
                    <div className="w-8 h-8 bg-gray-50 rounded-lg flex items-center justify-center border border-gray-200">
                      <Percent className="w-5 h-5 text-gray-700" />
                    </div>
                    <h4 className="text-sm font-semibold text-gray-900">Profitability</h4>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                      <span className="text-xs font-semibold text-gray-700">Base</span>
                      <span className="text-base font-bold text-gray-900">{currentBaseCondition.profitability}%</span>
                    </div>
                    <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                      <span className="text-xs font-semibold text-gray-700">Optimized</span>
                      <span className="text-base font-bold text-emerald-700">{currentOptimizedCondition.profitability}%</span>
                    </div>
                    <div className="pt-2 border-t-2 border-gray-300">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-gray-700">Improvement</span>
                        <span className="text-lg font-bold text-emerald-700">+{growth.profitability}%</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Units Card */}
                <div className="bg-white rounded-lg border-2 border-gray-200 p-5">
                  <div className="flex items-center gap-2 mb-4 pb-3 border-b-2 border-gray-300">
                    <div className="w-8 h-8 bg-gray-50 rounded-lg flex items-center justify-center border border-gray-200">
                      <Package className="w-5 h-5 text-gray-700" />
                    </div>
                    <h4 className="text-sm font-semibold text-gray-900">Units Sold</h4>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                      <span className="text-xs font-semibold text-gray-700">Base</span>
                      <span className="text-base font-bold text-gray-900">{currentBaseCondition.units.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                      <span className="text-xs font-semibold text-gray-700">Optimized</span>
                      <span className="text-base font-bold text-emerald-700">{currentOptimizedCondition.units.toLocaleString()}</span>
                    </div>
                    <div className="pt-2 border-t-2 border-gray-300">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-gray-700">Growth</span>
                        <div className="flex items-center gap-1">
                          <ArrowUpRight className="w-3.5 h-3.5 text-emerald-600" />
                          <span className="text-lg font-bold text-emerald-700">+{growth.units}%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 bg-gray-50 flex justify-end">
              <button onClick={() => setShowPopup(false)} className="px-5 py-2 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors">
                Close
              </button>
            </div>
          </div>
        </div>
      );
    }

    if (popupType === 'topArticles') {
      const currentTop50Data = generateTop50MockData(topArticlesMetric);
      const currentTop80Data = generateTop80MockData(topArticlesMetric);

      return (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={() => setShowPopup(false)}>
          <div className="bg-white rounded-xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden flex flex-col" onClick={(e) => e.stopPropagation()}>
            <div className="p-6 border-b border-gray-200 bg-gray-50 flex-shrink-0">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">Top Selling Articles Analysis</h3>
                  <p className="text-sm text-gray-500 mt-1">Complete breakdown by contribution</p>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="flex gap-2">
                    <button
                      onClick={() => setTopArticlesMetric('sales')}
                      className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-all border ${
                        topArticlesMetric === 'sales'
                          ? 'bg-gray-900 text-white border-gray-900'
                          : 'bg-white text-gray-600 border-gray-300 hover:border-gray-900'
                      }`}
                    >
                      <DollarSign className="w-3.5 h-3.5" />
                      Sales
                    </button>
                    <button
                      onClick={() => setTopArticlesMetric('profit')}
                      className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-all border ${
                        topArticlesMetric === 'profit'
                          ? 'bg-gray-900 text-white border-gray-900'
                          : 'bg-white text-gray-600 border-gray-300 hover:border-gray-900'
                      }`}
                    >
                      <TrendingUp className="w-3.5 h-3.5" />
                      Profit
                    </button>
                    <button
                      onClick={() => setTopArticlesMetric('units')}
                      className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-all border ${
                        topArticlesMetric === 'units'
                          ? 'bg-gray-900 text-white border-gray-900'
                          : 'bg-white text-gray-600 border-gray-300 hover:border-gray-900'
                      }`}
                    >
                      <Package className="w-3.5 h-3.5" />
                      Units
                    </button>
                    <button
                      onClick={() => setTopArticlesMetric('discount')}
                      className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-all border ${
                        topArticlesMetric === 'discount'
                          ? 'bg-gray-900 text-white border-gray-900'
                          : 'bg-white text-gray-600 border-gray-300 hover:border-gray-900'
                      }`}
                    >
                      <Percent className="w-3.5 h-3.5" />
                      Discount
                    </button>
                  </div>
                  
                  <button onClick={() => setShowPopup(false)} className="w-10 h-10 rounded-lg hover:bg-gray-200 flex items-center justify-center ml-2 transition-colors">
                    <X className="w-5 h-5 text-gray-600" />
                  </button>
                </div>
              </div>
            </div>

            <div className="px-6 pt-4 border-b border-gray-200 bg-white flex-shrink-0">
              <div className="flex gap-2">
                <button
                  onClick={() => setTopArticlesTab('overview')}
                  className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-all border-b-2 ${
                    topArticlesTab === 'overview'
                      ? 'border-gray-900 text-gray-900'
                      : 'border-transparent text-gray-500 hover:text-gray-900'
                  }`}
                >
                  Overview
                </button>
                <button
                  onClick={() => setTopArticlesTab('top50')}
                  className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-all border-b-2 ${
                    topArticlesTab === 'top50'
                      ? 'border-gray-900 text-gray-900'
                      : 'border-transparent text-gray-500 hover:text-gray-900'
                  }`}
                >
                  Top 50% Articles
                </button>
                <button
                  onClick={() => setTopArticlesTab('top80')}
                  className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-all border-b-2 ${
                    topArticlesTab === 'top80'
                      ? 'border-gray-900 text-gray-900'
                      : 'border-transparent text-gray-500 hover:text-gray-900'
                  }`}
                >
                  Top 80% Articles
                </button>
              </div>
            </div>

            <div className="p-6 bg-white flex-1 overflow-hidden">
              {topArticlesTab === 'overview' && (
                <div className="h-full overflow-auto">
                  <table className="w-full text-sm border border-gray-200 rounded-lg overflow-hidden">
                    <thead className="sticky top-0 z-10">
                      <tr className="bg-gray-50">
                        <th className="text-left py-3 px-4 font-medium text-gray-900 border-b-2 border-gray-300">Contribution</th>
                        <th className="text-right py-3 px-4 font-medium text-gray-900 border-b-2 border-gray-300">Sales</th>
                        <th className="text-right py-3 px-4 font-medium text-gray-900 border-b-2 border-gray-300">Avg Price</th>
                        <th className="text-right py-3 px-4 font-medium text-gray-900 border-b-2 border-gray-300">Max Price</th>
                        <th className="text-right py-3 px-4 font-medium text-gray-900 border-b-2 border-gray-300">Min Price</th>
                        <th className="text-right py-3 px-4 font-medium text-gray-900 border-b-2 border-gray-300">Discount</th>
                        <th className="text-right py-3 px-4 font-medium text-gray-900 border-b-2 border-gray-300">No. of Articles</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white">
                      <tr className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                        <td className="py-3 px-4 font-medium text-gray-900">Top 50% {getMetricLabel(topArticlesMetric)}</td>
                        <td className="py-3 px-4 text-right text-gray-600">₹ {currentTopArticlesSummary.top50.sales.toLocaleString()}</td>
                        <td className="py-3 px-4 text-right text-gray-600">₹ {currentTopArticlesSummary.top50.avgPrice.toLocaleString()}</td>
                        <td className="py-3 px-4 text-right text-gray-600">₹ {currentTopArticlesSummary.top50.maxPrice.toLocaleString()}</td>
                        <td className="py-3 px-4 text-right text-gray-600">₹ {currentTopArticlesSummary.top50.minPrice.toLocaleString()}</td>
                        <td className="py-3 px-4 text-right text-gray-600">₹ {currentTopArticlesSummary.top50.discount.toLocaleString()}</td>
                        <td className="py-3 px-4 text-right font-semibold text-gray-900">{currentTopArticlesSummary.top50.count.toLocaleString()}</td>
                      </tr>
                      <tr className="hover:bg-gray-50 transition-colors">
                        <td className="py-3 px-4 font-medium text-gray-900">Top 80% {getMetricLabel(topArticlesMetric)}</td>
                        <td className="py-3 px-4 text-right text-gray-600">₹ {currentTopArticlesSummary.top80.sales.toLocaleString()}</td>
                        <td className="py-3 px-4 text-right text-gray-600">₹ {currentTopArticlesSummary.top80.avgPrice.toLocaleString()}</td>
                        <td className="py-3 px-4 text-right text-gray-600">₹ {currentTopArticlesSummary.top80.maxPrice.toLocaleString()}</td>
                        <td className="py-3 px-4 text-right text-gray-600">₹ {currentTopArticlesSummary.top80.minPrice.toLocaleString()}</td>
                        <td className="py-3 px-4 text-right text-gray-600">₹ {currentTopArticlesSummary.top80.discount.toLocaleString()}</td>
                        <td className="py-3 px-4 text-right font-semibold text-gray-900">{currentTopArticlesSummary.top80.count.toLocaleString()}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}

              {topArticlesTab === 'top50' && (
                <div className="h-full overflow-auto">
                  <table className="w-full text-sm border border-gray-200 rounded-lg">
                    <thead className="sticky top-0 z-10 bg-gray-50">
                      <tr>
                        <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 border-b-2 border-gray-300">Article ID</th>
                        <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 border-b-2 border-gray-300">Product Name</th>
                        <th className="text-right py-3 px-4 text-xs font-medium text-gray-500 border-b-2 border-gray-300">{getMetricLabel(topArticlesMetric)}</th>
                        <th className="text-right py-3 px-4 text-xs font-medium text-gray-500 border-b-2 border-gray-300">Avg Price</th>
                        <th className="text-right py-3 px-4 text-xs font-medium text-gray-500 border-b-2 border-gray-300">Max Price</th>
                        <th className="text-right py-3 px-4 text-xs font-medium text-gray-500 border-b-2 border-gray-300">Min Price</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white">
                      {currentTop50Data.map((article, index) => (
                        <tr key={index} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                          <td className="py-3 px-4 font-medium text-gray-900">{article.id}</td>
                          <td className="py-3 px-4 text-gray-900">{article.name}</td>
                          <td className="py-3 px-4 text-right font-semibold text-gray-900">{getFormattedValue(article[topArticlesMetric], topArticlesMetric)}</td>
                          <td className="py-3 px-4 text-right text-gray-600">₹{(article.avgPrice / 1000).toFixed(0)}K</td>
                          <td className="py-3 px-4 text-right text-gray-600">₹{(article.maxPrice / 1000).toFixed(0)}K</td>
                          <td className="py-3 px-4 text-right text-gray-600">₹{(article.minPrice / 1000).toFixed(0)}K</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {topArticlesTab === 'top80' && (
                <div className="h-full overflow-auto">
                  <table className="w-full text-sm border border-gray-200 rounded-lg">
                    <thead className="sticky top-0 z-10 bg-gray-50">
                      <tr>
                        <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 border-b-2 border-gray-300">Article ID</th>
                        <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 border-b-2 border-gray-300">Product Name</th>
                        <th className="text-right py-3 px-4 text-xs font-medium text-gray-500 border-b-2 border-gray-300">{getMetricLabel(topArticlesMetric)}</th>
                        <th className="text-right py-3 px-4 text-xs font-medium text-gray-500 border-b-2 border-gray-300">Avg Price</th>
                        <th className="text-right py-3 px-4 text-xs font-medium text-gray-500 border-b-2 border-gray-300">Max Price</th>
                        <th className="text-right py-3 px-4 text-xs font-medium text-gray-500 border-b-2 border-gray-300">Min Price</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white">
                      {currentTop80Data.map((article, index) => (
                        <tr key={index} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                          <td className="py-3 px-4 font-medium text-gray-900">{article.id}</td>
                          <td className="py-3 px-4 text-gray-900">{article.name}</td>
                          <td className="py-3 px-4 text-right font-semibold text-gray-900">{getFormattedValue(article[topArticlesMetric], topArticlesMetric)}</td>
                          <td className="py-3 px-4 text-right text-gray-600">₹{(article.avgPrice / 1000).toFixed(0)}K</td>
                          <td className="py-3 px-4 text-right text-gray-600">₹{(article.maxPrice / 1000).toFixed(0)}K</td>
                          <td className="py-3 px-4 text-right text-gray-600">₹{(article.minPrice / 1000).toFixed(0)}K</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            <div className="p-6 border-t border-gray-200 bg-gray-50 flex justify-end flex-shrink-0">
              <button onClick={() => setShowPopup(false)} className="px-5 py-2 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors">
                Close
              </button>
            </div>
          </div>
        </div>
      );
    }

    if (popupType === 'contribution') {
      return (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={() => setShowPopup(false)}>
          <div className="bg-white rounded-xl shadow-2xl max-w-5xl w-full max-h-[90vh] flex flex-col" onClick={(e) => e.stopPropagation()}>
            <div className="p-6 border-b border-gray-200 bg-gray-50 flex-shrink-0">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">Promotion Analysis</h3>
                  <p className="text-sm text-gray-500 mt-1">Comprehensive promotion effectiveness metrics</p>
                </div>
                <button onClick={() => setShowPopup(false)} className="w-10 h-10 rounded-lg hover:bg-gray-200 flex items-center justify-center transition-colors">
                  <X className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6 bg-white">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 max-w-6xl mx-auto">
                
                <div className="bg-white rounded-lg border-2 border-gray-200 p-5">
                  <div className="flex items-center gap-2 mb-4 pb-3 border-b-2 border-gray-300">
                    <div className="w-8 h-8 bg-gray-50 rounded-lg flex items-center justify-center border border-gray-200">
                      <DollarSign className="w-5 h-5 text-gray-700" />
                    </div>
                    <h4 className="text-sm font-semibold text-gray-900">Average Pricing</h4>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                      <span className="text-xs font-semibold text-gray-700">Avg. List Price</span>
                      <span className="text-lg font-bold text-gray-900">₹{currentPromotionData.avgListPrice.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                      <span className="text-xs font-semibold text-gray-700">Avg. Sale Price @PGP</span>
                      <span className="text-lg font-bold text-emerald-700">₹{currentPromotionData.avgSalePrice.toLocaleString()}</span>
                    </div>
                    <div className="pt-2 border-t-2 border-gray-300 bg-violet-50 rounded-lg p-3 -mx-1">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <ArrowDown className="w-4 h-4 text-violet-600" />
                          <span className="text-xs font-bold text-gray-700">Discount Savings</span>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-violet-700">₹{priceDifference.toLocaleString()}</p>
                          <p className="text-[10px] font-semibold text-violet-600">({discountPercent}% off)</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg border-2 border-gray-200 p-5">
                  <div className="flex items-center gap-2 mb-4 pb-3 border-b-2 border-gray-300">
                    <div className="w-8 h-8 bg-gray-50 rounded-lg flex items-center justify-center border border-gray-200">
                      <Zap className="w-5 h-5 text-gray-700" />
                    </div>
                    <h4 className="text-sm font-semibold text-gray-900">Incremental ROI</h4>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                      <span className="text-xs font-semibold text-gray-700">Inc. Sales / Rs. Discount</span>
                      <span className="text-lg font-bold text-emerald-700">₹{currentPromotionData.incrementalROI.salesPerRs.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                      <span className="text-xs font-semibold text-gray-700">Inc. GP / Rs. Discount</span>
                      <span className="text-lg font-bold text-emerald-700">₹{currentPromotionData.incrementalROI.gpPerRs.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center pb-2">
                      <span className="text-xs font-semibold text-gray-700">Inc. Units / Rs. Discount</span>
                      <span className="text-lg font-bold text-gray-900">{currentPromotionData.incrementalROI.unitsPerRs.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg border-2 border-gray-200 p-5 lg:col-span-2">
                  <div className="flex items-center gap-2 mb-4 pb-3 border-b-2 border-gray-300">
                    <div className="w-8 h-8 bg-gray-50 rounded-lg flex items-center justify-center border border-gray-200">
                      <Percent className="w-5 h-5 text-gray-700" />
                    </div>
                    <h4 className="text-sm font-semibold text-gray-900">Percentage Under Promotion</h4>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center bg-gray-50 rounded-lg p-4 border border-gray-200">
                      <div className="flex items-center justify-center gap-2 mb-2">
                        <DollarSign className="w-4 h-4 text-violet-600" strokeWidth={2.5} />
                        <p className="text-xs font-bold text-gray-700">Sale</p>
                      </div>
                      <p className="text-3xl font-bold text-violet-700">{currentPromotionData.percentUnderPromotion.sales}%</p>
                    </div>
                    <div className="text-center bg-gray-50 rounded-lg p-4 border border-gray-200">
                      <div className="flex items-center justify-center gap-2 mb-2">
                        <TrendingUp className="w-4 h-4 text-emerald-600" strokeWidth={2.5} />
                        <p className="text-xs font-bold text-gray-700">Profit</p>
                      </div>
                      <p className="text-3xl font-bold text-emerald-700">{currentPromotionData.percentUnderPromotion.profit}%</p>
                    </div>
                    <div className="text-center bg-gray-50 rounded-lg p-4 border border-gray-200">
                      <div className="flex items-center justify-center gap-2 mb-2">
                        <Package className="w-4 h-4 text-blue-600" strokeWidth={2.5} />
                        <p className="text-xs font-bold text-gray-700">Units</p>
                      </div>
                      <p className="text-3xl font-bold text-blue-700">{currentPromotionData.percentUnderPromotion.units}%</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg border-2 border-gray-200 p-5 lg:col-span-2">
                  <div className="flex items-center gap-2 mb-4 pb-3 border-b-2 border-gray-300">
                    <div className="w-8 h-8 bg-gray-50 rounded-lg flex items-center justify-center border border-gray-200">
                      <BarChart3 className="w-5 h-5 text-gray-700" />
                    </div>
                    <h4 className="text-sm font-semibold text-gray-900">Promotion Effectiveness</h4>
                  </div>
                  <div className="bg-white rounded-lg border-2 border-gray-200 overflow-hidden">
                    <table className="w-full text-sm">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="text-left py-3 px-4 font-bold text-gray-900 border-b-2 border-gray-300"></th>
                          <th className="text-right py-3 px-4 font-bold text-gray-900 border-b-2 border-gray-300">Sales / Rs.</th>
                          <th className="text-right py-3 px-4 font-bold text-gray-900 border-b-2 border-gray-300">GP / Rs.</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white">
                        <tr className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                          <td className="py-3 px-4 font-bold text-gray-900">Base</td>
                          <td className="py-3 px-4 text-right text-base font-bold text-gray-900">₹{currentPromotionData.effectiveness.base.salesPerRs}</td>
                          <td className="py-3 px-4 text-right text-base font-bold text-gray-900">₹{currentPromotionData.effectiveness.base.gpPerRs}</td>
                        </tr>
                        <tr className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                          <td className="py-3 px-4 font-bold text-gray-900">Test</td>
                          <td className="py-3 px-4 text-right text-base font-bold text-gray-900">₹{currentPromotionData.effectiveness.test.salesPerRs}</td>
                          <td className="py-3 px-4 text-right text-base font-bold text-gray-900">₹{currentPromotionData.effectiveness.test.gpPerRs}</td>
                        </tr>
                        <tr className="bg-emerald-50 hover:bg-emerald-100 transition-colors">
                          <td className="py-3 px-4 font-bold text-gray-900 flex items-center gap-2">
                            <Zap className="w-4 h-4 text-emerald-600" strokeWidth={2.5} />
                            Incremental
                          </td>
                          <td className="py-3 px-4 text-right text-lg font-bold text-emerald-700">₹{currentPromotionData.effectiveness.incremental.salesPerRs}</td>
                          <td className="py-3 px-4 text-right text-lg font-bold text-emerald-700">₹{currentPromotionData.effectiveness.incremental.gpPerRs}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 bg-gray-50 flex justify-end flex-shrink-0">
              <button onClick={() => setShowPopup(false)} className="px-5 py-2 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors">
                Close
              </button>
            </div>
          </div>
        </div>
      );
    }

    if (popupType === 'charts') {
      return (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={() => setShowPopup(false)}>
          <div className="bg-white rounded-xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="p-6 border-b border-gray-200 bg-gray-50">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">Price-Sales-Competition Analysis</h3>
                  <p className="text-sm text-gray-500 mt-1">Comprehensive market analysis charts</p>
                </div>
                <button onClick={() => setShowPopup(false)} className="w-10 h-10 rounded-lg hover:bg-gray-200 flex items-center justify-center transition-colors">
                  <X className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>

            <div className="p-6 bg-white">
              <div className="h-96 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center bg-gray-50">
                <div className="text-center">
                  <BarChart3 className="w-16 h-16 text-gray-400 mx-auto mb-3" />
                  <p className="text-sm text-gray-500">Charts: Bars, Pies, Scatters (To be implemented)</p>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 bg-gray-50 flex justify-end">
              <button onClick={() => setShowPopup(false)} className="px-5 py-2 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors">
                Close
              </button>
            </div>
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 🔥 FIXED: Only render sidebar when NOT in history mode */}
      {viewMode !== 'history' && (
        <PriceGenixSidebar 
          isOpen={sidebarOpen} 
          toggleSidebar={toggleSidebar}
          uploadedFile={uploadedFile}
          onFileUpload={setUploadedFile}
          selectedOptimization={selectedOptimization}
          onOptimizationChange={setSelectedOptimization}
          constraints={constraints}
          onConstraintsChange={setConstraints}
          onRunOptimization={handleRunOptimization}
          onReset={handleReset}
        />
      )}
      
      <Navbar toggleSidebar={toggleSidebar} showMenuButton={viewMode !== 'history'} currentProduct="pricegenix" />
      
      {/* 🔥 FIXED: Full width in history mode */}
      <div className={`pt-16 transition-all duration-300 ${viewMode === 'history' ? 'ml-0' : 'lg:ml-[320px]'}`}>
        <div className="p-4 sm:p-6 space-y-4">
          {/* 🔥 COMPACT HISTORY BANNER - Matches UI Theme */}
          {viewMode === 'history' && selectedHistoryItem && (
            <div className="bg-white rounded-lg p-4 shadow-sm border-2 border-gray-300">
              <div className="flex items-center justify-between gap-4">
                {/* Left: Info Section */}
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div className="w-9 h-9 bg-gray-900 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Eye className="w-5 h-5 text-white" strokeWidth={2} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-bold text-gray-900 truncate">{selectedHistoryItem.name}</h3>
                    <div className="flex items-center gap-3 mt-0.5">
                      <p className="text-xs text-gray-500 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {selectedHistoryItem.date}
                      </p>
                      <span className="text-xs text-gray-400">•</span>
                      <p className="text-xs font-medium text-gray-700">{selectedHistoryItem.objective}</p>
                      <span className="text-xs text-gray-400">•</span>
                      <p className="text-xs text-gray-600">{selectedHistoryItem.constraints}</p>
                    </div>
                  </div>
                </div>

                {/* Right: Back Button */}
                <button
                  onClick={handleBackToCurrent}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-900 text-white rounded-lg text-xs font-semibold hover:bg-gray-800 transition-colors shadow-sm flex-shrink-0"
                >
                  <ChevronLeft className="w-3.5 h-3.5" strokeWidth={2.5} />
                  Back
                </button>
              </div>
            </div>
          )}

          {/* SCORING LEVELS + PAST ITERATIONS - Only show in current mode */}
          {viewMode === 'current' && (
            <div className="bg-white rounded-lg p-3 sm:p-4 shadow-sm border border-gray-200">
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                {/* LEFT: Scoring Levels */}
                <div className="flex flex-col gap-2 flex-1">
                  <label className="text-xs sm:text-sm font-semibold text-gray-900">Scoring Levels</label>
                  <div className="flex flex-wrap gap-2">
                    {scoringOptions.map((option) => (
                      <button
                        key={option}
                        onClick={() => toggleScoringLevel(option)}
                        className={`px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg text-xs font-medium transition-all ${
                          scoringLevels.includes(option)
                            ? 'bg-gray-900 text-white'
                            : 'bg-white border border-gray-300 text-gray-600 hover:border-gray-900'
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>

                {/* SEPARATOR */}
                <div className="hidden lg:block w-px h-16 bg-gray-300 self-stretch"></div>

                {/* RIGHT: Past Iterations */}
                <div className="flex flex-col gap-2 lg:w-auto lg:min-w-[280px]">
                  <label className="text-xs sm:text-sm font-semibold text-gray-900">Past Iterations</label>
                  <div className="relative">
                    <button 
                      onClick={() => setIsHistoryDropdownOpen(!isHistoryDropdownOpen)}
                      className="w-full flex items-center justify-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-gray-900 text-white rounded-lg text-xs font-medium hover:bg-gray-800 transition-colors"
                    >
                      <History className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      <span>View History ({mockPastIterations.length})</span>
                      <ChevronRight className={`w-3.5 h-3.5 sm:w-4 sm:h-4 transform transition-transform ${isHistoryDropdownOpen ? 'rotate-90' : ''}`} />
                    </button>
                    
                    {isHistoryDropdownOpen && (
                      <>
                        <div 
                          className="fixed inset-0 z-40" 
                          onClick={() => setIsHistoryDropdownOpen(false)}
                        />
                        
                        <div className="absolute right-0 mt-2 w-full sm:w-80 bg-white rounded-lg shadow-xl border border-gray-200 z-50">
                          <div className="p-2 max-h-80 overflow-y-auto">
                            <div className="px-3 py-2 border-b border-gray-200">
                              <p className="text-xs font-semibold text-gray-900">Historical Runs</p>
                              <p className="text-[10px] text-gray-500 mt-0.5">Click to view past results</p>
                            </div>
                            {mockPastIterations.map((iteration) => (
                              <button
                                key={iteration.id}
                                onClick={() => handleViewHistory(iteration)}
                                className="w-full text-left px-3 py-2.5 hover:bg-gray-50 rounded-lg transition-colors group/item"
                              >
                                <div className="flex items-center justify-between mb-1">
                                  <p className="text-xs sm:text-sm font-medium text-gray-900 group-hover/item:text-blue-600">{iteration.name}</p>
                                  <Eye className="w-3.5 h-3.5 text-gray-400 opacity-0 group-hover/item:opacity-100 transition-opacity" />
                                </div>
                                <p className="text-[10px] text-gray-500">{iteration.date}</p>
                                <div className="flex items-center gap-2 mt-1.5">
                                  <span className="px-1.5 py-0.5 rounded text-[10px] font-medium bg-blue-100 text-blue-700">
                                    {iteration.objective}
                                  </span>
                                  <span className="text-[10px] text-gray-500">•</span>
                                  <span className="text-[10px] text-gray-600 font-medium">
                                    ₹{(iteration.sales / 1000).toFixed(0)}K
                                  </span>
                                </div>
                              </button>
                            ))}
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {hasResults ? (
            <>
              {/* Dashboard Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div 
                  onClick={() => handleCardClick('comparison')}
                  className="bg-white rounded-lg p-4 shadow-sm border border-gray-200 hover:shadow-md hover:border-gray-400 transition-all cursor-pointer group"
                >
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-semibold text-gray-900">Performance</h3>
                    <Maximize2 className="w-4 h-4 text-gray-400 group-hover:text-gray-900 group-hover:scale-110 transition-all" />
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <p className="text-gray-500">Base Sales</p>
                      <p className="font-semibold text-gray-900">₹{(currentBaseCondition.sales / 1000).toFixed(0)}K</p>
                    </div>
                    <div className="text-right">
                      <p className="text-gray-500">Optimized</p>
                      <p className="font-semibold text-emerald-700">₹{(currentOptimizedCondition.sales / 1000).toFixed(0)}K <span className="text-[10px]">+{growth.sales}%</span></p>
                    </div>
                  </div>
                </div>

                <div 
                  onClick={() => handleCardClick('topArticles')}
                  className="bg-white rounded-lg p-4 shadow-sm border border-gray-200 hover:shadow-md hover:border-gray-400 transition-all cursor-pointer group"
                >
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-semibold text-gray-900">Top Articles</h3>
                    <Maximize2 className="w-4 h-4 text-gray-400 group-hover:text-gray-900 group-hover:scale-110 transition-all" />
                  </div>
                  <div className="space-y-1 text-xs">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Top 50%</span>
                      <span className="font-medium text-gray-900">{currentTopArticlesSummary.top50.count.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Top 80%</span>
                      <span className="font-medium text-gray-900">{currentTopArticlesSummary.top80.count.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <div 
                  onClick={() => handleCardClick('contribution')}
                  className="bg-white rounded-lg p-4 shadow-sm border border-gray-200 hover:shadow-md hover:border-gray-400 transition-all cursor-pointer group"
                >
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-semibold text-gray-900">Promotions</h3>
                    <Maximize2 className="w-4 h-4 text-gray-400 group-hover:text-gray-900 group-hover:scale-110 transition-all" />
                  </div>
                  <div className="space-y-1 text-xs">
                    <div className="flex justify-between">
                      <span className="text-gray-500">ROI / Rs.</span>
                      <span className="font-medium text-gray-900">₹{currentPromotionData.incrementalROI.salesPerRs.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">% Sale</span>
                      <span className="font-medium text-gray-900">{currentPromotionData.percentUnderPromotion.sales}%</span>
                    </div>
                  </div>
                </div>

                <div 
                  onClick={() => handleCardClick('charts')}
                  className="bg-white rounded-lg p-4 shadow-sm border border-gray-200 hover:shadow-md hover:border-gray-400 transition-all cursor-pointer group"
                >
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-semibold text-gray-900">Analysis</h3>
                    <Maximize2 className="w-4 h-4 text-gray-400 group-hover:text-gray-900 group-hover:scale-110 transition-all" />
                  </div>
                  <div className="flex items-center justify-center h-12">
                    <BarChart3 className="w-8 h-8 text-gray-400 group-hover:text-gray-900 group-hover:scale-110 transition-all" />
                  </div>
                  <p className="text-[10px] text-center text-gray-500 mt-2">Price-Sales-Competition</p>
                </div>
              </div>

              {/* Results Table */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-3 sm:p-4 border-b border-gray-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 bg-gray-50">
                  <div>
                    <h2 className="text-sm font-semibold text-gray-900">
                      {viewMode === 'history' ? 'Historical Results' : 'Optimized Results'}
                    </h2>
                    <p className="text-xs text-gray-500">Click row for detailed analysis</p>
                  </div>
                  <button
                    onClick={handleDownload}
                    className="flex items-center justify-center gap-2 px-3 py-1.5 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors text-xs font-medium"
                  >
                    <Download className="w-3.5 h-3.5" strokeWidth={2} />
                    Export CSV
                  </button>
                </div>
                
                <div className="overflow-x-auto max-h-[400px]">
                  <table className="w-full text-xs min-w-max">
                    <thead className="sticky top-0 bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="text-left py-2 px-3 text-[10px] font-medium text-gray-500 whitespace-nowrap">Article</th>
                        <th className="text-left py-2 px-3 text-[10px] font-medium text-gray-500 whitespace-nowrap">Status</th>
                        <th className="text-right py-2 px-3 text-[10px] font-medium text-gray-500 whitespace-nowrap">Stock</th>
                        <th className="text-right py-2 px-3 text-[10px] font-medium text-gray-500 whitespace-nowrap">MOP</th>
                        <th className="text-right py-2 px-3 text-[10px] font-medium text-gray-500 whitespace-nowrap">NLC</th>
                        <th className="text-right py-2 px-3 text-[10px] font-medium text-gray-500 whitespace-nowrap">Max Price</th>
                        <th className="text-right py-2 px-3 text-[10px] font-medium text-gray-500 whitespace-nowrap">Min Price</th>
                        <th className="text-right py-2 px-3 text-[10px] font-medium text-gray-500 whitespace-nowrap">Reco. Price</th>
                        <th className="text-right py-2 px-3 text-[10px] font-medium text-gray-500 whitespace-nowrap">Discount</th>
                        <th className="text-right py-2 px-3 text-[10px] font-medium text-gray-500 whitespace-nowrap">Discount %</th>
                        <th className="text-right py-2 px-3 text-[10px] font-medium text-gray-500 whitespace-nowrap">Units</th>
                        <th className="text-right py-2 px-3 text-[10px] font-medium text-gray-500 whitespace-nowrap">DR</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white">
                      {resultsData.map((row, index) => (
                        <tr 
                          key={index} 
                          onClick={() => handleRowClick(row)}
                          className="border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors"
                        >
                          <td className="py-2 px-3 font-medium text-blue-600 whitespace-nowrap">{row.article}</td>
                          <td className="py-2 px-3 whitespace-nowrap">
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${
                              row.status === 'Completed' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                            }`}>
                              {row.status}
                            </span>
                          </td>
                          <td className="py-2 px-3 text-right text-gray-600 whitespace-nowrap">{row.stock}</td>
                          <td className="py-2 px-3 text-right text-gray-600 whitespace-nowrap">₹{row.mop}</td>
                          <td className="py-2 px-3 text-right text-gray-600 whitespace-nowrap">₹{row.nlc}</td>
                          <td className="py-2 px-3 text-right text-gray-600 whitespace-nowrap">₹{row.maxPrice}</td>
                          <td className="py-2 px-3 text-right text-gray-600 whitespace-nowrap">₹{row.minPrice}</td>
                          <td className="py-2 px-3 text-right font-medium text-emerald-700 whitespace-nowrap">₹{row.recoPrice}</td>
                          <td className="py-2 px-3 text-right text-gray-600 whitespace-nowrap">₹{row.discount}</td>
                          <td className="py-2 px-3 text-right text-gray-600 whitespace-nowrap">{row.discountPercent}%</td>
                          <td className="py-2 px-3 text-right text-gray-600 whitespace-nowrap">{row.units}</td>
                          <td className="py-2 px-3 text-right text-gray-600 whitespace-nowrap">{row.dr}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          ) : (
            <div className="bg-white rounded-lg p-8 sm:p-12 shadow-sm border border-gray-200 text-center">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-4 border border-gray-200">
                <Target className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400" strokeWidth={2} />
              </div>
              <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">Ready to Optimize</h2>
              <p className="text-xs sm:text-sm text-gray-500 max-w-md mx-auto">
                Configure parameters in the sidebar and click "Run Engine" to start optimization
              </p>
            </div>
          )}
        </div>
      </div>

      {renderPopup()}
    </div>
  );
};

export default PriceGenix;
