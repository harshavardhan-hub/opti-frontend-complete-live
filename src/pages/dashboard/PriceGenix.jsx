import React, { useState } from 'react';
import Navbar from '../../components/common/Navbar';
import PriceGenixSidebar from '../../components/sidebars/PriceGenixSidebar';
import { TrendingUp, DollarSign, Percent, Package, Award, Target, BarChart3, Download } from 'lucide-react';

const PriceGenix = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [uploadedFile, setUploadedFile] = useState('pricing_data_sample.csv');
  const [selectedOptimization, setSelectedOptimization] = useState('profit');
  const [constraints, setConstraints] = useState([]);
  const [scoringLevels, setScoringLevels] = useState(['Article']);
  const [hasResults, setHasResults] = useState(false);
  const [resultsData, setResultsData] = useState([]);

  const scoringOptions = ['Article', 'Brand', 'Category', 'Store', 'Geography'];

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const handleRunOptimization = () => {
    // Mock results data
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
    setSelectedOptimization('profit');
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

  // Mock Data
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
        <div className="p-4 sm:p-6 space-y-5">
          {/* Compact Scoring Levels Bar Only */}
          <div className="bg-card-bg rounded-xl p-4 shadow-premium-md border border-border-gray">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <label className="text-sm font-bold text-primary-text">Scoring Levels</label>
              <div className="flex flex-wrap gap-2">
                {scoringOptions.map((option) => (
                  <button
                    key={option}
                    onClick={() => toggleScoringLevel(option)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
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
              {/* Base vs Optimized Conditions */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                {/* Base Condition */}
                <div className="bg-white rounded-xl p-5 shadow-premium-md border-2 border-gray-300">
                  <h2 className="text-base font-bold text-primary-text mb-4 flex items-center gap-2">
                    <Target className="w-5 h-5 text-secondary-text" />
                    Base Condition
                  </h2>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <DollarSign className="w-5 h-5 text-secondary-text mx-auto mb-2" />
                      <div className="text-lg font-bold text-primary-text">₹{(baseCondition.sales / 1000).toFixed(0)}K</div>
                      <div className="text-xs text-muted-text">Sales</div>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <TrendingUp className="w-5 h-5 text-secondary-text mx-auto mb-2" />
                      <div className="text-lg font-bold text-primary-text">₹{(baseCondition.profit / 1000).toFixed(0)}K</div>
                      <div className="text-xs text-muted-text">Profit</div>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <Percent className="w-5 h-5 text-secondary-text mx-auto mb-2" />
                      <div className="text-lg font-bold text-primary-text">{baseCondition.profitability}%</div>
                      <div className="text-xs text-muted-text">Profitability</div>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <Package className="w-5 h-5 text-secondary-text mx-auto mb-2" />
                      <div className="text-lg font-bold text-primary-text">{baseCondition.units}</div>
                      <div className="text-xs text-muted-text">Units</div>
                    </div>
                  </div>
                </div>

                {/* Optimized Condition */}
                <div className="bg-white rounded-xl p-5 shadow-premium-md border-2 border-green-400">
                  <h2 className="text-base font-bold text-primary-text mb-4 flex items-center gap-2">
                    <Award className="w-5 h-5 text-chart-green" />
                    Optimized Condition
                  </h2>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="text-center p-3 bg-green-50 rounded-lg border border-green-200">
                      <DollarSign className="w-5 h-5 text-chart-green mx-auto mb-2" />
                      <div className="text-lg font-bold text-primary-text">₹{(optimizedCondition.sales / 1000).toFixed(0)}K</div>
                      <div className="text-xs text-chart-green font-semibold">+{growth.sales}%</div>
                    </div>
                    <div className="text-center p-3 bg-green-50 rounded-lg border border-green-200">
                      <TrendingUp className="w-5 h-5 text-chart-green mx-auto mb-2" />
                      <div className="text-lg font-bold text-primary-text">₹{(optimizedCondition.profit / 1000).toFixed(0)}K</div>
                      <div className="text-xs text-chart-green font-semibold">+{growth.profit}%</div>
                    </div>
                    <div className="text-center p-3 bg-green-50 rounded-lg border border-green-200">
                      <Percent className="w-5 h-5 text-chart-green mx-auto mb-2" />
                      <div className="text-lg font-bold text-primary-text">{optimizedCondition.profitability}%</div>
                      <div className="text-xs text-chart-green font-semibold">+{(optimizedCondition.profitability - baseCondition.profitability).toFixed(1)}%</div>
                    </div>
                    <div className="text-center p-3 bg-green-50 rounded-lg border border-green-200">
                      <Package className="w-5 h-5 text-chart-green mx-auto mb-2" />
                      <div className="text-lg font-bold text-primary-text">{optimizedCondition.units}</div>
                      <div className="text-xs text-chart-green font-semibold">+{growth.units}%</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Top Selling Articles */}
              <div className="bg-white rounded-xl p-5 shadow-premium-md border border-border-gray">
                <h2 className="text-base font-bold text-primary-text mb-4 flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-secondary-text" />
                  Top Selling Articles
                </h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border-gray">
                        <th className="text-left py-2 px-3 text-xs font-semibold text-muted-text">Article ID</th>
                        <th className="text-left py-2 px-3 text-xs font-semibold text-muted-text">Product Name</th>
                        <th className="text-right py-2 px-3 text-xs font-semibold text-muted-text">Sales</th>
                        <th className="text-right py-2 px-3 text-xs font-semibold text-muted-text">Contribution</th>
                      </tr>
                    </thead>
                    <tbody>
                      {topArticles.map((article, index) => (
                        <tr key={index} className="border-b border-border-gray hover:bg-gray-50">
                          <td className="py-3 px-3 font-semibold text-primary-text text-sm">{article.id}</td>
                          <td className="py-3 px-3 text-secondary-text text-sm">{article.name}</td>
                          <td className="py-3 px-3 text-right font-semibold text-primary-text text-sm">₹{(article.sales / 1000).toFixed(0)}K</td>
                          <td className="py-3 px-3 text-right">
                            <span className="px-2 py-1 bg-green-100 text-chart-green rounded-lg font-semibold text-xs">
                              {article.contribution}%
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Contribution Analysis */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="bg-white rounded-xl p-5 shadow-premium-md border border-border-gray">
                  <h3 className="text-sm font-bold text-primary-text mb-3">Top 50% Contributing Articles</h3>
                  <div className="text-center py-6">
                    <div className="text-3xl font-bold text-primary-text">12</div>
                    <div className="text-sm text-muted-text mt-2">Articles contribute 50% sales</div>
                  </div>
                </div>
                <div className="bg-white rounded-xl p-5 shadow-premium-md border border-border-gray">
                  <h3 className="text-sm font-bold text-primary-text mb-3">Top 80% Contributing Articles</h3>
                  <div className="text-center py-6">
                    <div className="text-3xl font-bold text-primary-text">35</div>
                    <div className="text-sm text-muted-text mt-2">Articles contribute 80% sales</div>
                  </div>
                </div>
              </div>

              {/* Optimized Results Table */}
              <div className="bg-white rounded-xl shadow-premium-md border border-border-gray overflow-hidden">
                <div className="p-5 border-b border-border-gray flex items-center justify-between">
                  <div>
                    <h2 className="text-base font-bold text-primary-text mb-1">Optimized Results</h2>
                    <p className="text-xs text-muted-text">View and download optimization results</p>
                  </div>
                  <button
                    onClick={handleDownload}
                    className="flex items-center gap-2 px-4 py-2 bg-primary-text text-white rounded-lg hover:bg-brand-dark transition-colors text-sm font-semibold"
                  >
                    <Download className="w-4 h-4" strokeWidth={2} />
                    Download CSV
                  </button>
                </div>
                
                <div className="overflow-x-auto max-h-[500px]">
                  <table className="w-full text-sm">
                    <thead className="sticky top-0 bg-gray-50 border-b border-border-gray">
                      <tr>
                        <th className="text-left py-3 px-4 text-xs font-bold text-primary-text whitespace-nowrap">Article</th>
                        <th className="text-left py-3 px-4 text-xs font-bold text-primary-text whitespace-nowrap">Status</th>
                        <th className="text-right py-3 px-4 text-xs font-bold text-primary-text whitespace-nowrap">Stock</th>
                        <th className="text-right py-3 px-4 text-xs font-bold text-primary-text whitespace-nowrap">MOP</th>
                        <th className="text-right py-3 px-4 text-xs font-bold text-primary-text whitespace-nowrap">NLC</th>
                        <th className="text-right py-3 px-4 text-xs font-bold text-primary-text whitespace-nowrap">Max Price</th>
                        <th className="text-right py-3 px-4 text-xs font-bold text-primary-text whitespace-nowrap">Min Price</th>
                        <th className="text-right py-3 px-4 text-xs font-bold text-primary-text whitespace-nowrap">Reco. Price</th>
                        <th className="text-right py-3 px-4 text-xs font-bold text-primary-text whitespace-nowrap">Discount</th>
                        <th className="text-right py-3 px-4 text-xs font-bold text-primary-text whitespace-nowrap">Discount %</th>
                        <th className="text-right py-3 px-4 text-xs font-bold text-primary-text whitespace-nowrap">Units</th>
                        <th className="text-right py-3 px-4 text-xs font-bold text-primary-text whitespace-nowrap">DR</th>
                      </tr>
                    </thead>
                    <tbody>
                      {resultsData.length > 0 ? (
                        resultsData.map((row, index) => (
                          <tr key={index} className="border-b border-border-gray hover:bg-gray-50">
                            <td className="py-3 px-4 font-semibold text-primary-text text-sm whitespace-nowrap">{row.article}</td>
                            <td className="py-3 px-4 text-sm whitespace-nowrap">
                              <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                                row.status === 'Completed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                              }`}>
                                {row.status}
                              </span>
                            </td>
                            <td className="py-3 px-4 text-right text-secondary-text text-sm whitespace-nowrap">{row.stock}</td>
                            <td className="py-3 px-4 text-right text-secondary-text text-sm whitespace-nowrap">₹{row.mop}</td>
                            <td className="py-3 px-4 text-right text-secondary-text text-sm whitespace-nowrap">₹{row.nlc}</td>
                            <td className="py-3 px-4 text-right text-secondary-text text-sm whitespace-nowrap">₹{row.maxPrice}</td>
                            <td className="py-3 px-4 text-right text-secondary-text text-sm whitespace-nowrap">₹{row.minPrice}</td>
                            <td className="py-3 px-4 text-right font-semibold text-chart-green text-sm whitespace-nowrap">₹{row.recoPrice}</td>
                            <td className="py-3 px-4 text-right text-secondary-text text-sm whitespace-nowrap">₹{row.discount}</td>
                            <td className="py-3 px-4 text-right text-secondary-text text-sm whitespace-nowrap">{row.discountPercent}%</td>
                            <td className="py-3 px-4 text-right text-secondary-text text-sm whitespace-nowrap">{row.units}</td>
                            <td className="py-3 px-4 text-right text-secondary-text text-sm whitespace-nowrap">{row.dr}</td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="12" className="py-8 text-center text-muted-text text-sm">
                            No data available<br/>
                            <span className="text-xs">Run optimization to see results</span>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Charts Placeholder */}
              <div className="bg-white rounded-xl p-6 shadow-premium-md border border-border-gray">
                <h2 className="text-base font-bold text-primary-text mb-4">Price vs Sales Analysis</h2>
                <div className="h-64 border-2 border-dashed border-border-gray rounded-xl flex items-center justify-center">
                  <p className="text-sm text-muted-text">Charts: Bars, Pies, Scatters (To be implemented)</p>
                </div>
              </div>
            </>
          ) : (
            <div className="bg-card-bg rounded-xl p-12 shadow-premium-md border border-border-gray text-center">
              <div className="w-20 h-20 bg-gradient-light rounded-2xl flex items-center justify-center mx-auto mb-6 border border-border-gray">
                <Target className="w-10 h-10 text-secondary-text" strokeWidth={2} />
              </div>
              <h2 className="text-xl font-bold text-primary-text mb-3">Ready to Optimize</h2>
              <p className="text-sm text-muted-text max-w-md mx-auto">
                Configure your parameters in the sidebar and click "Run Engine" to see optimization results
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PriceGenix;
