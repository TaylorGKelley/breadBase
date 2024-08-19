import { Request, Response } from 'express';
import Products from '../models/productModel';
import { ProtectedUser } from '../types/User';

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await Products.find();

    res.status(200).json({
      message: 'success',
      data: {
        products,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: `Failed to retrieve data at: ${req.originalUrl}`,
    });
  }
};

export const getProductById = async (req: Request, res: Response) => {
  try {
    const product = await Products.findById(req.params.id);

    if (!product) {
      throw new Error('Could not find product with that ID');
    }

    res.status(200).json({
      message: 'success',
      data: {
        product,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: `Failed to retrieve data at: ${req.originalUrl} with id ${req.params.id}`,
    });
  }
};

export const createProduct = async (req: Request, res: Response) => {
  try {
    const newProduct = await Products.create({
      ...req.body,
      bakery: (req.user as ProtectedUser).associatedBakeryId,
    });

    res.status(200).json({
      message: 'Product Created',
      data: {
        product: newProduct,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: `Failed to create item with error,`,
      error: (error as Error).message,
    });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const updatedProduct = await Products.findByIdAndUpdate(
      req.params.id,
      { ...req.body, bakery: (req.user as ProtectedUser).associatedBakeryId },
      {
        new: true,
        runValidators: true,
      },
    );

    res.status(200).json({
      status: 'Product updated',
      data: {
        product: updatedProduct,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: `Failed to update item of id:'${req.params.id}' with error,`,
      error: (error as Error).message,
    });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const product = await Products.findByIdAndDelete(req.params.id);

    if (!product) {
      throw new Error('Could not find product using the provided ID.');
    }

    res.status(200).json({
      status: 'Product deleted',
      data: null,
    });
  } catch (error) {
    res.status(404).json({
      status: `Failed to delete item of id:'${req.params.id}' with error,`,
      error: (error as Error).message,
    });
  }
};
