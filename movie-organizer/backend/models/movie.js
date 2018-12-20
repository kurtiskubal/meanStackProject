const mongoose = require('mongoose');

const movieSchema = mongoose.Schema({
    title: { type: String, require: true },
    releaseDate: { type: String, require: true },
    imagePath: { type: String, require: true }
})

module.exports = mongoose.model('Movie', movieSchema);
