'use strict';

const userModel = require('../auth/models/users.js');
const { Sequelize, DataTypes } = require('sequelize');
const taskModel = require('../models/List/List-model.js');
const Collection = require('./collection.js');


const DATABASE_URL = process.env.DATABASE_URL || 'sqlite:memory;';

const sequelize = new Sequelize(DATABASE_URL, { logging: false });

const user = userModel(sequelize, DataTypes);
const task = taskModel(sequelize, DataTypes);

const taskCollection = new Collection(task);
const userCollection = new Collection(user);

module.exports = {
  db: sequelize,
  userCollection: userCollection,
  task: taskCollection,
  users: user,
}
