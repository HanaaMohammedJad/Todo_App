const DataTypes = require('sequelize');
const sequelize = require('../config/dbConfig');



// Define a model for todo items
const TodoItem = sequelize.define('TodoItem', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    completed: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
});

module.exports = TodoItem;