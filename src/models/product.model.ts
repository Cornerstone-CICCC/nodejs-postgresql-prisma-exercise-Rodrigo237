import { PrismaClient, Product } from '../generated/prisma/client';
const prisma = new PrismaClient();

const createProduct = async (data: { productName: string; price: number }) => {
  return prisma.product.create({ data });
};

const getProducts = async () => {
  return prisma.product.findMany();
};

const getProductById = async (id: number) => {
  return prisma.product.findUnique({ where: { id } });
};


const updateProduct = async (id: number, data: { productName?: string; price?: number }) => {
  return prisma.product.update({ where: { id }, data });
};

const deleteProduct = async (id: number) => {
  return prisma.product.delete({ where: { id } });
};

export default {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
