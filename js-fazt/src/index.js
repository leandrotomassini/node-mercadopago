import express from 'express';
import morgan from 'morgan';

import paymenRoutes from './routes/payment.routes.js';
import { PORT } from './config.js';


const app = express();

app.use(morgan('dev'));

app.use(paymenRoutes);

app.listen(PORT);

console.log('Server on port: ' + PORT);