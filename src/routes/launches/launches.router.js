const express = require("express");

const {
  getAllLaunches,
  httpAddNewLaunch,
  httpAbortLaunch,
} = require("../launches/launches.controller");

const launchesRouter = express.Router();

launchesRouter.get("/launches", getAllLaunches);
launchesRouter.post("/launches", httpAddNewLaunch);
launchesRouter.delete("/launches/:id", httpAbortLaunch);

module.exports = launchesRouter;
