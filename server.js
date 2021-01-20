// dependencies
const express = require("express");
const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

// create a port for the app to run
const PORT = process.env.PORT || 3000;

// create an instance of express
const app = express();

// handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

//return all saved notes
app.get("/api/notes", function (req, res) {
	fs.readFile("./db/db.json", function (err, data) {
		if (err) throw err;
		res.writeHead(200, { "Content-Type": "application/json" });
		res.end(data);
	});
});

//add a note
app.post("/api/notes", function (req, res) {
	const newNote = req.body;
	newNote.id = uuidv4();

	fs.readFile("./db/db.json", function (err, data) {
		if (err) throw err;
		res.writeHead(200, { "Content-Type": "application/json" });

		let parsedData = JSON.parse(data);
		parsedData.push(newNote);
		let stringifiedData = JSON.stringify(parsedData);
		res.end(stringifiedData);

		fs.writeFile("./db/db.json", stringifiedData, (err) => {
			if (err) throw err;
			console.log("data written to file successfully!");
		});
	});
});

// Deletes a note from the page
app.delete("/api/notes/:id", function (req, res) {
	const noteID = req.params.id;

	fs.readFile("./db/db.json", function (err, data) {
		if (err) throw err;
		let parsedData = JSON.parse(data);
		const newData = parsedData.filter((note) => {
			console.log(note.id, noteID);
			return note.id !== noteID;
		});

		console.log(newData);
		for (let i = 0; i < parsedData.length; i++) {
			if (noteID === parsedData[i].id) {
			}
		}

		let stringifiedData = JSON.stringify(newData);
		res.end(stringifiedData);

		fs.writeFile("./db/db.json", stringifiedData, (err) => {
			if (err) throw err;
			console.log("Data written to file");
		});
	});
});

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
