
const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    task: {
        type: String,
        reuired: true
    },
    category: {
        type: String,
        reuired: true
    },
    time: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    }
});

const task = mongoose.model('task', taskSchema);

module.exports = task;

