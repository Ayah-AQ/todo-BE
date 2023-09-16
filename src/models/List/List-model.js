"use strict";

const taskModel = (sequelize, DataTypes) =>
  sequelize.define("tasks", {
    taskText: { type: DataTypes.TEXT },
    assignee: { type: DataTypes.STRING },
    difficulty: { type: DataTypes.TEXT },
    complete: { type: DataTypes.BOOLEAN },
  }
  );

module.exports = taskModel;
