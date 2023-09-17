const express = require("express");
const listRouter = express.Router();

const { task } = require("../models/index");
const { userCollection } = require("../models/index");

const bearerAuth = require("../auth/middleware/bearer");
const acl = require("../auth/middleware/acl");

listRouter.get("/todo", bearerAuth, getTask);
listRouter.post("/todo", bearerAuth, createTask);
listRouter.put("/todo/:id", bearerAuth, acl("update"), updateTask);
listRouter.delete("/todo/:id", bearerAuth, acl("delete"), deleteTask);

async function getTask(req, res) {
  try {
    const taskRecord = await task.get();
    res.status(200).json(taskRecord);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function createTask(req, res) {
  try {
    const taskData = req.body;
    taskData.ownerId = 1;

    const taskRecord = await task.create(taskData);
    res.status(201).json(taskRecord);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function updateTask(req, res) {
  try {
    const id = parseInt(req.params.id);
    const taskData = req.body;
    const taskRecord = await task.update(id, taskData);
    res.status(201).json(taskRecord);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function deleteTask(req, res) {
  try {
    const id = parseInt(req.params.id);
    const taskRecord = await task.delete(id);
    res.status(204).json(taskRecord);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

module.exports = listRouter;
