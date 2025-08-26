import { useState } from 'react'
// import { useQuery } from 'react-query'
import { useQuery } from '@tanstack/react-query'
import { categoryService } from '../../services/categories'
import { ChevronDown, ChevronUp } from 'lucide-react'

const ProductFilters = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    category: '',
    minPrice: '',
    maxPrice: '',
    minRating: '',
    brand: '',
    inStock: false
  })
  
  const [openSections, setOpenSections] = useState({
    category: true,
    price: true,
    rating: true,
    brand: true,
    availability: true
  })

  const { data: categories } = useQuery('categories', categoryService.getCategories)

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value }
    setFilters(newFilters)
    onFilterChange(newFilters)
  }

  const toggleSection = (section) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }))
  }

  const clearFilters = () => {
    const clearedFilters = {
      category: '',
      minPrice: '',
      maxPrice: '',
      minRating: '',
      brand: '',
      inStock: false
    }
    setFilters(clearedFilters)
    onFilterChange(clearedFilters)
  }

  const FilterSection = ({ title, section, children }) => (
    <div className="border-b border-gray-200 py-6">
      <button
        onClick={() => toggleSection(section)}
        className="flex justify-between items-center w-full text-left"
      >
        <h3 className="text-sm font-medium text-gray-900">{title}</h3>
        {openSections[section] ? (
          <ChevronUp className="h-5 w-5 text-gray-500" />
        ) : (
          <ChevronDown className="h-5 w-5 text-gray-500" />
        )}
      </button>
      {openSections[section] && (
        <div className="mt-4 space-y-4">
          {children}
        </div>
      )}
    </div>
  )

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
        <button
          onClick={clearFilters}
          className="text-sm text-primary-600 hover:text-primary-700"
        >
          Clear all
        </button>
      </div>

      <div className="space-y-0">
        {/* Category Filter */}
        <FilterSection title="Category" section="category">
          <select
            value={filters.category}
            onChange={(e) => handleFilterChange('category', e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2"
          >
            <option value="">All Categories</option>
            {categories?.data?.map((category) => (
              <option key={category._id} value={category.slug}>
                {category.name}
              </option>
            ))}
          </select>
        </FilterSection>

        {/* Price Filter */}
        <FilterSection title="Price Range" section="price">
          <div className="grid grid-cols-2 gap-2">
            <input
              type="number"
              placeholder="Min"
              value={filters.minPrice}
              onChange={(e) => handleFilterChange('minPrice', e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2"
            />
            <input
              type="number"
              placeholder="Max"
              value={filters.maxPrice}
              onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2"
            />
          </div>
        </FilterSection>

        {/* Rating Filter */}
        <FilterSection title="Minimum Rating" section="rating">
          <div className="space-y-2">
            {[4, 3, 2, 1].map((rating) => (
              <label key={rating} className="flex items-center">
                <input
                  type="radio"
                  name="rating"
                  value={rating}
                  checked={filters.minRating === rating.toString()}
                  onChange={(e) => handleFilterChange('minRating', e.target.value)}
                  className="h-4 w-4 text-primary-600"
                />
                <span className="ml-2 text-sm text-gray-700">
                  {rating}+ Stars
                </span>
              </label>
            ))}
          </div>
        </FilterSection>

        {/* Brand Filter */}
        <FilterSection title="Brand" section="brand">
          <input
            type="text"
            placeholder="Enter brand name"
            value={filters.brand}
            onChange={(e) => handleFilterChange('brand', e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2"
          />
        </FilterSection>

        {/* Availability Filter */}
        <FilterSection title="Availability" section="availability">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={filters.inStock}
              onChange={(e) => handleFilterChange('inStock', e.target.checked)}
              className="h-4 w-4 text-primary-600"
            />
            <span className="ml-2 text-sm text-gray-700">In Stock Only</span>
          </label>
        </FilterSection>
      </div>
    </div>
  )
}

export default ProductFilters