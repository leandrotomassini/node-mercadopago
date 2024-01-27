import mercadopago from 'mercadopago';



export const createOrder = async (req, res) => {

    mercadopago.configure({
        access_token:
            "TEST-283740151967096-012114-4d740272c8e2daf2ca721aff5d66c0c1-1647008805"
    });

    const idSubscription = "ABC123";
    const urlParamData = `https://f319-2802-8010-342b-7b00-2cab-e727-1ca1-e0bb.ngrok-free.app/webhook?hola=${idSubscription}`;

    const result = await mercadopago.preferences.create({
        items: [
            {
                title: "Laptop Lenovo",
                unit_price: 500,
                currency_id: "ARS",
                quantity: 1
            }
        ],
        payer: {
            first_name: "pepe",
            last_name: "argento",
            email: "chicho@chicho.com",
        },
        back_urls: {
            success: "http://localhost:3000/success",
            failure: "http://localhost:3000/failure",
            pending: "http://localhost:3000/pending",
        },
        notification_url: urlParamData
    });

    res.status(200).json({
        "Result:": result.body.init_point
    });
}


export const receiveWebhook = async (req, res) => {
    try {
        console.log(req.query);

        const holaParam = req.query.hola;
        console.log("Valor del parámetro 'hola':", holaParam);

        const payment = req.query;

        if (payment.type === "payment") {
            const data = await mercadopago.payment.findById(req.query['data.id']);
            console.log(data)
        }

        res.status(204).json({
            payment
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error });
    }
}

