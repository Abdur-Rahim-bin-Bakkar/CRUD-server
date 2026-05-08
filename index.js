const express = require('express')
const cors = require('cors')
const { MongoClient, ServerApiVersion } = require('mongodb');

const app = express()
const port = process.env.PORT || 5000;
const uri = `mongodb+srv://${process.env.USER_NAME}:${process.env.PASSWORD}@cluster0.3iurerr.mongodb.net/?appName=Cluster0`;
//simpleCrud
app.use(cors())
app.use(express.json())
//4bqZKxJNU7u9QTdQ  

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});



app.get('/', (req, res) => {
    res.send()
})

const run = async ()=>{
    try{

        await client.connect()
        await client.db("admin").command({ ping: 1 });
        console.log('pink the deployment')
    }
    finally{
        client.close()
    }

}
run().catch(console.dir)


app.listen(port, () => {
    console.log('server is running')
})