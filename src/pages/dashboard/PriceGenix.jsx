import React, { useState } from 'react';
import Navbar from '../../components/common/Navbar';
import PriceGenixSidebar from '../../components/sidebars/PriceGenixSidebar';
import ResultsTable from '../../components/dashboard/ResultsTable';

const PriceGenix = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [uploadedFile, setUploadedFile] = useState('pricing_data_sample.csv');
  const [selectedOptimization, setSelectedOptimization] = useState('profit');
  const [constraints, setConstraints] = useState([
    { type: '', minimum: '', maximum: '' }, // Empty by default - user must select
  ]);
  const [resultsData, setResultsData] = useState([]);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const handleRunOptimization = () => {
    const mockResults = [
      {
        article: '#1234',
        status: 'In-Progress',
        stock: 50,
        mop: 100,
        nlc: 75,
        maxPrice: 120,
        minPrice: 80,
        recoPrice: 95,
        discount: 5,
        discountPercent: 5.3,
        units: 67,
        dr: 1.2
      },
      {
        article: '#1235',
        status: 'Completed',
        stock: 45,
        mop: 110,
        nlc: 80,
        maxPrice: 130,
        minPrice: 85,
        recoPrice: 105,
        discount: 5,
        discountPercent: 4.8,
        units: 72,
        dr: 1.3
      },
      {
        article: '#1236',
        status: 'In-Progress',
        stock: 60,
        mop: 95,
        nlc: 70,
        maxPrice: 115,
        minPrice: 75,
        recoPrice: 90,
        discount: 5,
        discountPercent: 5.6,
        units: 65,
        dr: 1.1
      },
      {
        article: '#1237',
        status: 'Completed',
        stock: 55,
        mop: 105,
        nlc: 78,
        maxPrice: 125,
        minPrice: 82,
        recoPrice: 98,
        discount: 7,
        discountPercent: 6.7,
        units: 70,
        dr: 1.25
      },
    ];
    setResultsData(mockResults);
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
      />
      <Navbar toggleSidebar={toggleSidebar} showMenuButton={true} currentProduct="pricegenix" />
      
      <div className="lg:ml-[320px] pt-16">
        <div className="p-4 sm:p-6">
          <ResultsTable data={resultsData} onDownload={handleDownload} />
        </div>
      </div>
    </div>
  );
};

export default PriceGenix;
