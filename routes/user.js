import express from 'express'
const router = express.Router();
import { Sequelize } from '../config/db'
const Op = Sequelize.Op

import { getAllUser, getUserById, deleteById, getUsers, updateUserById } from '../sql/userService'
import User from '../models/user'
import LoginInfo from '../models/loginInfo'
import { USERHAVE } from '../common/notice'


/*登录接口*/

router.post('/login', function (req, res, next) {
  User.findOne({
    where: {
      username: req.body.userName,
      password: req.body.password
    }
  }).then(function (login) {
    if (login !== null) {
      res.json({
        status: '1',
        // type:req.body.type,
        currentAuthority: 'admin'
      })
    } else {
      res.json({
        status: 2,
        data: login,
        msg: "用户名或密码错误"
      })
    }
  })
})

/**
 * 获取单个用户
 */

router.get('/:id', function (req, res, next) {
  getUserById(req.params.id).then(function (result) {
    res.json({
      status: 1,
      data: result
    });
  }).catch(next);
});


/**
 * 获取所有用户
 */

router.get('/', function (req, res, next) {
  getAllUser({
    where: {
        [Op.and]: [
            {
                username: {
                    [Op.like]: '%' + req.query.username + '%'
                }
            },
            {
                lastname: {
                    [Op.like]: '%' + req.query.lastname + '%'
                }
            }
        ]
    },
    limit: parseInt(req.query.size) || 10, //默认查询10条
    offset: (parseInt(req.query.page)-1) * parseInt(req.query.size) || 0 //默认查询第一页
  }).then((result) => {
    result.size = parseInt(req.query.size);
    result.page = parseInt(req.query.page);
    res.json({
      status: 1,
      data: result
    })
  }).catch(next);
})

/**
 * 新增
 */

router.post('/', function (req, res, next) {
  User.findOrCreate({
    where: {
      username: req.body.username
    }
    , defaults: req.body
  }).spread(function (user, created) {
    if (created) {
      user.createRole({
        roleName: req.body.roleName
      });
      return USERHAVE(created);
    } else {
      return USERHAVE(created);
    }
  }).then(function (result) {
    res.json({
      status: res.statusCode,
      data: null,
      msg: result,

    });
  }).catch(next);
});

/*router.post('/', function (req, res, next) {
 User.create(req.body).then(function (user) {
 return user.createRole({
 roleName: req.body.roleName
 });
 }).then(function (result) {
 res.json({
 status: 1,
 data: result
 });
 }).catch(next);
 });*/


/**
 * 修改
 */
router.post('/:id/update', function (req, res, next) {
  updateUserById(req.body, req.params.id).then(function (result) {
    res.json({
      status: 1,
      data: result
    });
  }).catch(next);
});

/**
 * 删除
 */
router.get('/:id/del', function (req, res, next) {
  deleteById(req.params.id).then(function (result) {
    res.json({
      status: 1,
      data: result
    });
  }).catch(next);
});

/**
 * 查找用户的所有地址
 */
router.get("/:id/addresses", function (req, res, next) {
  var user = User.build({
    id: req.params.id
  });
  user.getAddresses({
    // limit: 1,
    // offset: 1
    order: "id desc" //按照id倒排
  }).then(function (addresses) {
    res.json({
      status: 1,
      data: addresses
    });
  }).catch(next);
});

/**
 * 查询用户的登录信息
 */
router.get("/:id/logininfo", function (req, res, next) {
  User.findOne({
    where: {
      id: req.params.id
    },
    include: {
      model: LoginInfo
    }
  }).then(function (user) {
    res.json({
      status: 1,
      data: user
    });
  }).catch(next);
});

/**
 * 查询当前用户所有的角色
 */
router.get("/:id/roles", function (req, res, next) {
  var user = User.build({
    id: req.params.id
  });
  user.getUserRoles({
    order: "id desc"
  }).then(function (userRoles) {
    res.json({
      status: 1,
      data: userRoles
    });
  }).catch(next);
});

module.exports = router;