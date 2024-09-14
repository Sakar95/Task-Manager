const express = require("express");
const router = express.Router();

const{
    createTask,
    editTask,
    deleteTask
} = require("../controllers/Task");

router.post("/create-task",createTask)

router.put("/edit-task/:id",editTask)

router.delete("/delete-task/:id",deleteTask)

module.exports = router