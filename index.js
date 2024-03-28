const express=require('express')
const app=express();
const cors=require('cors')
const port=process.env.PORT || 5000;
const { MongoClient, ServerApiVersion } = require('mongodb');
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

  } finally {
 
  }
}
run().catch(console.dir);



app.get('/',(req,res)=>{
    res.send('new api')
})

app.listen(port)