const db = require('./db.js')

const User = function (user) {
    this.username = user.username;
    this.password = user.password;
}


User.check = async (username, password) => {
    let sql = 'SELECT * FROM user WHERE username = ? AND password = ?'
    const data = await db.query(sql, [username, password], (err, data) => {        
        if (err) {
            console.log("error: ", err);
            return null;
        }
        return data
        console.log(data)
    })
    console.log(data)
    return data
    console.log(data.values)

    
};


module.exports = User;