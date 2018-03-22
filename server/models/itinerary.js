const Sequelize = require("sequelize");
const db = require("./_db");

const Itinerary = db.define("itinerary", {
  hash: {
    type: Sequelize.STRING,
  },
});

module.exports = Itinerary;
