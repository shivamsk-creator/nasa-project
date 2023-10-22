const fs = require("fs");
const https = require("https");
const mongoose = require("mongoose");

const app = require("./app");

const PORT = process.env.PORT || 8000;

const { loadPlanetsData } = require("./models/planets.model");

const MONGO_URL =
  "mongodb+srv://shivam:shivam@nasacluster.5fqomve.mongodb.net/nasa?retryWrites=true&w=majority";

const file = fs.readFileSync("server.js");
console.log("file => ", file);

const server = https.createServer(app);

// {
//   key: fs.readFileSync("key.pem"),
//   cert: fs.readFileSync("cert.pem"),
// },

mongoose.connection.once("open", () => {
  console.log(
    `Database connected sucessfully on ${mongoose.connection.host} ${mongoose.connection.port}`
  );
});
mongoose.connection.on("error", (err) => {
  console.error(err);
});

async function startServer() {
  await mongoose.connect(MONGO_URL);

  await loadPlanetsData();
  server.listen(PORT, () => {
    console.log(`Hey Shivam ! Your server is running on port ${PORT} ...`);
  });
}

startServer();
