import MenuItem from '../models/MenuItem.js';
import cloudinary from '../config/cloudinary.js';

export const getMenuItems = async (req, res) => {
  try {
    const menuItems = await MenuItem.find({});
    res.json(menuItems);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createMenuItem = async (req, res) => {
  try {
    const { name, description, price, category } = req.body;
    
    // Validate required fields
    if (!name || !description || !price || !category) {
      return res.status(400).json({ 
        message: 'Please provide all required fields: name, description, price, category' 
      });
    }

    let imageUrl = '';

    // Handle image upload if present
    if (req.file) {
      try {
        const result = await cloudinary.uploader.upload(req.file.path);
        imageUrl = result.secure_url;
      } catch (uploadError) {
        console.error('Image upload error:', uploadError);
        // Continue without image if upload fails
      }
    }

    const menuItem = await MenuItem.create({
      name,
      description,
      price: Number(price), // Ensure price is converted to number
      category,
      imageUrl,
      isAvailable: true
    });

    res.status(201).json(menuItem);
  } catch (error) {
    console.error('Create menu item error:', error);
    res.status(500).json({ 
      message: 'Error creating menu item',
      error: error.message 
    });
  }
};

export const updateMenuItem = async (req, res) => {
  try {
    const { name, description, price, category, isAvailable } = req.body;
    const menuItem = await MenuItem.findById(req.params.id);

    if (!menuItem) {
      return res.status(404).json({ message: 'Menu item not found' });
    }

    let imageUrl = menuItem.imageUrl;
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      imageUrl = result.secure_url;
    }

    menuItem.name = name || menuItem.name;
    menuItem.description = description || menuItem.description;
    menuItem.price = price || menuItem.price;
    menuItem.category = category || menuItem.category;
    menuItem.imageUrl = imageUrl;
    menuItem.isAvailable = isAvailable !== undefined ? isAvailable : menuItem.isAvailable;

    const updatedMenuItem = await menuItem.save();
    res.json(updatedMenuItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteMenuItem = async (req, res) => {
  try {
    const menuItem = await MenuItem.findById(req.params.id);
    if (!menuItem) {
      return res.status(404).json({ message: 'Menu item not found' });
    }

    // Delete image from Cloudinary if exists
    if (menuItem.imageUrl) {
      const publicId = menuItem.imageUrl.split('/').pop().split('.')[0];
      try {
        await cloudinary.uploader.destroy(publicId);
      } catch (cloudinaryError) {
        console.error('Cloudinary delete error:', cloudinaryError);
        // Continue with item deletion even if image deletion fails
      }
    }

    // Use findByIdAndDelete instead of remove()
    await MenuItem.findByIdAndDelete(req.params.id);
    
    res.json({ message: 'Menu item removed successfully' });
  } catch (error) {
    console.error('Delete menu item error:', error);
    res.status(500).json({ 
      message: 'Error deleting menu item',
      error: error.message 
    });
  }
}; 