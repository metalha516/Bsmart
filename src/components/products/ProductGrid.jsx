import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { PRODUCTS, CATEGORIES } from '../../data/productsData';
import { ProductCard } from './ProductCard';
import { Filter, SlidersHorizontal, Sparkles, AlertCircle } from 'lucide-react';

export const ProductGrid = () => {
  const {
    activeCategoryKey,
    setActiveCategoryKey,
    searchQuery,
    vehicleFitment,
    userMode
  } = useApp();

  const [sortBy, setSortBy] = useState('popular'); // 'popular', 'price-low', 'price-high', 'rating'

  // Filter products based on Category, Search Query, Vehicle Fitment
  let filteredProducts = PRODUCTS.filter((product) => {
    // 1. Category Filter
    if (activeCategoryKey !== 'all' && product.categoryKey !== activeCategoryKey) {
      return false;
    }

    // 2. Search Query Filter
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      const matchTitle = product.title.toLowerCase().includes(q);
      const matchCategory = product.category.toLowerCase().includes(q);
      const matchTags = product.tags.some((t) => t.toLowerCase().includes(q));
      if (!matchTitle && !matchCategory && !matchTags) return false;
    }

    // 3. Vehicle Fitment Filter
    if (vehicleFitment.make && product.fitment) {
      if (product.fitment.make !== 'Universal' && product.fitment.make !== vehicleFitment.make) {
        return false;
      }
    }

    return true;
  });

  // Sort products
  filteredProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    return b.salesCount - a.salesCount; // popular
  });

  const activeCategoryObj = CATEGORIES.find((c) => c.id === activeCategoryKey);

  return (
    <div className="space-y-4 select-none">
      
      {/* Category Banner & Sorting Controls */}
      <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="font-extrabold text-base text-gray-900 flex items-center gap-2">
            <span>{activeCategoryObj ? activeCategoryObj.name : '🔥 All Featured Factory Products'}</span>
            <span className="text-xs bg-orange-100 text-taobao-orange font-bold px-2 py-0.5 rounded-full">
              {filteredProducts.length} Items Found
            </span>
          </h2>
          {searchQuery && (
            <p className="text-xs text-gray-500 mt-0.5">
              Showing search results for: <strong className="text-taobao-orange font-mono">"{searchQuery}"</strong>
            </p>
          )}
        </div>

        {/* Sorting Dropdown */}
        <div className="flex items-center space-x-2 text-xs">
          <SlidersHorizontal className="w-4 h-4 text-gray-500" />
          <span className="text-gray-500 font-semibold">Sort By:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            aria-label="Sort products by"
            className="bg-gray-50 border border-gray-300 rounded-lg px-2.5 py-1.5 font-bold text-gray-700 focus:outline-none cursor-pointer"
          >
            <option value="popular">🔥 Most Popular &amp; Sales</option>
            <option value="rating">⭐ Highest Rated (4.9+)</option>
            <option value="price-low">💰 Price: Low to High</option>
            <option value="price-high">💎 Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* Grid of Product Cards */}
      {filteredProducts.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center text-gray-500 border border-gray-200 space-y-2">
          <AlertCircle className="w-12 h-12 text-taobao-orange mx-auto" />
          <h3 className="text-base font-extrabold text-gray-900">No products matched your exact search or fitment filter.</h3>
          <p className="text-xs text-gray-400">Try clearing the search box or selecting "All Categories" from the navigation header.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

    </div>
  );
};
