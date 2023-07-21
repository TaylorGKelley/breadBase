import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Product needs a name'],
  },
  description: {
    type: String,
    required: [true, 'Product needs a description'],
  },
  price: {
    type: Number,
    required: [true, 'Product needs a price'],
  },
  estTimeToDeliveryDays: {
    type: Number,
    default: 3,
  },
  bakerProviding: {
    type: String,
    required: [true, 'Error fetching baker ID'],
  },
  reviews: {
    rating: { type: Number },
    title: String,
    body: { type: String, default: 'No review' },
    likes: { type: Number, default: 0 },
    dislikes: { type: Number, default: 0 },
  },
  images: [String],
  imageThumb: {
    type: String,
    required: [true, 'Product needs an image'],
  },
});

const Product = mongoose.model('Product', productSchema);

export default Product;
