var express = require('express');
var router = express.Router();

/* GET mahasiswa listing. */
router.get('/mahasiswa', function (req, res, next) {
  res.locals.connection.query('SELECT * from tbl_mahasiswa', function (error, results, fields) {
    if (error) throw error;
    res.send(JSON.stringify(results));
  });
});

// GET Mahasiswa by id
router.get('/mahasiswa/:id', function (req, res, next) {
  console.log(req);
  res.locals.connection.query('select * from tbl_mahasiswa where id=? limit 1', [req.params.id], function (error, results, fields) {
    if (error) throw error;
    res.end(JSON.stringify(results));
  });
});

//rest api to create a new record into mysql database
router.post('/mahasiswa', function (req, res, next) {
  var postData = req.body;
  res.locals.connection.query('INSERT INTO tbl_mahasiswa SET ?', postData,  function (error, results, fields) {
    if (error) throw error;
    res.end(JSON.stringify(results));
  });
});

//rest api to update record into mysql database
router.put('/mahasiswa/:id', function (req, res, next) {
  res.locals.connection.query('UPDATE `tbl_mahasiswa` SET `nim`=?,`nama`=?,`alamat`=?,`fakultas`=?,`jurusan`=? where `id`=?', [req.body.nim, req.body.name, req.body.alamat, req.body.fakultas, req.body.jurusan, req.params.id], function (error, results, fields) {
    if (error) throw error;
    res.end(JSON.stringify(results));
  });
});

//rest api to delete record from mysql database
router.delete('/mahasiswa', function (req, res, next) {
  console.log(req.body);
  res.locals.connection.query('DELETE FROM `tbl_mahasiswa` WHERE `id`=?', [req.body.id], function (error, results, fields) {
    if (error) throw error;
    res.end('Record has been deleted!');
  });
});
module.exports = router;
