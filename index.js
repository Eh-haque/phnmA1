const express = require("express");
const router = require("./routes");

const app = express();
app.use(express.json());

app.use(router);

app.get("/", (req, res) => {
    res.send("server running");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log("listening on port " + PORT);
});

module.exports = app;
