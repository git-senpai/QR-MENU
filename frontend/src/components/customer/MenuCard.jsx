import React, { useState } from 'react'
import useCartStore from '../../store/cartStore'
import useAuthStore from '../../store/authStore'
import useMenuStore from '../../store/menuStore'
import { useNavigate } from 'react-router-dom'
import ConfirmModal from '../common/ConfirmModal'

export default function MenuCard({ item }) {
  const navigate = useNavigate()
  const { user } = useAuthStore()
  const { addItem } = useCartStore()
  const { deleteItem } = useMenuStore()
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isOrdering, setIsOrdering] = useState(false)

  const handleAddToCart = () => {
    addItem(item)
  }

  const handleOrderNow = async () => {
    setIsOrdering(true)
    try {
      // Add single item to cart
      addItem(item)
      // Navigate to cart for checkout
      navigate('/cart')
    } catch (err) {
      console.error('Error ordering item:', err)
    } finally {
      setIsOrdering(false)
    }
  }

  const handleEdit = () => {
    navigate(`/admin/menu/edit/${item._id}`)
  }

  const handleDeleteClick = () => {
    setShowDeleteModal(true)
  }

  const handleDeleteConfirm = async () => {
    setIsDeleting(true)
    try {
      await deleteItem(item._id)
      setShowDeleteModal(false)
      // Redirect to menu page after successful deletion
      navigate('/menu')
    } catch (err) {
      console.error('Error deleting item:', err)
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <>
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {item.imageUrl && (
          <img
            src={item.imageUrl}
            alt={item.name}
            className="w-full h-48 object-cover"
          />
        )}
        <div className="p-4">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-xl font-semibold">{item.name}</h3>
            <span className={`px-2 py-1 rounded-full text-xs ${
              item.isAvailable ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}>
              {item.isAvailable ? 'Available' : 'Out of Stock'}
            </span>
          </div>
          <p className="text-gray-600 mb-2">{item.description}</p>
          <p className="text-sm text-gray-500 mb-2">Category: {item.category}</p>
          {/* {user?.role === 'admin' && (
            <p className="text-sm text-gray-500 mb-2">
              Added by: {item.adminName || user.name || 'Admin'}
            </p>
          )}
           */}
          <div className="mt-4">
            <div className="flex justify-between items-center mb-3">
              <span className="text-lg font-bold text-indigo-600">
                ${item.price.toFixed(2)}
              </span>
            </div>

            {/* Admin Controls */}
            {user?.role === 'admin' ? (
              <div className="flex justify-end space-x-2">
                <button
                  onClick={handleEdit}
                  className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors"
                >
                  Edit
                </button>
                <button
                  onClick={handleDeleteClick}
                  disabled={isDeleting}
                  className="px-3 py-1 text-sm bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors disabled:opacity-50"
                >
                  {isDeleting ? 'Deleting...' : 'Delete'}
                </button>
              </div>
            ) : (
              /* Customer Controls */
              <div className="flex flex-col space-y-2">
                <button
                  onClick={handleAddToCart}
                  disabled={!item.isAvailable}
                  className={`w-full px-4 py-2 rounded-md text-white ${
                    item.isAvailable 
                      ? 'bg-indigo-600 hover:bg-indigo-700' 
                      : 'bg-gray-400 cursor-not-allowed'
                  }`}
                >
                  Add to Cart
                </button>
                <button
                  onClick={handleOrderNow}
                  disabled={!item.isAvailable || isOrdering}
                  className={`w-full px-4 py-2 rounded-md text-white ${
                    item.isAvailable && !isOrdering
                      ? 'bg-green-600 hover:bg-green-700'
                      : 'bg-gray-400 cursor-not-allowed'
                  }`}
                >
                  {isOrdering ? 'Processing...' : 'Order Now'}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <ConfirmModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDeleteConfirm}
        title="Delete Menu Item"
        message={`Are you sure you want to delete "${item.name}"? This action cannot be undone.`}
      />
    </>
  )
} 