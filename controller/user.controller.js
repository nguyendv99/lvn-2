const db = require('./../model/db.js')
const jwt = require('jsonwebtoken')
const config = require('./../config')
var listToken = {}

exports.login = (req, res) => {
    var username = req.body.username;
    var password = req.body.password;

    // Kiểm tra tài khoản có tồn tại hay không
    sql = "SELECT * FROM user WHERE username = ? AND password = ?"
    db.query(sql, [username, password], (err, user) => {
        if (err) throw err;
        if (user.length > 0) {
            // Tạo token cho user
            let token = jwt.sign({
                username: user[0].username,
            }, config.secret, {
                expiresIn: config.tokenLife,
            })

            // Thêm token vào danh sách

            listToken[user[0].username] = token

            // Trả về thông tin người dùng và token

            return res.json({
                username: user[0].username,
                token: token
            })
        } else {
            return res.json("Đăng nhập không thành công")
        }

    })

}

exports.checkLogin = (req, res, next) => {

    try {
        // Kiểm tra token mà người dùng gửi lên có tồn tại hay không
        var token = req.headers.token;
        const data = jwt.verify(token, config.secret)
        if (data) {
            var username = data.username
            // Kiểm tra tính duy nhất của token, người dùng chỉ có thể đăng nhập trên 1 thiết bị
            if (listToken[username] === token) {
                next()
            } else {
                res.send("bạn cần đăng nhập")
            }
        }
    } catch (error) {
        res.send("bạn cần đăng nhập")
    }

}


exports.checkAdmin = (req, res, next) => {
    try {
        // Kiểm tra token mà người dùng gửi lên có tồn tại hay không
        var token = req.headers.token;
        const data = jwt.verify(token, config.secret)
        if (data) {
            var username = data.username
            // Kiểm tra tính duy nhất của token, người dùng chỉ có thể đăng nhập trên 1 thiết bị
            if (listToken[username] === token) {
                // Kiểm tra level người dùng
                sql = 'SELECT * FROM user WHERE username = ? AND level = ?';
                db.query(sql, [username, 1], (err, user) => {
                    if (user.length > 0) {
                        next()
                    } else {
                        res.send("Bạn không có quyền")
                    }
                })
            } else {
                res.send("bạn cần đăng nhập")
            }
        }
    } catch (error) {
        res.send("bạn cần đăng nhập")
    }
}
