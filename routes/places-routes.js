const express = require("express");

const placesControllers = require("../controllers/places-controllers");
const router = express.Router();

// specify the path, then middleware function
router.get("/user/:uid", placesControllers.getPlacesByUID);

router.get("/:pid", placesControllers.getPlaceByPID);

router.post("/", (req, res, next) => {
  res.json({});
});

// router.patch("/:pid",(req,res,next)=>{
//     res.json({})
// });

// router.delete("/:pid",(req,res,next)=>{
//     res.json({})
// });

module.exports = router;
