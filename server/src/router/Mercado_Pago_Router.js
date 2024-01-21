const { Router } = require('express');
const mercadopago = require('mercadopago');
const dotenv = require('dotenv');

dotenv.config();
const Mercado_Pago = Router();

mercadopago.configure({
    access_token: process.env.ACCESS_TOKEN || '',
});

Mercado_Pago.post('/', async (req, res) => {
    try {

        const preference = {

            items: [
                {
                    title: "Computadora",
                    picture_url: "http://fdsfd",
                    unit_price: 200,
                    currency_id: "ARG",
                    description: "Portatil lenovo",
                    quantity: 1
                }
            ],

            back_urls: {
                success: "http://localhost:3000/success",
                failure: "http://localhost:3000/failure"
            },

            auto_return: "approved",
        };


        const resp = await mercadopago.preferences.create(preference);
        console.log(resp);
        res.status(200).json(resp);
    } catch (error) {
        console.log(error.message);
        res.status(500).json(error.message);
    }
})



module.exports = Mercado_Pago;