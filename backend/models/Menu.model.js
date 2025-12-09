import mongoose from 'mongoose';

const menuItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  sizes: {
    small: {
      type: Number,
      required: true
    },
    medium: {
      type: Number,
      required: true
    },
    large: {
      type: Number,
      required: true
    }
  },
  image: {
    type: String, // URL to the image
    required: true
  },
  category: {
    type: String,
    enum: ['classic', 'premium', 'vegetarian', 'special'],
    default: 'classic'
  }
}, {
  timestamps: true
});

export default mongoose.model('MenuItem', menuItemSchema);