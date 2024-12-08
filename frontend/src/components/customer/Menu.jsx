import React, { useEffect } from 'react'
import MenuCard from './MenuCard'
import useMenuStore from '../../store/menuStore'
import Loading from '../common/Loading'
import Error from '../common/Error'

export default function Menu() {
  const { 
    items, 
    categories, 
    selectedCategory, 
    isLoading, 
    error,
    fetchMenu,
    getFilteredItems 
  } = useMenuStore()

  useEffect(() => {
    fetchMenu()
  }, [fetchMenu])

  if (isLoading) return <Loading />
  if (error) return <Error message={error} />

  const filteredItems = getFilteredItems()

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Our Menu</h1>

      {/* Category Filter */}
      <div className="flex space-x-4 mb-8 overflow-x-auto pb-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => useMenuStore.setState({ selectedCategory: category })}
            className={`px-4 py-2 rounded-full whitespace-nowrap ${
              selectedCategory === category
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Menu Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <MenuCard key={item._id} item={item} />
        ))}
      </div>

      {filteredItems.length === 0 && (
        <div className="text-center text-gray-500 mt-8">
          No items found in this category
        </div>
      )}
    </div>
  )
} 