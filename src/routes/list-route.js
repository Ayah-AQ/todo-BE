const express = require("express");
const listRouter = express.Router();

const { task } = require("../models/index");
const { userCollection } = require("../models/index");

const bearerAuth = require("../auth/middleware/bearer");
const acl = require("../auth/middleware/acl");

listRouter.get("/tasks", bearerAuth, getTask);
listRouter.post(
    "/tasks",
    bearerAuth,
    acl("create"),
    createTask
);
listRouter.put(
    "/tasks/:id",
    bearerAuth,
    acl("update"),
    updateTask
);
listRouter.delete(
    "/tasks/:id",
    bearerAuth,
    acl("delete"),
    deleteTask
);

async function getTask(req, res) {
    let taskRecord = await task.get();
    res.status(200).json(taskRecord);
}

async function createTask(req, res) {
    let taskData = req.body;
    taskData.ownerId = 1;

    let taskRecord = await task.create(taskData);
    res.status(201).json(taskRecord);
}
async function updateTask(req, res) {
    let id = parseInt(req.params.id);
    let taskData = req.body;
    let taskRecord = await task.update(id, taskData);
    res.status(201).json(taskRecord);
}
async function deleteTask(req, res) {
    let id = parseInt(req.params.id);
    let taskRecord = await task.delete(id);
    res.status(204).json(taskRecord);
}

module.exports = listRouter;
