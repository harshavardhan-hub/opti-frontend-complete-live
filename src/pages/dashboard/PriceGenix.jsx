import React, { useState } from 'react';
import Navbar from '../../components/common/Navbar';
import PriceGenixSidebar from '../../components/sidebars/PriceGenixSidebar';
import { TrendingUp, DollarSign, Percent, Package, Award, Target, BarChart3, Download, X, TrendingDown, Maximize2, ChevronRight, ArrowUpRight, Users, TrendingUpIcon } from 'lucide-react';

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

  const scoringOptions = ['Article', 'Brand', 'Category', 'Store', 'Geography'];

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const handleRunOptimization = () => {
    const mockResults = [
      { article: '#1234', status: 'In-Progress', stock: 50, mop: 100, nlc: 75, maxPrice: 120, minPrice: 80, recoPrice: 95, discount: 5, discountPercent: 5.3, units: 67, dr: 1.2 },
      { article: '#1235', status: 'Completed', stock: 45, mop: 110, nlc: 80, maxPrice: 130, minPrice: 85, recoPrice: 105, discount: 5, discountPercent: 4.8, units: 72, dr: 1.3 },
      { article: '#1236', status: 'In-Progress', stock: 60, mop: 95, nlc: 70, maxPrice: 115, minPrice: 75, recoPrice: 90, discount: 5, discountPercent: 5.6, units: 65, dr: 1.1 },
      { article: '#1237', status: 'Completed', stock: 55, mop: 105, nlc: 78, maxPrice: 125, minPrice: 82, recoPrice: 98, discount: 7, discountPercent: 6.7, units: 70, dr: 1.25 },
      { article: '#1238', status: 'In-Progress', stock: 48, mop: 98, nlc: 72, maxPrice: 118, minPrice: 78, recoPrice: 92, discount: 6, discountPercent: 6.1, units: 68, dr: 1.15 },
    ];
    setResultsData(mockResults);
    setHasResults(true);
  };

  const handleReset = () => {
    setConstraints([]);
    setSelectedOptimization('sales');
    setScoringLevels(['Article']);
    setHasResults(false);
    setResultsData([]);
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
    a.download = 'pricegenix-optimized-results.csv';
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
  };

  const generateTimeSeriesData = (article) => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
    return months.map((month, idx) => ({
      month,
      price: article.mop + (Math.random() * 10 - 5),
      sales: article.units + (Math.random() * 20 - 10)
    }));
  };

  const baseCondition = {
    sales: 1250000,
    profit: 325000,
    profitability: 26.0,
    units: 8500
  };

  const optimizedCondition = {
    sales: 1425000,
    profit: 398750,
    profitability: 28.0,
    units: 9200
  };

  const growth = {
    sales: ((optimizedCondition.sales - baseCondition.sales) / baseCondition.sales * 100).toFixed(1),
    profit: ((optimizedCondition.profit - baseCondition.profit) / baseCondition.profit * 100).toFixed(1),
    units: ((optimizedCondition.units - baseCondition.units) / baseCondition.units * 100).toFixed(1)
  };

  const topArticles = [
    { id: '#A1234', name: 'Product Alpha', contribution: 18.5, sales: 231250 },
    { id: '#A1235', name: 'Product Beta', contribution: 15.2, sales: 190000 },
    { id: '#A1236', name: 'Product Gamma', contribution: 12.8, sales: 160000 },
    { id: '#A1237', name: 'Product Delta', contribution: 9.5, sales: 118750 },
  ];

  const renderPopup = () => {
    if (!showPopup) return null;

    if (popupType === 'article' && selectedArticle) {
      return (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowPopup(false)}>
          <div className="bg-white rounded-2xl shadow-premium-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="p-6 border-b border-border-gray flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-primary-text">Article {selectedArticle.article}</h3>
                <p className="text-sm text-muted-text mt-1">Price vs Sales Trend Analysis</p>
              </div>
              <button onClick={() => setShowPopup(false)} className="w-10 h-10 rounded-xl hover:bg-gray-100 flex items-center justify-center">
                <X className="w-5 h-5 text-secondary-text" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-xs text-muted-text mb-1">Current Price</p>
                  <p className="text-lg font-bold text-primary-text">₹{selectedArticle.mop}</p>
                </div>
                <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                  <p className="text-xs text-muted-text mb-1">Recommended Price</p>
                  <p className="text-lg font-bold text-chart-green">₹{selectedArticle.recoPrice}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-xs text-muted-text mb-1">Current Units</p>
                  <p className="text-lg font-bold text-primary-text">{selectedArticle.units}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-xs text-muted-text mb-1">Discount</p>
                  <p className="text-lg font-bold text-primary-text">{selectedArticle.discountPercent}%</p>
                </div>
              </div>

              <div>
                <h4 className="text-base font-bold text-primary-text mb-3">Historical Trend (Last 6 Months)</h4>
                <div className="border border-border-gray rounded-xl overflow-hidden">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="text-left py-3 px-4 text-xs font-semibold text-muted-text">Month</th>
                        <th className="text-right py-3 px-4 text-xs font-semibold text-muted-text">Price (₹)</th>
                        <th className="text-right py-3 px-4 text-xs font-semibold text-muted-text">Sales (Units)</th>
                        <th className="text-right py-3 px-4 text-xs font-semibold text-muted-text">Trend</th>
                      </tr>
                    </thead>
                    <tbody>
                      {generateTimeSeriesData(selectedArticle).map((data, idx) => (
                        <tr key={idx} className="border-t border-border-gray hover:bg-gray-50">
                          <td className="py-3 px-4 font-medium text-primary-text">{data.month}</td>
                          <td className="py-3 px-4 text-right text-secondary-text">₹{data.price.toFixed(2)}</td>
                          <td className="py-3 px-4 text-right text-secondary-text">{Math.round(data.sales)}</td>
                          <td className="py-3 px-4 text-right">
                            {idx > 0 && (
                              data.sales > generateTimeSeriesData(selectedArticle)[idx-1].sales ? (
                                <TrendingUp className="w-4 h-4 text-chart-green inline" />
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

            <div className="p-6 border-t border-border-gray flex justify-end gap-3">
              <button onClick={() => setShowPopup(false)} className="px-4 py-2 border border-border-gray rounded-lg text-sm font-semibold text-secondary-text hover:bg-gray-50">
                Close
              </button>
            </div>
          </div>
        </div>
      );
    }

    if (popupType === 'comparison') {
      return (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowPopup(false)}>
          <div className="bg-white rounded-2xl shadow-premium-xl max-w-5xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="p-6 border-b border-border-gray flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-primary-text">Base vs Optimized Analysis</h3>
                <p className="text-sm text-muted-text mt-1">Detailed performance comparison</p>
              </div>
              <button onClick={() => setShowPopup(false)} className="w-10 h-10 rounded-xl hover:bg-gray-100 flex items-center justify-center">
                <X className="w-5 h-5 text-secondary-text" />
              </button>
            </div>

            <div className="p-6">
              {/* Card-Based Comparison - UI Theme Matched */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Sales Card */}
                <div className="bg-white rounded-xl p-5 border border-border-gray shadow-premium">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-slate-600 to-slate-700 rounded-lg flex items-center justify-center shadow-md">
                      <DollarSign className="w-5 h-5 text-white" strokeWidth={2.5} />
                    </div>
                    <h4 className="text-base font-bold text-primary-text">Sales</h4>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 rounded-lg p-3 border border-border-gray">
                      <p className="text-xs text-muted-text mb-1">Base</p>
                      <p className="text-xl font-bold text-primary-text">₹{(baseCondition.sales / 1000).toFixed(0)}K</p>
                    </div>
                    <div className="bg-green-50 rounded-lg p-3 border-2 border-green-300 shadow-sm">
                      <p className="text-xs text-muted-text mb-1">Optimized</p>
                      <p className="text-xl font-bold text-chart-green">₹{(optimizedCondition.sales / 1000).toFixed(0)}K</p>
                      <div className="flex items-center gap-1 mt-1">
                        <ArrowUpRight className="w-3 h-3 text-chart-green" />
                        <span className="text-xs font-bold text-chart-green">+{growth.sales}%</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Profit Card */}
                <div className="bg-white rounded-xl p-5 border border-border-gray shadow-premium">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-green-600 to-emerald-700 rounded-lg flex items-center justify-center shadow-md">
                      <TrendingUp className="w-5 h-5 text-white" strokeWidth={2.5} />
                    </div>
                    <h4 className="text-base font-bold text-primary-text">Profit</h4>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 rounded-lg p-3 border border-border-gray">
                      <p className="text-xs text-muted-text mb-1">Base</p>
                      <p className="text-xl font-bold text-primary-text">₹{(baseCondition.profit / 1000).toFixed(0)}K</p>
                    </div>
                    <div className="bg-green-50 rounded-lg p-3 border-2 border-green-300 shadow-sm">
                      <p className="text-xs text-muted-text mb-1">Optimized</p>
                      <p className="text-xl font-bold text-chart-green">₹{(optimizedCondition.profit / 1000).toFixed(0)}K</p>
                      <div className="flex items-center gap-1 mt-1">
                        <ArrowUpRight className="w-3 h-3 text-chart-green" />
                        <span className="text-xs font-bold text-chart-green">+{growth.profit}%</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Profitability Card */}
                <div className="bg-white rounded-xl p-5 border border-border-gray shadow-premium">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center shadow-md">
                      <Percent className="w-5 h-5 text-white" strokeWidth={2.5} />
                    </div>
                    <h4 className="text-base font-bold text-primary-text">Profitability</h4>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 rounded-lg p-3 border border-border-gray">
                      <p className="text-xs text-muted-text mb-1">Base</p>
                      <p className="text-xl font-bold text-primary-text">{baseCondition.profitability}%</p>
                    </div>
                    <div className="bg-green-50 rounded-lg p-3 border-2 border-green-300 shadow-sm">
                      <p className="text-xs text-muted-text mb-1">Optimized</p>
                      <p className="text-xl font-bold text-chart-green">{optimizedCondition.profitability}%</p>
                      <div className="flex items-center gap-1 mt-1">
                        <ArrowUpRight className="w-3 h-3 text-chart-green" />
                        <span className="text-xs font-bold text-chart-green">+{(optimizedCondition.profitability - baseCondition.profitability).toFixed(1)}%</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Units Card */}
                <div className="bg-white rounded-xl p-5 border border-border-gray shadow-premium">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-purple-700 rounded-lg flex items-center justify-center shadow-md">
                      <Package className="w-5 h-5 text-white" strokeWidth={2.5} />
                    </div>
                    <h4 className="text-base font-bold text-primary-text">Units</h4>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 rounded-lg p-3 border border-border-gray">
                      <p className="text-xs text-muted-text mb-1">Base</p>
                      <p className="text-xl font-bold text-primary-text">{baseCondition.units}</p>
                    </div>
                    <div className="bg-green-50 rounded-lg p-3 border-2 border-green-300 shadow-sm">
                      <p className="text-xs text-muted-text mb-1">Optimized</p>
                      <p className="text-xl font-bold text-chart-green">{optimizedCondition.units}</p>
                      <div className="flex items-center gap-1 mt-1">
                        <ArrowUpRight className="w-3 h-3 text-chart-green" />
                        <span className="text-xs font-bold text-chart-green">+{growth.units}%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-border-gray flex justify-end">
              <button onClick={() => setShowPopup(false)} className="px-4 py-2 bg-primary-text text-white rounded-lg text-sm font-semibold hover:bg-brand-dark transition-colors">
                Close
              </button>
            </div>
          </div>
        </div>
      );
    }

    if (popupType === 'topArticles') {
      return (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowPopup(false)}>
          <div className="bg-white rounded-2xl shadow-premium-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="p-6 border-b border-border-gray flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-primary-text">Top Selling Articles</h3>
                <p className="text-sm text-muted-text mt-1">Complete list with detailed analytics</p>
              </div>
              <button onClick={() => setShowPopup(false)} className="w-10 h-10 rounded-xl hover:bg-gray-100 flex items-center justify-center">
                <X className="w-5 h-5 text-secondary-text" />
              </button>
            </div>

            <div className="p-6">
              <div className="border border-border-gray rounded-xl overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-left py-3 px-4 text-xs font-semibold text-muted-text">Rank</th>
                      <th className="text-left py-3 px-4 text-xs font-semibold text-muted-text">Article ID</th>
                      <th className="text-left py-3 px-4 text-xs font-semibold text-muted-text">Product Name</th>
                      <th className="text-right py-3 px-4 text-xs font-semibold text-muted-text">Sales</th>
                      <th className="text-right py-3 px-4 text-xs font-semibold text-muted-text">Contribution</th>
                    </tr>
                  </thead>
                  <tbody>
                    {topArticles.map((article, index) => (
                      <tr key={index} className="border-t border-border-gray hover:bg-gray-50">
                        <td className="py-3 px-4 font-bold text-primary-text">#{index + 1}</td>
                        <td className="py-3 px-4 font-semibold text-primary-text">{article.id}</td>
                        <td className="py-3 px-4 text-secondary-text">{article.name}</td>
                        <td className="py-3 px-4 text-right font-semibold text-primary-text">₹{(article.sales / 1000).toFixed(0)}K</td>
                        <td className="py-3 px-4 text-right">
                          <span className="px-3 py-1 bg-green-100 text-chart-green rounded-lg font-semibold">
                            {article.contribution}%
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="p-6 border-t border-border-gray flex justify-end">
              <button onClick={() => setShowPopup(false)} className="px-4 py-2 bg-primary-text text-white rounded-lg text-sm font-semibold hover:bg-brand-dark transition-colors">
                Close
              </button>
            </div>
          </div>
        </div>
      );
    }

    if (popupType === 'contribution') {
      return (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowPopup(false)}>
          <div className="bg-white rounded-2xl shadow-premium-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="p-6 border-b border-border-gray flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-primary-text">Contribution Analysis</h3>
                <p className="text-sm text-muted-text mt-1">Article performance breakdown</p>
              </div>
              <button onClick={() => setShowPopup(false)} className="w-10 h-10 rounded-xl hover:bg-gray-100 flex items-center justify-center">
                <X className="w-5 h-5 text-secondary-text" />
              </button>
            </div>

            <div className="p-6">
              {/* Redesigned Contribution Cards - Clean & Modern */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Top 50% Card */}
                <div className="bg-white rounded-xl p-6 border-2 border-blue-200 shadow-premium-md">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-md">
                      <Users className="w-6 h-6 text-white" strokeWidth={2.5} />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-muted-text">Top 50% Contributors</h4>
                    </div>
                  </div>
                  
                  <div className="bg-blue-50 rounded-lg p-4 border-2 border-blue-200 mb-4">
                    <div className="text-5xl font-bold text-blue-600 mb-2">12</div>
                    <div className="text-sm text-secondary-text">Articles</div>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm text-secondary-text">
                    <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                    <span>Driving 50% of total revenue</span>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-border-gray">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-muted-text">Avg. Contribution</span>
                      <span className="font-bold text-blue-600">4.17%</span>
                    </div>
                  </div>
                </div>

                {/* Top 80% Card */}
                <div className="bg-white rounded-xl p-6 border-2 border-purple-200 shadow-premium-md">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-md">
                      <BarChart3 className="w-6 h-6 text-white" strokeWidth={2.5} />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-muted-text">Top 80% Contributors</h4>
                    </div>
                  </div>
                  
                  <div className="bg-purple-50 rounded-lg p-4 border-2 border-purple-200 mb-4">
                    <div className="text-5xl font-bold text-purple-600 mb-2">35</div>
                    <div className="text-sm text-secondary-text">Articles</div>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm text-secondary-text">
                    <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                    <span>Driving 80% of total revenue</span>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-border-gray">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-muted-text">Avg. Contribution</span>
                      <span className="font-bold text-purple-600">2.29%</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Summary Bar */}
              <div className="mt-6 bg-gray-50 rounded-xl p-5 border border-border-gray">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Award className="w-5 h-5 text-chart-green" />
                    <span className="text-sm font-semibold text-primary-text">Pareto Principle Applied</span>
                  </div>
                  <div className="text-sm text-muted-text">
                    <span className="font-bold text-primary-text">20%</span> of articles generate <span className="font-bold text-chart-green">80%</span> revenue
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-border-gray flex justify-end">
              <button onClick={() => setShowPopup(false)} className="px-4 py-2 bg-primary-text text-white rounded-lg text-sm font-semibold hover:bg-brand-dark transition-colors">
                Close
              </button>
            </div>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="min-h-screen bg-main-bg">
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
      <Navbar toggleSidebar={toggleSidebar} showMenuButton={true} currentProduct="pricegenix" />
      
      <div className="lg:ml-[320px] pt-16">
        <div className="p-4 sm:p-6 space-y-4">
          {/* Compact Scoring Levels Bar */}
          <div className="bg-card-bg rounded-xl p-3 shadow-premium-md border border-border-gray">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <label className="text-xs font-bold text-primary-text">Scoring Levels</label>
              <div className="flex flex-wrap gap-2">
                {scoringOptions.map((option) => (
                  <button
                    key={option}
                    onClick={() => toggleScoringLevel(option)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                      scoringLevels.includes(option)
                        ? 'bg-primary-text text-white shadow-premium'
                        : 'bg-white border border-border-gray text-secondary-text hover:border-secondary-text'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {hasResults ? (
            <>
              {/* Compact Dashboard Cards - All Clickable */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Base vs Optimized - Compact with Click */}
                <div 
                  onClick={() => handleCardClick('comparison')}
                  className="bg-white rounded-xl p-4 shadow-premium-md border border-border-gray hover:shadow-premium-lg transition-all cursor-pointer group"
                >
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-bold text-primary-text">Performance</h3>
                    <Maximize2 className="w-4 h-4 text-muted-text group-hover:text-primary-text transition-colors" />
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <p className="text-muted-text">Base Sales</p>
                      <p className="font-bold text-primary-text">₹1250K</p>
                    </div>
                    <div className="text-right">
                      <p className="text-muted-text">Optimized</p>
                      <p className="font-bold text-chart-green">₹1425K <span className="text-[10px]">+14%</span></p>
                    </div>
                  </div>
                </div>

                {/* Top Articles - Compact with Click */}
                <div 
                  onClick={() => handleCardClick('topArticles')}
                  className="bg-white rounded-xl p-4 shadow-premium-md border border-border-gray hover:shadow-premium-lg transition-all cursor-pointer group"
                >
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-bold text-primary-text">Top Articles</h3>
                    <Maximize2 className="w-4 h-4 text-muted-text group-hover:text-primary-text transition-colors" />
                  </div>
                  <div className="space-y-1 text-xs">
                    <div className="flex justify-between">
                      <span className="text-muted-text">#A1234</span>
                      <span className="font-semibold text-chart-green">18.5%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-text">#A1235</span>
                      <span className="font-semibold text-chart-green">15.2%</span>
                    </div>
                  </div>
                </div>

                {/* Contribution - Inside Border Design (Kept Blue/Purple) */}
                <div 
                  onClick={() => handleCardClick('contribution')}
                  className="bg-white rounded-xl p-4 shadow-premium-md border border-border-gray hover:shadow-premium-lg transition-all cursor-pointer group"
                >
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-bold text-primary-text">Contributors</h3>
                    <Maximize2 className="w-4 h-4 text-muted-text group-hover:text-primary-text transition-colors" />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-blue-50 rounded-lg p-2 border-2 border-blue-200">
                      <p className="text-[10px] text-muted-text mb-1">Top 50%</p>
                      <p className="text-2xl font-bold text-blue-600">12</p>
                    </div>
                    <div className="bg-purple-50 rounded-lg p-2 border-2 border-purple-200">
                      <p className="text-[10px] text-muted-text mb-1">Top 80%</p>
                      <p className="text-2xl font-bold text-purple-600">35</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Results Table - ALL COLUMNS */}
              <div className="bg-white rounded-xl shadow-premium-md border border-border-gray overflow-hidden">
                <div className="p-4 border-b border-border-gray flex items-center justify-between">
                  <div>
                    <h2 className="text-sm font-bold text-primary-text">Optimized Results</h2>
                    <p className="text-xs text-muted-text">Click row for detailed analysis</p>
                  </div>
                  <button
                    onClick={handleDownload}
                    className="flex items-center gap-2 px-3 py-1.5 bg-primary-text text-white rounded-lg hover:bg-brand-dark transition-colors text-xs font-semibold"
                  >
                    <Download className="w-3.5 h-3.5" strokeWidth={2} />
                    CSV
                  </button>
                </div>
                
                <div className="overflow-x-auto max-h-[400px]">
                  <table className="w-full text-xs">
                    <thead className="sticky top-0 bg-gray-50 border-b border-border-gray">
                      <tr>
                        <th className="text-left py-2 px-3 text-[10px] font-bold text-primary-text whitespace-nowrap">Article</th>
                        <th className="text-left py-2 px-3 text-[10px] font-bold text-primary-text whitespace-nowrap">Status</th>
                        <th className="text-right py-2 px-3 text-[10px] font-bold text-primary-text whitespace-nowrap">Stock</th>
                        <th className="text-right py-2 px-3 text-[10px] font-bold text-primary-text whitespace-nowrap">MOP</th>
                        <th className="text-right py-2 px-3 text-[10px] font-bold text-primary-text whitespace-nowrap">NLC</th>
                        <th className="text-right py-2 px-3 text-[10px] font-bold text-primary-text whitespace-nowrap">Max Price</th>
                        <th className="text-right py-2 px-3 text-[10px] font-bold text-primary-text whitespace-nowrap">Min Price</th>
                        <th className="text-right py-2 px-3 text-[10px] font-bold text-primary-text whitespace-nowrap">Reco. Price</th>
                        <th className="text-right py-2 px-3 text-[10px] font-bold text-primary-text whitespace-nowrap">Discount</th>
                        <th className="text-right py-2 px-3 text-[10px] font-bold text-primary-text whitespace-nowrap">Discount %</th>
                        <th className="text-right py-2 px-3 text-[10px] font-bold text-primary-text whitespace-nowrap">Units</th>
                        <th className="text-right py-2 px-3 text-[10px] font-bold text-primary-text whitespace-nowrap">DR</th>
                      </tr>
                    </thead>
                    <tbody>
                      {resultsData.map((row, index) => (
                        <tr 
                          key={index} 
                          onClick={() => handleRowClick(row)}
                          className="border-b border-border-gray hover:bg-blue-50 cursor-pointer transition-colors"
                        >
                          <td className="py-2 px-3 font-semibold text-primary-text whitespace-nowrap">{row.article}</td>
                          <td className="py-2 px-3 whitespace-nowrap">
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                              row.status === 'Completed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                            }`}>
                              {row.status}
                            </span>
                          </td>
                          <td className="py-2 px-3 text-right text-secondary-text whitespace-nowrap">{row.stock}</td>
                          <td className="py-2 px-3 text-right text-secondary-text whitespace-nowrap">₹{row.mop}</td>
                          <td className="py-2 px-3 text-right text-secondary-text whitespace-nowrap">₹{row.nlc}</td>
                          <td className="py-2 px-3 text-right text-secondary-text whitespace-nowrap">₹{row.maxPrice}</td>
                          <td className="py-2 px-3 text-right text-secondary-text whitespace-nowrap">₹{row.minPrice}</td>
                          <td className="py-2 px-3 text-right font-semibold text-chart-green whitespace-nowrap">₹{row.recoPrice}</td>
                          <td className="py-2 px-3 text-right text-secondary-text whitespace-nowrap">₹{row.discount}</td>
                          <td className="py-2 px-3 text-right text-secondary-text whitespace-nowrap">{row.discountPercent}%</td>
                          <td className="py-2 px-3 text-right text-secondary-text whitespace-nowrap">{row.units}</td>
                          <td className="py-2 px-3 text-right text-secondary-text whitespace-nowrap">{row.dr}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Price vs Sales Analysis Chart */}
              <div className="bg-white rounded-xl p-6 shadow-premium-md border border-border-gray">
                <h2 className="text-base font-bold text-primary-text mb-4">Price vs Sales Analysis</h2>
                <div className="h-64 border-2 border-dashed border-border-gray rounded-xl flex items-center justify-center">
                  <p className="text-sm text-muted-text">Charts: Bars, Pies, Scatters (To be implemented)</p>
                </div>
              </div>
            </>
          ) : (
            <div className="bg-card-bg rounded-xl p-12 shadow-premium-md border border-border-gray text-center">
              <div className="w-16 h-16 bg-gradient-light rounded-xl flex items-center justify-center mx-auto mb-4 border border-border-gray">
                <Target className="w-8 h-8 text-secondary-text" strokeWidth={2} />
              </div>
              <h2 className="text-lg font-bold text-primary-text mb-2">Ready to Optimize</h2>
              <p className="text-sm text-muted-text max-w-md mx-auto">
                Configure parameters and click "Run Engine"
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
