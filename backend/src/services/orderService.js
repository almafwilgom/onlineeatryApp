/**
 * orderService.js — business logic for order operations.
 *
 * Critical security rules enforced here:
 *  1. Prices are NEVER trusted from the client — always fetched from DB.
 *  2. Only available menu items can be ordered.
 *  3. totalAmount is calculated server-side.
 *  4. Customers can only view their own orders (ownership check).
 */
const Order = require('../models/Order');
const Menu  = require('../models/Menu');

/**
 * Create a new order.
 * @param {string} userId - The authenticated customer's ID
 * @param {Array}  items  - [{ menuItem: id, quantity: n }] — price NOT trusted from client
 * @param {string} deliveryAddress
 */
const createOrder = async (userId, items, deliveryAddress) => {
  // 1. Fetch all referenced menu items in one query
  const menuItemIds = items.map((i) => i.menuItem);
  const menuItems   = await Menu.find({ _id: { $in: menuItemIds } });

  // 2. Build a lookup map for quick access
  const menuMap = {};
  menuItems.forEach((m) => { menuMap[m._id.toString()] = m; });

  // 3. Validate each item: exists + is available + quantity is valid
  const orderItems = [];
  for (const item of items) {
    const menuItem = menuMap[item.menuItem];
    if (!menuItem) {
      const err = new Error(`Menu item ${item.menuItem} does not exist.`);
      err.statusCode = 400;
      throw err;
    }
    if (!menuItem.isAvailable) {
      const err = new Error(`"${menuItem.name}" is currently unavailable.`);
      err.statusCode = 400;
      throw err;
    }
    // 4. Snapshot price from DB — client-provided price is ignored
    orderItems.push({
      menuItem: menuItem._id,
      quantity: item.quantity,
      price:    menuItem.price,
    });
  }

  // 5. Calculate total server-side
  const totalAmount = orderItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // 6. Create and return the order
  const order = await Order.create({
    user: userId,
    items: orderItems,
    totalAmount,
    deliveryAddress,
    status: 'Pending',
  });

  // Populate menu item names for the response
  return order.populate('items.menuItem', 'name price category');
};

/**
 * Get all orders for the authenticated customer.
 */
const getMyOrders = async (userId) => {
  return Order.find({ user: userId })
    .populate('items.menuItem', 'name price category imageUrl')
    .sort({ createdAt: -1 });
};

/**
 * Get a single order by ID.
 * Customers can only view their own orders (ownership enforced).
 * Admins can view any order.
 */
const getOrderById = async (orderId, userId, userRole) => {
  const order = await Order.findById(orderId)
    .populate('user', 'name email')
    .populate('items.menuItem', 'name price category');

  if (!order) {
    const err = new Error('Order not found.');
    err.statusCode = 404;
    throw err;
  }

  // Ownership check — customers cannot see other customers' orders
  if (userRole !== 'admin' && order.user._id.toString() !== userId) {
    const err = new Error('Access denied. You can only view your own orders.');
    err.statusCode = 403;
    throw err;
  }

  return order;
};

/**
 * Get all orders (admin only).
 */
const getAllOrders = async () => {
  return Order.find()
    .populate('user', 'name email')
    .populate('items.menuItem', 'name price category')
    .sort({ createdAt: -1 });
};

/**
 * Update order status (admin only).
 */
const updateStatus = async (orderId, status) => {
  const order = await Order.findByIdAndUpdate(
    orderId,
    { status },
    { new: true, runValidators: true }
  ).populate('user', 'name email');

  if (!order) {
    const err = new Error('Order not found.');
    err.statusCode = 404;
    throw err;
  }

  return order;
};

/**
 * Get dashboard metrics for admin.
 */
const getDashboardMetrics = async () => {
  const [totalOrders, pendingOrders, revenueResult] = await Promise.all([
    Order.countDocuments(),
    Order.countDocuments({ status: 'Pending' }),
    Order.aggregate([
      { $match: { status: { $ne: 'Cancelled' } } },
      { $group: { _id: null, total: { $sum: '$totalAmount' } } },
    ]),
  ]);

  const totalRevenue = revenueResult[0]?.total || 0;
  return { totalOrders, pendingOrders, totalRevenue };
};

module.exports = { createOrder, getMyOrders, getOrderById, getAllOrders, updateStatus, getDashboardMetrics };
