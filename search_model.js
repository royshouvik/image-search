"use strict"
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const searchSchema = new Schema({
    term: {type: 'String', required: true},
    when: { type: 'Date', default: Date.now, required: true },
});

module.exports= mongoose.model('Search', searchSchema);