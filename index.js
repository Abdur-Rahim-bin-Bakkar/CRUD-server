const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

const dns = require("node:dns");
dns.setServers(["1.1.1.1", "8.8.8.8"]);

const app = express();
const port = process.env.PORT || 5000;

const uri = "mongodb+srv://simpleCrud:rrNxfb6KzVlDai42@cluster0.3iurerr.mongodb.net/?appName=Cluster0";

app.use(cors());
app.use(express.json());

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

let userCollection;

async function run() {
  try {
    await client.connect();

    const database = client.db("crud");
    userCollection = database.collection("user");

    await client.db("admin").command({ ping: 1 });
    console.log("MongoDB connected");
  } catch (error) {
    console.error(error);
  }
}

run();

app.get("/", (req, res) => {
  res.send("check");
});

app.get("/user", async (req, res) => {
  const result = await userCollection.find().toArray();
  res.send(result);
});

app.get("/user/:id", async (req, res) => {
  const id = req.params.id;
  const query = { _id: new ObjectId(id) };
  const currentUser = await userCollection.findOne(query);
  res.send(currentUser);
});
app.delete('/user/:id', (req, res) => {
  const id = req.params.id;
  const query = { _id: new ObjectId(id) }
  const result = userCollection.deleteOne(query)
  res.send(result)
})
app.post('/user', async (req, res) => {
  const newUser = req.body;
  const result = await userCollection.insertOne(newUser)
  res.send(result)
  console.log(result, 'post result')
})

app.patch('/user/:id', (req, res) => {
  const id = req.params.id;
  const query = { _id: new ObjectId(id) }
  const updateDocument = {
    $set: {
      name:req.body.name,
      email:req.body.email,
      role:req.body.role,
      age:req.body.age
    },
  };

  const result = userCollection.updateOne(query,updateDocument)
})
app.listen(port, () => {
  console.log("server is running");
});