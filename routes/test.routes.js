module.exports = app => {
    const user = require("../controller/user.controller.js");
    const test = require("../controller/test.controller.js");

    app.get("/Test", test.getAll);
    app.get("/Test/:TestId", test.getById)
    app.post("/Test", user.checkAdmin, test.add)
    app.put("/Test/:TestId", user.checkAdmin, test.update)
    app.delete("/Test", user.checkAdmin, test.deleteAll)
    app.delete("/Test/:TestId", user.checkAdmin, test.deleteById)

};