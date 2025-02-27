const express = require("express");
const http = require("http");
const cors = require("cors");
const routes = require("./routes/configRouts.js");
const connectToDb = require("./db/mongoConnect.js");

const app = express();


app.use(express.json());
app.use(cors());


connectToDb();


routes(app);


app.use(express.static("public"));


const server = http.createServer(app);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
