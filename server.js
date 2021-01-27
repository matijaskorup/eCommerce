import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import connectDB from './config/db.js';
import colors from 'colors';
import morgan from 'morgan';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';

import { notFound, errorMiddleware } from './middleware/errorMidleware.js';

dotenv.config();
const app = express();
connectDB();
app.use(express.json());
app.use(morgan('dev'));

app.use('/api/products/', productRoutes);
app.use('/api/users/', userRoutes);
app.use('/api/orders/', orderRoutes);
app.use('/api/upload', uploadRoutes);

app.get('/api/config/paypal', (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID),
);

//dirname je noralno dostupan u nodejs ali ako koristimo import sintaksu, onda nije, pa ga moramo koristiti ovako
const __dirname = path.resolve();
//upload folder moramo napraviti kao static folder da bi bio dostupan u frontendu (browseru)
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

app.use(notFound);

app.use(errorMiddleware);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `server running in ${process.env.NODE_ENV} on port: ${process.env.PORT}`
      .yellow,
  );
});
