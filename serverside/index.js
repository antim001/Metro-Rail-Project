const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 5080;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Working!!");
});

require("./mongoConfig")(app);

app.listen(port, () => {
    console.log(`\n\n\t-> Server running at "http://localhost:${port}"...`);
});