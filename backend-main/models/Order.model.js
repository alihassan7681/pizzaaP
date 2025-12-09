import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema({
  pizzaId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Pizza',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 1
  },
  price: {
    type: Number,
    required: true
  }
});

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  items: [orderItemSchema],
  totalAmount: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'preparing', 'out-for-delivery', 'delivered', 'cancelled'],
    default: 'pending'
  },
  deliveryAddress: {
    street: String,
    city: String,
    postalCode: String
  },
  paymentMethod: {
    type: String,
    enum: ['cash-on-delivery', 'credit-card', 'paypal'],
    required: true
  }
}, {
  timestamps: true
});

const Order = mongoose.model('Order', orderSchema);

export default Order;