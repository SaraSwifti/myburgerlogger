
// Import the ORM to create functions that will interact with the database.
const orm = require("../config/orm.js");

const burger = {
    all(cb) {
        orm.all("burgers", (res) => cb(res));
    },
    create(column, value, cb) {
        orm.create("burgers", column, value, (res) => cb(res));
    },

    update(value, condition, cb) {
        orm.update("burgers", "devour", value, condition, (res) => cb(res));
    },
    delete(condition, cb) {
        orm.delete("burgers", condition, (res) => cb(res));
    }
};

module.exports = burger;