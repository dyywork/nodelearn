import express from 'express'
const router = express.Router();

import childtree from '../../models/slide/childtree'

/*查询*/
router.get('/:id', function (req, res, next) {
  childtree.getAllTree({
    parentid:req.params.id
  }).then(function (result) {
    res.json({
      status: 1,
      data: result
    });
  }).catch(next)
})
/*新增*/
router.post('/', function(req, res, next) {
  childtree.create(req.body).then(function(childtree) {
    res.json({
      status: 1,
      data: childtree
    });
  }).catch(next);
});
/*修改*/
router.post("/:id/update", function(req, res, next) {
  childtree.update(req.body, {
    where: {
      subid: req.params.id
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
  childtree.destroy({
    where: {
      subid: req.params.id
    }
  }).then(function(result) {
    res.json({
      status: 1,
      data: result
    });
  }).catch(next);
});


module.exports = router;