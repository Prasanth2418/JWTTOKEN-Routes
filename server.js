const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const port = process.env.PORT || 5000;
const connectDb = require("./config/dbconnection")

connectDb();
app.use(express.json());
app.use("/contacts", require("./routes/contactRoutes"));
app.use("/users", require("./routes/userRoutes"));
app.listen(port, () => console.log("Server running...", { port }));
