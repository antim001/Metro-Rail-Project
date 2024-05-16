const { ObjectId } = require("mongodb");

function routes(app, { stopageCollection, bookingCollection, fareCollection, contactCollection, lostCollection, userCollection }) {
    app.get("/stops", async (req, res) => {
        const result = await stopageCollection.findOne();

        res.send(result);
    });

    app.post("/book_ticket", async (req, res) => {
        const result = await bookingCollection.insertOne(req.body);

        res.send(result);
    });

    app.post("/ticket_info", async (req, res) => {
        const ticket = await bookingCollection.findOne({ _id: new ObjectId(req.body.id) });

        const fareKey = `${ticket.from.toLowerCase()}_to_${ticket.to.toLowerCase()}`;
        const fareKey2 = `${ticket.to.toLowerCase()}_to_${ticket.from.toLowerCase()}`;
        const fare = await fareCollection.findOne();

        const usr = await userCollection.findOne({ email: req.body.buyer });

        res.send({ ticket_id: req.body.id, ...ticket, ...fare, ...usr });
    });

    app.post("/fares", async (req, res) => {
        const result = await fareCollection.updateOne({}, { $set: { ...req.body } });
        // const result = await fareCollection.insertOne(req.body);

        res.send(result);
    });

    app.get("/fares", async (req, res) => {
        const result = await fareCollection.findOne();

        res.send(result);
    });

    app.post("/confirm_booking", async (req, res) => {
        const result = await bookingCollection.updateOne({ _id: new ObjectId(req.body.ticket_id) }, { $set: { paid: 1, totalFare: req.body.totalFare } });

        const result2 = await userCollection.updateOne({ email: req.body.email }, { $set: { balance: req.body.balance } });

        res.send(result2);
    });

    app.post("/bookings", async (req, res) => {
        let fetchedData;
        if (req.body.id) {
            fetchedData = bookingCollection.find({ buyer: req.body.buyer, _id: new ObjectId(req.body.id) });
        }
        else if (req.body.buyer) {
            fetchedData = bookingCollection.find({ buyer: req.body.buyer });
        }
        else {
            fetchedData = bookingCollection.find();
        }

        const result = await fetchedData.toArray();

        res.send(result);
    });

    app.post("/contact", async (req, res) => {
        const result = await contactCollection.insertOne(req.body);

        res.send(result);
    });

    app.post("/lost", async (req, res) => {
        const result = await lostCollection.insertOne(req.body);

        res.send(result);
    });

    app.post("/current_balance", async (req, res) => {
        const result = await userCollection.findOne({ ...req.body }, { projection: { _id: -1, balance: 1 } });

        res.send(result);
    });

    app.post("/recharge", async (req, res) => {
        const result = await userCollection.updateOne({ email: req.body.email }, { $set: { balance: req.body.recharge } });

        res.send(result);
    });

    app.post("/register", async (req, res) => {
        const result = await userCollection.insertOne({ ...req.body });

        res.send(result);
    });

    app.post("/losts", async (req, res) => {
        let fetchedData;

        if (req.body.email)
            fetchedData = lostCollection.find({ email: req.body.email });
        else
            fetchedData = lostCollection.find();

        const result = await fetchedData.toArray();

        res.send(result);
    });

    app.post("/users", async (req, res) => {
        let fetchedData;

        if (req.body.email)
            fetchedData = userCollection.find({ email: req.body.email });
        else
            fetchedData = userCollection.find();

        const result = await fetchedData.toArray();

        res.send(result);
    });

    app.post("/lost_respond", async (req, res) => {
        let result;

        if (!req.body.balanceEnough)
            result = await lostCollection.updateOne({ _id: new ObjectId(req.body.lostId) }, { $set: { admin_reply: "Insufficient amount" } });
        else {
            result = await lostCollection.updateOne({ _id: new ObjectId(req.body.lostId) }, { $set: { admin_reply: "Admin will look into the matter" } });

            result = await userCollection.updateOne({ email: req.body.email }, { $inc: { balance: -200 } });
        }

        res.send(result);
    });
}

module.exports = routes;