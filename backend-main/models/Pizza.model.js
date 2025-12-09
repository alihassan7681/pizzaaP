import mongoose from 'mongoose';

const pizzaSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  image: {
    type: String,
    default: ''
  },
  category: {
    type: String,
    enum: ['vegetarian', 'non-vegetarian', 'vegan'],
    default: 'vegetarian'
  },
  ingredients: [{
    type: String
  }],
  isAvailable: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

const Pizza = mongoose.model('Pizza', pizzaSchema);

export default Pizza;