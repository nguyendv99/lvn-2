const db = require('./../model/db.js')

exports.getAll = (req, res) => {
    var sql = 'SELECT * FROM test'
    db.query(sql, (err, data) => {
        if(err) throw err;
        res.send(data)
    })
    
}

exports.getById = (req, res) => {
    var test_id = req.params.TestId;
    var sql = 'SELECT * FROM test WHERE test_id = ?'
    db.query(sql, test_id, (err, data) => {
        if(err) throw err;
        res.send(data)
    })
}
exports.add = (req, res) => {
    var test = req.body;
    var sql = 'INSERT INTO test SET ?';
    db.query(sql, [test], (err, data) => {
        if(err) throw err;
        console.log(data);
        res.send("Thêm thành công")
    })
}
exports.update = (req, res) => {
    var test_id = req.params.TestId
    var test = req.body;
    sql = 'UPDATE test SET ? WHERE test_id = ?'
    db.query(sql, [test, test_id], (err, data) => {
        if(err) throw err;
        res.send("Cập nhật thành công")
    })
    
}

exports.deleteAll = (req, res) => {
    var sql = 'DELETE FROM test'
    db.query(sql, (err, data) => {
        if(err) throw err;
        res.send("Đã xóa tất cả bài kiểm tra")
    })
    
}

exports.deleteById = (req, res) => {
    var test_id = req.params.TestId
    var sql = 'DELETE FROM test WHERE test_id = ?'
    db.query(sql, test_id, (err, data) => {
        if(err) throw err;
        res.send("Đã xóa bài kiểm tra")
    })
}