const express = require('express')
const cors = require('cors')
const app = express()
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

//dbuser : aziza
//dbpass : BC3j4YLHAgUXumM6

const port = process.env.PORT || 5000



const uri = "mongodb+srv://aziza:BC3j4YLHAgUXumM6@aziza.h5qyukr.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        await client.connect();
        const productsCollection = client.db("azizaFashion").collection("products");
        const ordersCollection = client.db("azizaFashion").collection("orders")
        const paymentCollection = client.db("azizaFashion").collection("payment")

        // GET == products
        app.get("/products", async (req, res) => {
            const products = await productsCollection.find().toArray();
            res.send(products);
        });


        // GET == single products
        app.get("/products/:id", async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const product = await productsCollection.findOne(query);
            res.send(product);
        });
        //Delete Product
        app.delete("/products/:id", async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await productsCollection.deleteOne(query);
            res.send(result);
        });
        //POST PRODUCT
        app.post("/products", async (req, res) => {
            const products = req.body;
            const result = await productsCollection.insertOne(products);
            res.send(result);
        });

        // POST for order
        app.post("/orders", async (req, res) => {
            const orders = req.body;
            const result = await ordersCollection.insertOne(orders);
            res.send(result);
        });
        // GET == orders

        app.get("/orders", async (req, res) => {
            const orders = await ordersCollection.find().toArray();
            res.send(orders);
        });

        // GET == orders by email

        app.get("/order", async (req, res) => {
            const email = req.query.email;
            if (email) {
                const query = { email: email };
                const cursor = ordersCollection.find(query);
                const orders = await cursor.toArray();
                res.send(orders);
            } else {
                res.status(403).send({ message: "Forbidden access" });
            }
        });
        //PUT

        app.put("/payment/:email/:id", async (req, res) => {
            email = req.params.email;
            const orderId = req.params.id;
            const filter = { email: email, _id: ObjectId(orderId) };
            const updatedDoc = {
                $set: {
                    paid: true,
                },
            };
            const updatedOrder = await ordersCollection.updateOne(filter, updatedDoc);

            res.send(updatedOrder);
        });

        //Shipment

        app.put("/shipment/:id", async (req, res) => {
            const orderId = req.params.id;
            console.log(orderId)

            const filter = { _id: ObjectId(orderId) };
            const updatedDoc = {
                $set: {
                    shipment: true,
                },
            };
            const updatedOrder = await ordersCollection.updateOne(filter, updatedDoc);

            res.send(updatedOrder);
        });


        //delete order 


        app.delete("/orders/cart/:id/:cartId", async (req, res) => {
            const id = req.params.id;
            const cartId = req.params.cartId;
            // console.log(id)
            console.log(cartId)
            const query = { _id: ObjectId(id) };
            const cursor = await ordersCollection.findOne(query);
            const findCart = cursor.cart.find(x => x._id === cartId)
            // console.log(findCart)
            const cartQuery = { _id: findCart._id };
            // console.log(cartQuery)

            const result = await ordersCollection.deleteOne(cartQuery);
            console.log(ordersCollection)
            res.send(result);
        });

    } finally {
        // await client.close();
    }
}
run().catch(console.dir);

app.use(cors())
app.use(express.json())
app.get('/', (req, res) => {
    res.send('Hello World ')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})