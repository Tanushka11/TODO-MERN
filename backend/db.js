/*
title: string
desc: string
completed: boolean
*/
const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://Hey:Hey@cluster0.qhbkyhm.mongodb.net/todos")
const todoSchema = mongoose.Schema({
    title: String,
    description: String,
    completed: Boolean
})
const todo = mongoose.model('todos',todoSchema)

module.exports = {
    todo
}
