// Dependencies
const express = require("express");
const fs = require("fs");
const path = require("path");

// Define a PORT to listen on
const PORT = process.env.PORT || 3000;

// Create a server using Express
const app = express();

// Set up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.get("/", function (req, res) {
	res.json(path.join(__dirname, "public/index.html"));
});

app.listen(PORT, () => {
	console.log("hooray");
});


