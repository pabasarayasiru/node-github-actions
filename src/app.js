const express = require("express");
const userRoutes = require("./routes/userRoutes");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        message: "Node GitHub Actions API running"
    });
});

app.use("/api/users", userRoutes);

module.exports = app;