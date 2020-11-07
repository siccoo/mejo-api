//imported the following dependencies
import express from "express";
import path from "path";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import Promise from "bluebird";

import auth from "./routes/auth";
import users from "./routes/users"


dotenv.config();

// Assigning express function
const app = express();

// Calling the port number that ther server is listening to
const port = process.env.PORT || 8050;

app.use(bodyParser.json());
mongoose.Promise = Promise;
mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true });

app.use("/api/auth", auth);
app.use("/api/users", users);

// app.post("api/auth", (req, res) => {
//     res.status(400).json({ errors: { global: "Invalid credentials" } });
// });

app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/book", (req, res) => {
    res.send({ type: 'GET' });
});

app.post("/book", (req, res) => {
    res.send({ type: 'POST' });
});

app.put("/book/:id", (req, res) => {
    res.send({ type: 'PUT'});
});

app.delete("/book/:id", (req, res) => {
    res.send({ type: 'DELETE'})
});


// Tell Express to listen for requests from the App ("Starts Server").
app.listen(port, (req, res) => {
    console.log(`server listening on port: ${port}`)
});
