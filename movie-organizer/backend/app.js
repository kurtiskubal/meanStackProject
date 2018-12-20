// J822e06vk4RWhvnG

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const Movie = require('./models/movie');

const app = express();

mongoose.connect("mongodb+srv://kurt:J822e06vk4RWhvnG@cluster0-ij3hq.mongodb.net/node-angular?retryWrites=true")
  .then(() => {
    console.log('Connected to database!');
  })
  .catch(() => {
    console.log('Connection failed!');
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});

app.post("/movies", (req, res, next) => {
  const movie = new Movie({
    title: req.body.title,
    releaseDate: req.body.releaseDate,
    imagePath: req.body.imagePath
  });
  movie.save().then(createdMovie => {
    res.status(201).json({
      message: "Movie added successfully",
      movieId: createdMovie._id
    });
  });
});

app.get("/movies", (req, res, next) => {
  Movie.find().then(videos => {
    res.status(200).json({
      message: "Movies fetched successfully!",
      movies: videos
    });
  });
});

app.delete("/movies/", (req, res, next) => {
  Movie.deleteOne({ _id: req.params.id }).then(result => {
    console.log(result);
    res.status(200).json({ message: "Movie deleted!" });
  });
});

module.exports = app;