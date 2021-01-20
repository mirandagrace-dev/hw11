// dependencies
const express = require("express");
const fs = require("fs");
const path = require("path");

// create a port for the app to run
const PORT = process.env.PORT || 3000;

// create an instance of express
const app = express();

// handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

//return the index.html file
app.get("/", function (req, res) {
	res.json(path.join(__dirname, "/public/index.html"));
});

//return the notes.html file
app.get("/notes", (req, res) => {
	res.sendFile(path.join(__dirname, "/public/notes.html"));
});

// start the server
app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});
