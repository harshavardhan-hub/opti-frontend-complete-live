import React from 'react';
import DashboardLayout from '../../layouts/DashboardLayout';
import ProductCard from '../../components/dashboard/ProductCard';
import { PRODUCTS } from '../../utils/constants';
import { Sparkles } from 'lucide-react';

const DashboardHome = () => {
  return (
    <DashboardLayout currentProduct="home" showSidebar={false}>
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4 md:p-6 lg:p-8">
        <div className="w-full max-w-[1400px]">
          {/* Header */}
          <div className="text-center mb-6 md:mb-8 lg:mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white border border-border-gray rounded-full mb-3 md:mb-4 shadow-premium">
              <Sparkles className="w-4 h-4 text-chart-green" strokeWidth={2} />
              <span className="text-xs md:text-sm font-semibold text-primary-text">Welcome Back</span>
            </div>
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary-text mb-2">
              OptiNyxus Dashboard
            </h1>
            <p className="text-sm md:text-base text-muted-text">
              Select a product to start optimizing your business operations
            </p>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-5 lg:gap-6 max-w-full">
            {PRODUCTS.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DashboardHome;
