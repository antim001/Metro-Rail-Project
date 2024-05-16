 require("dotenv").config();

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.USER_DB}:${process.env.USER_PASS}@cluster0.aayqhgl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run(app) {
    try {
        await client.connect();
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");

        const db = client.db("metro");
        const userCollection = db.collection("user");
        const stopageCollection = db.collection("stopage");
        const bookingCollection = db.collection("booking");
        const fareCollection = db.collection("fare");
        const contactCollection = db.collection("contact");
        const lostCollection = db.collection("lost");

        require("./routes/routes")(app, { stopageCollection, bookingCollection, fareCollection, contactCollection, lostCollection, userCollection });
    }
    catch (err) {
        console.log(err);
    }
    // finally {
    //     // Ensures that the client will close when you finish/error
    //     await client.close();
    // }
}

module.exports = run;