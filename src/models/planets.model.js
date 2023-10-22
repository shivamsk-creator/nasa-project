const { parse } = require("csv-parse");
const fs = require("fs");
const path = require("path");

const planets = require("./planets.mongo");
const planetsMongo = require("./planets.mongo");

const habitablePlanets = [];

function isHabitablePlanet(planet) {
  return (
    planet["koi_disposition"] === "CONFIRMED" &&
    planet["koi_insol"] > 0.36 &&
    planet["koi_insol"] < 1.11 &&
    planet["koi_prad"] < 1.6
  );
}

function loadPlanetsData() {
  return new Promise((resolve, reject) => {
    fs.createReadStream(
      path.join(__dirname, "..", "..", "data", "kepler_data.csv")
    )
      .pipe(
        parse({
          comment: "#",
          columns: true,
        })
      )
      .on("data", async (data) => {
        if (isHabitablePlanet(data)) {
          // console.log("data", data);
          await planets.create({
            keplerName: data.kepler_name,
          });
        }
      })
      .on("error", (err) => {
        console.log("error => ", err);
        reject(err);
      })
      .on("end", () => {
        // console.log("result => ", habitablePlanets);

        console.log("Done");
        resolve();
      });
  });
}

async function getAllPlanets() {
  return await planetsMongo.find({});
}

module.exports = { loadPlanetsData, getAllPlanets };
