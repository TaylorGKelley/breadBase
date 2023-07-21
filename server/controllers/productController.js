import Product from '../models/productModel.js';
import APIFeatures from '../utils/apiFeatures.js';
import catchAsync from '../utils/catchAsync.js';

export const getAllProducts = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(Product.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const products = await features.query;

  res.status(200).json({
    status: 'success',
    data: {
      products,
    },
  });
});

export const createProduct = catchAsync(async (req, res, next) => {
  const newProduct = await Product.create(req.body);

  if (!newProduct) {
    return next(new AppError('No product found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      newProduct,
    },
  });
});

export const getProductById = catchAsync(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) return next(new AppError('No product found with that ID', 404));

  res.status(200).json({
    status: 'success',
    data: {
      product,
    },
  });
});

export const updateProduct = catchAsync(async (req, res, next) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!product) return next(new AppError('No product found with that ID', 404));

  res.status(200).json({
    status: 'success',
    data: {
      product,
    },
  });
});

export const deleteProduct = catchAsync(async (req, res, next) => {
  const product = Product.findByIdAndDelete(req.params.id);

  if (!product) return next(new AppError('No product found with that ID', 404));

  res.status(204).json({
    status: 'success',
    data: null,
  });
});
