import Product from '../models/productModel.js';
import asyncHandler from 'express-async-handler';

export const getAllProducts = asyncHandler(async (req, res, next) => {
  let pageSize = 10;
  let page = Number(req.query.pageNumber) || 1;

  // frontend ruta: axios.get(`/api/products?keyword=${keyword}`);
  let keyword = req.query.keyword
    ? {
        //razlog zbog kojeg pisemo ovako je sto u search box na frontendu ne zelimo upisivati bas potpuno tocan naziv proizvoda
        //nego ako upisemo i recimo iph da dobijemo iphone
        name: {
          $regex: req.query.keyword,
          $options: 'i',
        },
      }
    : {};

  let count = await Product.countDocuments({ ...keyword });
  let products = await Product.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  res.json({ products, page, pages: Math.ceil(count / pageSize) });
});

export const getProductById = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: 'Product not found!' });
  }
});

export const deleteProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    await product.remove();
    res.json({ message: 'Product Removed!' });
  } else {
    res.status(404).json({ message: 'Product not found!' });
  }
});

export const createProduct = asyncHandler(async (req, res, next) => {
  const product = new Product({
    name: 'Product',
    price: 0,
    brand: 'nesti',
    user: req.user._id,
    image: 'nesto',
    category: 'nesto',
    countInStock: 0,
    numReviews: 0,
    description: 'nesto',
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

export const updateProduct = asyncHandler(async (req, res, next) => {
  const {
    name,
    price,
    brand,
    description,
    image,
    category,
    countInStock,
  } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = name;
    product.category = category;
    product.image = image;
    product.price = price;
    product.brand = brand;
    product.description = description;
    product.countInStock = countInStock;

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } else {
    res.status(404);
    throw new Error('Product not Found!');
  }
});

export const createProductReview = asyncHandler(async (req, res, next) => {
  const { rating, comment } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    let alreadyReviewed = product.reviews.find(
      (el) => el.user.toString() === req.user._id.toString(),
    );
    if (alreadyReviewed) {
      res.status(400);
      throw new Error('Product already reviewed!');
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };
    product.reviews.push(review);
    product.numReviews = product.reviews.length;
    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;

    await product.save();
    res.status(201).json({ message: 'review added!' });
  } else {
    res.status(404);
    throw new Error('Product not Found!');
  }
});

export const getTopProducts = asyncHandler(async (req, res, next) => {
  const products = await Product.find({}).sort({ rating: -1 }).limit(3);
  res.json(products);
});
