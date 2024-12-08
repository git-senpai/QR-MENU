import React, { useState, useEffect } from "react";
import useMenuStore from "../../store/menuStore";
import useAuthStore from "../../store/authStore";
import { useNavigate } from "react-router-dom";

export default function CreateItem() {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { addItem, isLoading, error } = useMenuStore();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    image: null,
    isAvailable: true,
  });
  const [preview, setPreview] = useState(null);
  const [submitError, setSubmitError] = useState(null);

  useEffect(() => {
    if (!user || user.role !== "admin") {
      navigate("/menu");
      return;
    }
  }, [user, navigate]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError(null);
    try {
      const form = new FormData();
      form.append("name", formData.name);
      form.append("description", formData.description);
      form.append("price", formData.price);
      form.append("category", formData.category);
      form.append("isAvailable", formData.isAvailable);
      if (formData.image) form.append("image", formData.image);
      await addItem(form);
      navigate("/menu");
    } catch (err) {
      setSubmitError(err.message || "Failed to create item. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 via-gray-100 to-blue-50 flex items-center justify-center py-12 px-6 lg:px-8">
      <div className="max-w-3xl w-full bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden">
        <div className="p-8 sm:p-10">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-800 text-center mb-6">
            Create Menu Item
          </h1>
          {(error || submitError) && (
            <div className="mb-4 bg-red-50 border-l-4 border-red-400 text-red-600 p-4 rounded-md">
              {error || submitError}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-shadow"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                required
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                rows={4}
                className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-shadow"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Price ($)
              </label>
              <input
                type="number"
                step="0.01"
                required
                min="0"
                value={formData.price}
                onChange={(e) =>
                  setFormData({ ...formData, price: e.target.value })
                }
                className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-shadow"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <select
                required
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
                className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-shadow"
              >
                <option value="">Select a category</option>
                <option value="Appetizers">Appetizers</option>
                <option value="Main Course">Main Course</option>
                <option value="Desserts">Desserts</option>
                <option value="Beverages">Beverages</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Image
              </label>
              <div className="flex items-center space-x-4">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200 cursor-pointer"
                />
                {preview && (
                  <img
                    src={preview}
                    alt="Preview"
                    className="h-20 w-20 object-cover rounded-lg shadow-sm border border-gray-200"
                  />
                )}
              </div>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="isAvailable"
                checked={formData.isAvailable}
                onChange={(e) =>
                  setFormData({ ...formData, isAvailable: e.target.checked })
                }
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label
                htmlFor="isAvailable"
                className="ml-2 block text-sm text-gray-700"
              >
                Available for order
              </label>
            </div>
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => navigate("/menu")}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
              >
                {isLoading ? "Creating..." : "Create Item"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
