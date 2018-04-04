var express = require('express');
var router = express.Router();

var {sequelize} = require('../../config/db');




var childtree = sequelize.import('../../models/slide/childtree');

router.get('/', function (req, res, next) {
  childtree.getAllTree({

  }).then(function (result) {
    res.json({
      status: 1,
      data: result
    });
  }).catch(next)
})

router.post('/', function(req, res, next) {
  childtree.create(req.body).then(function(childtree) {
    res.json({
      status: 1,
      data: childtree
    });
  }).catch(next);
});


module.exports = router;