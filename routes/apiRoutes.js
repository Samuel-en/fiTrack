const router = require("express").Router();
const db = require("../models");


//  add totalDuration by aggregate function 
app.get("/api/workouts", (req, res) => {
  db.Workout.aggregate([
    {
      $addFields: {
        totalDuration: { $sum: "$exercises.duration" },
      },
    },
  ])
    .then((workout) => {
      res.json(workout);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

// Create a new workout
app.post("/api/workouts", ({ body }, res) => {
    console.log(body);
    db.Workout.create({})
      .then((Workout) => {
        res.json(Workout);
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  });
// put route to add excersize to current work out 
  app.put("/api/workouts/:id", (req, res) => {
    db.Workout.findByIdAndUpdate(
      req.params.id,
      { $push: { exercises: req.body } },
      { new: true }
    )
      .then((workout) => {
        res.json(workout);
      })
      .catch((err) => {
        console.log(err);
      });
  });
