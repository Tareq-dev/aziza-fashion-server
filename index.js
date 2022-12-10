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

        // POST for order
        app.post("/orders", async (req, res) => {
            const orders = req.body;
            const result = await ordersCollection.insertOne(orders);
            res.send(result);
        });
        // GET == orders

        app.get("/orders",  async (req, res) => {
            const orders = await ordersCollection.find().toArray();
            res.send(orders);
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