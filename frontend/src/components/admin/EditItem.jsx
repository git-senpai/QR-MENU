import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useMenuStore from "../../store/menuStore";
import useAuthStore from "../../store/authStore";
import Loading from "../common/Loading";
import Error from "../common/Error";
import { FiUpload, FiX } from "react-icons/fi";

const CATEGORIES = ["Appetizers", "Main Course", "Desserts", "Beverages", "Specials"];

export default function EditItem() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { items, updateItem, isLoading, error } = useMenuStore();
  const [preview, setPreview] = useState(null);
  const [submitError, setSubmitError] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    image: null,
    isAvailable: true,
  });

  useEffect(() => {
    if (!user || user.role !== "admin") {
      navigate("/menu");
      return;
    }

    const itemToEdit = items.find((item) => item._id === id);
    if (itemToEdit) {
      setFormData({
        name: itemToEdit.name,
        description: itemToEdit.description,
        price: itemToEdit.price,
        category: itemToEdit.category,
        isAvailable: itemToEdit.isAvailable,
        image: null,
      });
      setPreview(itemToEdit.imageUrl);
    }
  }, [id, items, user, navigate]);

  const handleImageChange = (file) => {
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setSubmitError("Image size should be less than 5MB");
        return;
      }
      setFormData({ ...formData, image: file });
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    handleImageChange(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError(null);

    try {
      const form = new FormData();
      Object.keys(formData).forEach(key => {
        if (key === 'image' && formData[key]) {
          form.append('image', formData[key]);
        } else if (key !== 'image') {
          form.append(key, formData[key]);
        }
      });

      await updateItem(id, form);
      navigate("/menu");
    } catch (err) {
      setSubmitError(err.message || "Failed to update item");
    }
  };

  if (isLoading) return <Loading />;
  if (error) return <Error message={error} />;

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="px-8 py-6 border-b border-gray-200">
            <h2 className="text-3xl font-bold text-gray-900">Edit Menu Item</h2>
            <p className="mt-2 text-sm text-gray-600">Update the details of your menu item</p>
          </div>

          {(error || submitError) && (
            <div className="mx-8 mt-6 p-4 bg-red-50 rounded-lg border-l-4 border-red-400">
              <p className="text-red-700">{error || submitError}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Column */}
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Description</label>
                  <textarea
                    required
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={4}
                    className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Price ($)</label>
                    <input
                      type="number"
                      step="0.01"
                      required
                      min="0"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Category</label>
                    <select
                      required
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select...</option>
                      {CATEGORIES.map(category => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Image</label>
                  <div
                    className={`relative border-2 border-dashed rounded-lg p-4 text-center ${
                      isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
                    }`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                  >
                    {preview ? (
                      <div className="relative">
                        <img
                          src={preview}
                          alt="Preview"
                          className="mx-auto h-48 w-48 object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            setPreview(null);
                            setFormData({ ...formData, image: null });
                          }}
                          className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                        >
                          <FiX className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <FiUpload className="mx-auto h-12 w-12 text-gray-400" />
                        <div className="text-sm text-gray-600">
                          <label className="relative cursor-pointer rounded-md font-medium text-blue-600 hover:text-blue-500">
                            <span>Upload a file</span>
                            <input
                              type="file"
                              className="sr-only"
                              accept="image/*"
                              onChange={(e) => handleImageChange(e.target.files[0])}
                            />
                          </label>
                          <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs text-gray-500">PNG, JPG, GIF up to 5MB</p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id="isAvailable"
                    checked={formData.isAvailable}
                    onChange={(e) => setFormData({ ...formData, isAvailable: e.target.checked })}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="isAvailable" className="text-sm text-gray-700">
                    Available for order
                  </label>
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-4 pt-6 border-t">
              <button
                type="button"
                onClick={() => navigate("/admin/menu")}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
              >
                {isLoading ? "Updating..." : "Update Item"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 