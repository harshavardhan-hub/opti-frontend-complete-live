import React, { useState } from 'react';
import { 
  X, Upload, Target, Sliders, Play, Plus, Trash2, CheckCircle2, Home
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PriceGenixSidebar = ({ 
  isOpen, 
  toggleSidebar, 
  uploadedFile,
  onFileUpload,
  selectedOptimization,
  onOptimizationChange,
  constraints,
  onConstraintsChange,
  onRunOptimization
}) => {
  const navigate = useNavigate();
  const [isDragging, setIsDragging] = useState(false);

  const optimizationOptions = [
    { id: 'profit', label: 'Profit Maximization', description: 'Maximize overall profit margins' },
    { id: 'sales', label: 'Sales Maximization', description: 'Increase total sales volume' },
    { id: 'profitability', label: 'Profitability Maximization', description: 'Optimize profitability ratios' },
    { id: 'competitive', label: 'Competitive Advantage', description: 'Beat competitor pricing' },
  ];

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      onFileUpload(file.name);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      onFileUpload(file.name);
    }
  };

  const handleRemoveFile = () => {
    onFileUpload(null);
  };

  const handleConstraintChange = (index, field, value) => {
    const updated = [...constraints];
    updated[index] = { ...updated[index], [field]: value };
    onConstraintsChange(updated);
  };

  const handleAddConstraint = () => {
    onConstraintsChange([...constraints, { type: '', minimum: '', maximum: '' }]);
  };

  const handleRemoveConstraint = (index) => {
    if (constraints.length > 1) {
      onConstraintsChange(constraints.filter((_, i) => i !== index));
    }
  };

  return (
    <>
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      <div className={`fixed left-0 top-0 h-screen w-[320px] bg-card-bg border-r border-border-gray overflow-y-auto z-50 transition-transform duration-300 ${
        isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}>
        <button
          onClick={toggleSidebar}
          className="absolute top-4 right-4 lg:hidden w-8 h-8 flex items-center justify-center rounded-lg hover:bg-hover-gray"
        >
          <X className="w-5 h-5 text-secondary-text" />
        </button>

        {/* Logo */}
        <div className="p-6 border-b border-border-gray">
          <div className="flex justify-center mb-4">
            <img 
              src="/optinyxuslogo.png" 
              alt="OptiNyxus"
              className="h-12 w-auto"
            />
          </div>
          
          {/* Home Button */}
          <button
            onClick={() => navigate('/dashboard')}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-card border border-border-gray hover:shadow-premium-md hover:border-secondary-text transition-all duration-200 group"
          >
            <Home className="w-4 h-4 text-secondary-text group-hover:text-primary-text transition-colors" strokeWidth={2} />
            <span className="text-sm font-semibold text-secondary-text group-hover:text-primary-text transition-colors">Dashboard Home</span>
          </button>
        </div>

        {/* Data Upload */}
        <div className="p-4 border-b border-border-gray">
          <div className="flex items-center gap-2 mb-3">
            <Upload className="w-4 h-4 text-secondary-text" strokeWidth={2} />
            <h3 className="text-sm font-bold text-primary-text">Data Upload</h3>
          </div>
          <p className="text-xs text-muted-text mb-3">Upload your pricing data file</p>
          
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`relative border-2 border-dashed rounded-xl p-4 text-center transition-all duration-300 ${
              isDragging
                ? 'border-primary-text bg-gradient-card'
                : uploadedFile
                ? 'border-green-300 bg-green-50/30'
                : 'border-border-gray hover:border-secondary-text hover:bg-gradient-card'
            } cursor-pointer`}
          >
            <input
              type="file"
              id="sidebar-file-upload"
              className="hidden"
              accept=".csv,.xlsx,.xls"
              onChange={handleFileChange}
            />
            <label htmlFor="sidebar-file-upload" className="cursor-pointer block">
              {uploadedFile ? (
                <div className="flex items-center justify-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-chart-green flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <span className="text-sm text-primary-text font-semibold block truncate">{uploadedFile}</span>
                    <span className="text-xs text-muted-text">File uploaded successfully</span>
                  </div>
                </div>
              ) : (
                <div>
                  <Upload className="w-8 h-8 text-muted-text mx-auto mb-2" strokeWidth={1.5} />
                  <p className="text-xs text-primary-text font-medium mb-1">Drop your file here or click to browse</p>
                  <p className="text-[10px] text-muted-text">Supports CSV, XLSX (Max 10MB)</p>
                </div>
              )}
            </label>
            
            {uploadedFile && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemoveFile();
                }}
                className="absolute -top-2 -right-2 w-6 h-6 bg-white rounded-full shadow-premium flex items-center justify-center hover:bg-red-50 transition-colors border border-border-gray"
              >
                <X className="w-4 h-4 text-secondary-text hover:text-red-500" />
              </button>
            )}
          </div>
        </div>

        {/* Optimization Strategy */}
        <div className="p-4 border-b border-border-gray">
          <div className="flex items-center gap-2 mb-3">
            <Target className="w-4 h-4 text-secondary-text" strokeWidth={2} />
            <h3 className="text-sm font-bold text-primary-text">Optimization Strategy</h3>
          </div>
          <p className="text-xs text-muted-text mb-3">Choose your optimization goal</p>
          
          <div className="space-y-2">
            {optimizationOptions.map((option) => (
              <label
                key={option.id}
                onClick={() => onOptimizationChange(option.id)}
                className={`flex items-start gap-2 p-3 rounded-xl cursor-pointer transition-all duration-200 border ${
                  selectedOptimization === option.id
                    ? 'border-primary-text bg-gradient-card shadow-premium'
                    : 'border-transparent hover:bg-hover-gray'
                }`}
              >
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 ${
                  selectedOptimization === option.id
                    ? 'border-primary-text bg-primary-text'
                    : 'border-border-gray'
                }`}>
                  {selectedOptimization === option.id && (
                    <div className="w-2 h-2 rounded-full bg-white"></div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold text-primary-text">{option.label}</div>
                  <p className="text-xs text-muted-text leading-tight mt-0.5">{option.description}</p>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Constraints */}
        <div className="p-4 border-b border-border-gray">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Sliders className="w-4 h-4 text-secondary-text" strokeWidth={2} />
              <h3 className="text-sm font-bold text-primary-text">Constraints</h3>
            </div>
            <button
              onClick={handleAddConstraint}
              className="w-7 h-7 flex items-center justify-center rounded-lg bg-chart-green hover:bg-green-600 text-white transition-colors shadow-premium"
              title="Add Constraint"
            >
              <Plus className="w-4 h-4" strokeWidth={2.5} />
            </button>
          </div>
          <p className="text-xs text-muted-text mb-3">Set optimization boundaries</p>
          
          <div className="space-y-3 max-h-[400px] overflow-y-auto pr-1">
            {constraints.map((constraint, index) => (
              <div key={index} className="border-2 border-border-gray rounded-xl p-3 bg-gradient-light hover:border-secondary-text transition-all">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-primary-text">Constraint {index + 1}</span>
                  {constraints.length > 1 && (
                    <button
                      onClick={() => handleRemoveConstraint(index)}
                      className="w-6 h-6 flex items-center justify-center rounded-lg hover:bg-red-50 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5 text-secondary-text hover:text-red-500" />
                    </button>
                  )}
                </div>
                
                <div className="space-y-2">
                  <div>
                    <label className="block text-[10px] text-muted-text mb-1 font-medium">Type</label>
                    <select
                      value={constraint.type}
                      onChange={(e) => handleConstraintChange(index, 'type', e.target.value)}
                      className="w-full px-3 py-2 border border-border-gray rounded-lg text-xs font-medium focus:outline-none focus:border-secondary-text focus:shadow-premium bg-white"
                    >
                      <option value="">Select</option>
                      <option value="GMV">GMV</option>
                      <option value="Profit">Profit</option>
                      <option value="Profit Percentage">Profit Percentage</option>
                      <option value="Units">Units</option>
                      <option value="Discount">Discount</option>
                    </select>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[10px] text-muted-text mb-1 font-medium">Min</label>
                      <input
                        type="number"
                        value={constraint.minimum}
                        onChange={(e) => handleConstraintChange(index, 'minimum', e.target.value)}
                        placeholder="0"
                        className="w-full px-3 py-2 border border-border-gray rounded-lg text-xs font-medium focus:outline-none focus:border-secondary-text focus:shadow-premium bg-white"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-[10px] text-muted-text mb-1 font-medium">Max</label>
                      <input
                        type="number"
                        value={constraint.maximum}
                        onChange={(e) => handleConstraintChange(index, 'maximum', e.target.value)}
                        placeholder="100"
                        className="w-full px-3 py-2 border border-border-gray rounded-lg text-xs font-medium focus:outline-none focus:border-secondary-text focus:shadow-premium bg-white"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Run Button */}
        <div className="p-4">
          <button
            onClick={onRunOptimization}
            className="w-full flex items-center justify-center gap-3 px-4 py-3.5 bg-gradient-success text-white rounded-xl hover:shadow-premium-xl transition-all duration-300 transform hover:scale-[1.02] font-bold text-sm shadow-premium-lg"
          >
            <Play className="w-5 h-5 fill-white" strokeWidth={0} />
            <span>Run Optimization Engine</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default PriceGenixSidebar;
