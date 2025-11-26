import { Request, Response } from 'express';
import productModel from '../models/product.model';

const getAllProducts = async (_req: Request, res: Response) => {
  try {
    const products = await productModel.getProducts();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching products' });
  }
};

const getProductById = async (req: Request, res: Response): Promise<void> => {
  const id = Number(req.params.id);
  try {
    const product = await productModel.getProductById(id);
    if (!product) {
      res.status(404).json({ error: 'Product not found' });
      return; 
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching product' });
  }
};


const createProduct = async (req: Request, res: Response) => {
  const { productName, price } = req.body;
  try {
    const newProduct = await productModel.createProduct({ productName, price });
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(400).json({ error: 'Error creating product' });
  }
};

const updateProduct = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const { productName, price } = req.body;
  try {
    const updated = await productModel.updateProduct(id, { productName, price });
    res.json(updated);
  } catch (error) {
    res.status(400).json({ error: 'Error updating product' });
  }
};

const deleteProduct = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  try {
    await productModel.deleteProduct(id);
    res.json({ message: 'Product deleted' });
  } catch (error) {
    res.status(400).json({ error: 'Error deleting product' });
  }
};

export default {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
