const { Router } = require('express');
const mercadopago = require('mercadopago');
const dotenv = require('dotenv');

dotenv.config();

const Mercado_Pago = Router();

mercadopago.configure({
    access_token: process.env.ACCESS_TOKEN || '',
});

Mercado_Pago.post('/', async (req, res) => {

    const product = req.body;

    try {

        const preference = {

            items: [
                {
                    title: product.nombre,
                    unit_price: product.precio,
                    currency_id: "ARS",
                    description: "Notebook",
                    quantity: product.cantidad
                }
            ],

            back_urls: {
                success: "http://localhost:5173/",
                failure: "http://localhost:3000/failure",
                pending: "http://localhost:3000/pending"
            },

            auto_return: "approved",
        };


        const resp = await mercadopago.preferences.create(preference);
        console.log(resp.response.init_point);
        res.status(200).json(resp.response.init_point);
    } catch (error) {
        console.log(error.message);
        res.status(500).json(error.message);
    }
})



module.exports = Mercado_Pago;