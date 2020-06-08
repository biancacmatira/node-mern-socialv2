const HttpErr = require("../models/http-error");

const PLACES = require("../data").DUMMY_PLACES;

exports.getPlacesByUID = (req, res, next) => {
  const userId = req.params.uid;
  const places = PLACES.filter((place) => place.creator === userId);

  if (places.length === 0) {
    throw new HttpErr("Could not find places for the provided User ID", 404);
    // const error = new Error("Could not find places for the provided User ID");
    // error.code = 404;
    // throw error;
  }
  res.json({ message: "YOUR PLACES", places: places });
};

exports.getPlaceByPID = (req, res, next) => {
  const placeId = req.params.pid;
  const place = PLACES.find((p) => p.id === placeId);

  if (!place) {
    return next(
      new HttpErr("Could not find places for the provided User ID", 404)
    );
    // const error = new Error("Could not find a place for the provided ID");
    // error.code = 404;
    // return next(error);
  }
  res.json({ place });
};
