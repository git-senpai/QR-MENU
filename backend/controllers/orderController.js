import Order from '../models/Order.js';
import { io } from '../server.js';

// Create new order - Removed authentication requirement
export const createOrder = async (req, res) => {
  console.log('\n--- Create Order Request ---');
  console.log('Request Body:', req.body);
  
  try {
    const { customerName, customerEmail, tableNumber, items, total, notes } = req.body;

    // Validate required fields
    if (!customerName || !customerEmail || !items || !total) {
      console.log('Validation Error: Missing required fields');
      return res.status(400).json({
        message: 'Please provide all required fields: customerName, customerEmail, items, total'
      });
    }

    // Validate items array
    if (!Array.isArray(items) || items.length === 0) {
      console.log('Validation Error: Invalid items array');
      return res.status(400).json({
        message: 'Order must contain at least one item'
      });
    }

    // Create the order
    const order = await Order.create({
      customerName,
      customerEmail,
      tableNumber,
      items: items.map(item => ({
        _id: item._id,
        name: item.name,
        price: item.price,
        quantity: item.quantity
      })),
      total,
      notes,
      status: 'pending'
    });

    // Emit socket event for new order
    io.emit('newOrder', order);
    console.log('Socket event emitted: newOrder');

    res.status(201).json(order);
  } catch (error) {
    console.error('Create order error:', error);
    res.status(500).json({
      message: 'Error creating order',
      error: error.message
    });
  }
};

// Get all orders (admin only)
export const getOrders = async (req, res) => {
  console.log('\n--- Get All Orders Request ---');
  console.log('User:', req.user?._id);
  
  try {
    const orders = await Order.find({}).sort({ createdAt: -1 });
    console.log(`Found ${orders.length} orders`);
    res.json(orders);
  } catch (error) {
    console.error('Get orders error:', error);
    res.status(500).json({
      message: 'Error fetching orders',
      error: error.message
    });
  }
};

// Get single order
export const getOrderById = async (req, res) => {
  console.log('\n--- Get Order By ID Request ---');
  console.log('Order ID:', req.params.id);
  
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      console.log('Order not found');
      return res.status(404).json({ message: 'Order not found' });
    }
    console.log('Order found:', order._id);
    res.json(order);
  } catch (error) {
    console.error('Get order error:', error);
    res.status(500).json({
      message: 'Error fetching order',
      error: error.message
    });
  }
};

// Update order status (admin only)
export const updateOrderStatus = async (req, res) => {
  console.log('\n--- Update Order Status Request ---');
  console.log('Order ID:', req.params.id);
  console.log('New Status:', req.body.status);
  console.log('User:', req.user?._id);
  
  try {
    const { status } = req.body;

    // Validate status
    const validStatuses = ['pending', 'in-progress', 'completed', 'cancelled'];
    if (!validStatuses.includes(status)) {
      console.log('Invalid status provided:', status);
      return res.status(400).json({
        message: 'Invalid status. Must be one of: ' + validStatuses.join(', ')
      });
    }

    const order = await Order.findById(req.params.id);
    if (!order) {
      console.log('Order not found');
      return res.status(404).json({ message: 'Order not found' });
    }

    console.log('Previous status:', order.status);
    order.status = status;
    const updatedOrder = await order.save();
    console.log('Order status updated successfully');

    // Emit socket event for order status update
    io.emit('orderStatusUpdate', {
      orderId: order._id,
      status: order.status
    });
    console.log('Socket event emitted: orderStatusUpdate');

    res.json(updatedOrder);
  } catch (error) {
    console.error('Update order status error:', error);
    res.status(500).json({
      message: 'Error updating order status',
      error: error.message
    });
  }
};

// Example test data for Postman
/*
POST /api/orders
{
    "customerName": "John Doe",
    "customerEmail": "john@example.com",
    "tableNumber": "A12",
    "items": [
        {
            "_id": "65f1234567890...",
            "name": "Classic Burger",
            "price": 12.99,
            "quantity": 2
        }
    ],
    "total": 25.98,
    "notes": "Extra sauce please"
}

PUT /api/orders/:id/status
{
    "status": "in-progress"
}
*/ 