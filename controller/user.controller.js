const db = require('./../model/db.js')
const jwt = require('jsonwebtoken')
const config = require('./../config')
var listToken = {}

exports.login = async (req, res) => {

    var username = req.body.username;
    var password = req.body.password;

    db.beginTransaction(function (err) {
        if (err) { throw err; }
        db.query('SELECT * FROM user WHERE username = ? AND password = ?', [username, password], function (error, results, fields) {
            if (error) {
                return connection.rollback(function () {
                    throw error;
                });
            }
            if (results.length > 0) {

                let token = jwt.sign({
                    username: results[0].username,
                }, config.secret, {
                    expiresIn: config.tokenLife,
                })

                db.query('UPDATE user SET token = ? WHERE user_id = ?', [token, results[0].user_id], function (error, results, fields) {
                    if (error) {
                        return connection.rollback(function () {
                            throw error;
                        });
                    }

                });
                return res.json({
                    username: results[0].username,
                    token: token
                })
            } else {
                return res.json("Đăng nhập không thành công")
            }

        });

    });

}

exports.checkLogin = (req, res, next) => {
    try {
        var token = req.headers.token;
        const data = jwt.verify(token, config.secret)
        if (data) {
            var username = data.username
            sql = 'SELECT * FROM user WHERE username = ?';
            console.log("token: ")
            db.query(sql, username, (err, user) => {
                console.log("token: " + user)
                if (user[0].token === token) {
                    next()
                } else {
                    res.send("bạn cần đăng nhập")
                }
            })
        }
    } catch (error) {
        res.send("bạn cần đăng nhập")
    }
}


exports.checkAdmin = (req, res, next) => {
    try {
        var token = req.headers.token;
        const data = jwt.verify(token, config.secret)
        if (data) {
            var username = data.username
            sql = 'SELECT * FROM user WHERE username = ? AND level = ?';
            console.log("token: ")
            db.query(sql, [username, 1], (err, user) => {
                console.log("token: " + user)
                if (user[0].token === token) {
                    next()
                } else {
                    res.send("bạn cần đăng nhập")
                }
            })
        }
    } catch (error) {
        res.send("bạn cần đăng nhập")
    }
}



