const { DataTypes } = require("sequelize");
const db = require("../config/db");

const User = db.define(
    "User", {
        // Model attributes are defined here
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            // allowNull defaults to true
        },
    }, {
        // Other model options go here
    }
);

User.sync();

module.exports = User;