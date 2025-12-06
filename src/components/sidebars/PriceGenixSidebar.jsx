import React, { useState } from 'react';
import { 
  X, Upload, Target, Sliders, Play, Plus, Trash2, CheckCircle2, Home, TrendingUp, DollarSign, Percent, Package, RotateCcw, Award
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
  onRunOptimization,
  onReset
}) => {
  const navigate = useNavigate();
  const [isDragging, setIsDragging] = useState(false);

  // REORDERED: Sales first, then Profit
  const optimizationOptions = [
    { id: 'sales', label: 'Sales Maximization', icon: TrendingUp },
    { id: 'profit', label: 'Profit Maximization', icon: DollarSign },
    { id: 'profitability', label: 'Profitability Maximization', icon: Percent },
    { id: 'competitive', label: 'Competitive Advantage', icon: Award },
  ];

  const constraintTypes = [
    { value: 'Sales', unit: '₹', hasFormat: false },
    { value: 'Profit', unit: '₹', hasFormat: false },
    { value: 'Profit Percentage', unit: '%', hasFormat: false },
    { value: 'Units', unit: '', hasFormat: true }, // Format selector
    { value: 'Discount', unit: '', hasFormat: true }, // Format selector
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
    
    // When type changes, set default format to PERCENTAGE if applicable
    if (field === 'type') {
      const constraintType = constraintTypes.find(ct => ct.value === value);
      if (constraintType?.hasFormat) {
        updated[index].format = 'percentage'; // DEFAULT IS PERCENTAGE
      } else {
        delete updated[index].format;
      }
    }
    
    onConstraintsChange(updated);
  };

  const handleAddConstraint = () => {
    const availableTypes = constraintTypes.filter(
      ct => !constraints.some(c => c.type === ct.value)
    );
    if (availableTypes.length > 0) {
      onConstraintsChange([...constraints, { type: '', minimum: '', maximum: '', format: 'percentage' }]); // DEFAULT PERCENTAGE
    }
  };

  const handleRemoveConstraint = (index) => {
    onConstraintsChange(constraints.filter((_, i) => i !== index));
  };

  const getConstraintUnit = (constraint) => {
    const type = constraintTypes.find(ct => ct.value === constraint.type);
    if (!type) return '';
    
    if (type.hasFormat && constraint.format) {
      return constraint.format === 'percentage' ? '%' : 'Qty';
    }
    return type.unit;
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

        {/* Logo - Bigger */}
        <div className="p-6 border-b border-border-gray">
          <div className="flex justify-center mb-3">
            <img 
              src="/optinyxuslogo.png" 
              alt="OptiNyxus"
              className="h-14 w-auto"
            />
          </div>
          
          {/* Home Button - Smaller */}
          <button
            onClick={() => navigate('/dashboard')}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-gradient-card border border-border-gray hover:shadow-premium-md hover:border-secondary-text transition-all duration-200 group"
          >
            <Home className="w-3.5 h-3.5 text-secondary-text group-hover:text-primary-text transition-colors" strokeWidth={2} />
            <span className="text-xs font-semibold text-secondary-text group-hover:text-primary-text transition-colors">Dashboard Home</span>
          </button>
        </div>

        {/* Data Upload */}
        <div className="p-4 border-b border-border-gray">
          <div className="flex items-center gap-2 mb-3">
            <Upload className="w-4 h-4 text-secondary-text" strokeWidth={2} />
            <h3 className="text-sm font-bold text-primary-text">Data Upload</h3>
          </div>
          
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`relative border-2 border-dashed rounded-xl p-3 text-center transition-all duration-300 ${
              isDragging
                ? 'border-primary-text bg-gradient-card'
                : uploadedFile
                ? 'border-green-300 bg-green-50/30'
                : 'border-border-gray hover:border-secondary-text hover:bg-gradient-card'
            } cursor-pointer mb-3`}
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
                  <CheckCircle2 className="w-4 h-4 text-chart-green flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <span className="text-xs text-primary-text font-semibold block truncate">{uploadedFile}</span>
                  </div>
                </div>
              ) : (
                <div>
                  <Upload className="w-6 h-6 text-muted-text mx-auto mb-1" strokeWidth={1.5} />
                  <p className="text-[10px] text-primary-text font-medium">Drop file or click</p>
                </div>
              )}
            </label>
            
            {uploadedFile && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemoveFile();
                }}
                className="absolute -top-2 -right-2 w-5 h-5 bg-white rounded-full shadow-premium flex items-center justify-center hover:bg-red-50 transition-colors border border-border-gray"
              >
                <X className="w-3 h-3 text-secondary-text hover:text-red-500" />
              </button>
            )}
          </div>

          {/* Run Button */}
          <button
            onClick={onRunOptimization}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-success text-white rounded-xl hover:shadow-premium-xl transition-all duration-300 transform hover:scale-[1.02] font-bold text-sm shadow-premium-lg"
          >
            <Play className="w-4 h-4 fill-white" strokeWidth={0} />
            <span>Run Engine</span>
          </button>
        </div>

        {/* Optimization Strategy */}
        <div className="p-4 border-b border-border-gray">
          <div className="flex items-center gap-2 mb-3">
            <Target className="w-4 h-4 text-secondary-text" strokeWidth={2} />
            <h3 className="text-sm font-bold text-primary-text">Objective Function</h3>
          </div>
          
          <div className="grid grid-cols-2 gap-2">
            {optimizationOptions.map((option) => (
              <button
                key={option.id}
                onClick={() => onOptimizationChange(option.id)}
                className={`flex flex-col items-center justify-center p-3 rounded-xl cursor-pointer transition-all duration-200 border-2 ${
                  selectedOptimization === option.id
                    ? 'border-primary-text bg-primary-text text-white shadow-premium-lg'
                    : 'border-border-gray bg-white text-secondary-text hover:border-secondary-text'
                }`}
              >
                <option.icon 
                  className={`w-7 h-7 mb-2 ${selectedOptimization === option.id ? 'text-white' : 'text-secondary-text'}`}
                  strokeWidth={2}
                />
                <span className="text-[10px] font-semibold text-center leading-tight">{option.label}</span>
              </button>
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
            {constraints.length < constraintTypes.length && (
              <button
                onClick={handleAddConstraint}
                className="w-7 h-7 flex items-center justify-center rounded-lg bg-chart-green hover:bg-green-600 text-white transition-colors shadow-premium"
                title="Add Constraint"
              >
                <Plus className="w-4 h-4" strokeWidth={2.5} />
              </button>
            )}
          </div>
          
          <div className="space-y-2 max-h-[350px] overflow-y-auto pr-1">
            {constraints.length === 0 ? (
              <div className="text-center py-4 text-xs text-muted-text">
                No constraints added yet
              </div>
            ) : (
              constraints.map((constraint, index) => {
                const selectedType = constraintTypes.find(ct => ct.value === constraint.type);
                const showFormatSelector = selectedType?.hasFormat;
                
                return (
                  <div key={index} className="border-2 border-border-gray rounded-xl p-2.5 bg-white hover:border-secondary-text transition-all">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-bold text-primary-text">Constraint {index + 1}</span>
                      <button
                        onClick={() => handleRemoveConstraint(index)}
                        className="w-5 h-5 flex items-center justify-center rounded-lg hover:bg-red-50 transition-colors"
                      >
                        <Trash2 className="w-3 h-3 text-secondary-text hover:text-red-500" />
                      </button>
                    </div>
                    
                    <div className="space-y-2">
                      {/* Type Selector */}
                      <div>
                        <label className="block text-[9px] text-muted-text mb-1 font-medium">Type</label>
                        <select
                          value={constraint.type}
                          onChange={(e) => handleConstraintChange(index, 'type', e.target.value)}
                          className="w-full px-2 py-1.5 border border-border-gray rounded-lg text-[10px] font-medium focus:outline-none focus:border-secondary-text focus:shadow-premium bg-white"
                        >
                          <option value="">Select</option>
                          {constraintTypes.map((ct) => (
                            <option 
                              key={ct.value} 
                              value={ct.value}
                              disabled={constraints.some((c, i) => i !== index && c.type === ct.value)}
                            >
                              {ct.value}
                            </option>
                          ))}
                        </select>
                      </div>
                      
                      {/* Format Selector (Only for Units & Discount) - DEFAULT PERCENTAGE */}
                      {showFormatSelector && (
                        <div>
                          <label className="block text-[9px] text-muted-text mb-1 font-medium">Format</label>
                          <select
                            value={constraint.format || 'percentage'}
                            onChange={(e) => handleConstraintChange(index, 'format', e.target.value)}
                            className="w-full px-2 py-1.5 border border-border-gray rounded-lg text-[10px] font-medium focus:outline-none focus:border-secondary-text focus:shadow-premium bg-white"
                          >
                            <option value="percentage">Percentage</option>
                            <option value="number">Numbers</option>
                          </select>
                        </div>
                      )}
                      
                      {/* Min Max Inputs */}
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block text-[9px] text-muted-text mb-1 font-medium">
                            Min {constraint.type && `(${getConstraintUnit(constraint)})`}
                          </label>
                          <input
                            type="number"
                            value={constraint.minimum}
                            onChange={(e) => handleConstraintChange(index, 'minimum', e.target.value)}
                            className="w-full px-2 py-1.5 border border-border-gray rounded-lg text-[10px] font-medium focus:outline-none focus:border-secondary-text focus:shadow-premium bg-white"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-[9px] text-muted-text mb-1 font-medium">
                            Max {constraint.type && `(${getConstraintUnit(constraint)})`}
                          </label>
                          <input
                            type="number"
                            value={constraint.maximum}
                            onChange={(e) => handleConstraintChange(index, 'maximum', e.target.value)}
                            className="w-full px-2 py-1.5 border border-border-gray rounded-lg text-[10px] font-medium focus:outline-none focus:border-secondary-text focus:shadow-premium bg-white"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Reset Button */}
        <div className="p-4">
          <button
            onClick={onReset}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-white border-2 border-border-gray text-secondary-text rounded-xl hover:border-red-500 hover:text-red-500 hover:bg-red-50 transition-all duration-300 font-semibold text-sm"
          >
            <RotateCcw className="w-4 h-4" strokeWidth={2} />
            <span>Reset All</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default PriceGenixSidebar;
