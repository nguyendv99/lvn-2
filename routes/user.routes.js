module.exports = app => {
    const user = require("../controller/user.controller.js");

    app.post("/dang-nhap", user.login);
    app.get("/dang-nhap", function(req, res) {
        res.render('login')
    })

};