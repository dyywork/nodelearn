var express = require('express');
var router = express.Router();

var {sequelize} = require('../../config/db');




var slideTree = sequelize.import('../../models/slide/slideTree');
var child = sequelize.import('../../models/slide/childtree');

/*查询所有*/
router.get('/', function (req, res, next) {
  slideTree.getAllTree({
    include: [{
      model: child
    }]
  }).then(function (result) {
    res.json({
      status: 1,
      data: result
    });
  }).catch(next)
})
/*新增*/

router.post('/',function (req,res,next) {
  slideTree.create(req.body).then(function (slidetree) {
   res.json({
      status: 1,
      data: slidetree
    })
  })
})

/*更新*/
router.post("/:id/update", function(req, res, next) {
  slideTree.update(req.body, {
    where: {
      id: req.params.id
    }
  }).then(function(role) {
    res.json({
      status: 1,
      data: role
    })
  }).catch(next);
});
/**
 * 删除
 */
router.get("/:id/del", function(req, res, next) {
  slideTree.destroy({
    where: {
      id: req.params.id
    }
  }).then(function(result) {
    res.json({
      status: 1,
      data: result
    });
  }).catch(next);
});

module.exports = router;