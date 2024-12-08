import React, { useEffect, useState } from 'react'
import { api } from '../../utils/api'
import Loading from '../common/Loading'
import Error from '../common/Error'

export default function Statistics() {
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    averageOrderValue: 0,
    popularItems: []
  })
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const orders = await api.get('/orders')
        
        // Calculate statistics from orders
        const totalOrders = orders.length
        const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0)
        const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0

        // Calculate popular items
        const itemCounts = {}
        orders.forEach(order => {
          order.items.forEach(item => {
            itemCounts[item.name] = (itemCounts[item.name] || 0) + item.quantity
          })
        })

        const popularItems = Object.entries(itemCounts)
          .map(([name, orders]) => ({ name, orders }))
          .sort((a, b) => b.orders - a.orders)
          .slice(0, 5)

        setStats({
          totalOrders,
          totalRevenue,
          averageOrderValue,
          popularItems
        })
      } catch (err) {
        setError(err.message)
      } finally {
        setIsLoading(false)
      }
    }

    fetchStatistics()
  }, [])

  if (isLoading) return <Loading />
  if (error) return <Error message={error} />

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Statistics</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Total Orders</h2>
          <p className="text-3xl text-indigo-600">{stats.totalOrders}</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Total Revenue</h2>
          <p className="text-3xl text-indigo-600">${stats.totalRevenue.toFixed(2)}</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Average Order Value</h2>
          <p className="text-3xl text-indigo-600">${stats.averageOrderValue.toFixed(2)}</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Popular Items</h2>
        {stats.popularItems.length > 0 ? (
          <div className="space-y-4">
            {stats.popularItems.map((item, index) => (
              <div key={index} className="flex justify-between items-center">
                <span className="text-gray-700">{item.name}</span>
                <span className="text-indigo-600 font-semibold">{item.orders} orders</span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center">No order data available</p>
        )}
      </div>
    </div>
  )
} 