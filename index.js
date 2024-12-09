const express = require('express')
const app = express();
const cors = require('cors')
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config()
app.use(cors());
app.use(express.json());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.62b40ek.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    const servicecollection = client.db("geniusCar").collection('services');
    const ordercollection = client.db('geniusCar').collection('orders');
    app.get('/services', async (req, res) => {
      const query = {};
      const result = servicecollection.find(query);
      const services = await result.toArray();
      res.send(services)

    });
    app.get('/services/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) }
      const service = await servicecollection.findOne(query)
      res.send(service)
    });

    //order api
    app.get('/orders', async (req, res) => {
      let query = {};
      if (req.query.email) {
        query = {
          email: req.query.email
        }
      }
      const cursor = ordercollection.find(query);
      const orders = await cursor.toArray();
      res.send(orders)
    })

    app.post('/orders', async (req, res) => {
      const order = req.body;
      const result = await ordercollection.insertOne(order)
      res.send(result)
    });

    app.delete('/orders/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await ordercollection.deleteOne(query);
      res.send(result)
    })

  } finally {

  }
}
run().catch(console.dir);



app.get('/', (req, res) => {
  res.send('new api')
})

app.listen(port)