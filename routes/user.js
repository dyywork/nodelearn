//const express = require('express');
import express from 'express'
const router = express.Router();

const { sequelize } = require("../config/db");
const User = sequelize.import("../models/user");
const Address = sequelize.import("../models/address");
const LoginInfo = sequelize.import("../models/loginInfo");
//const notice = require('../common/notice');
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
  User.getUserById(req.params.id).then(function (result) {
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

  var likeSelect = {
    username: {
      $like: '%' + req.query.username + '%'
    },
    password: {
      $like: "%" + req.query.password + "%"
    }
  };
  if (req.query.username === '') {
    delete likeSelect.username;
  }else if (req.query.password === '') {
    delete likeSelect.password;
  }
  User.getAllUser({
    where: {
      $or: likeSelect
    },
    limit: parseInt(req.query.limit) || 10, //默认查询10条
    offset: (parseInt(req.query.offset)-1) * parseInt(req.query.limit) || 0 //默认查询第一页

  }).then(function (result) {
    result.limit = parseInt(req.query.limit);
    result.offset = parseInt(req.query.offset);
    res.json({
      status: 1,
      data: result
    })
  }).catch(next);
})

/*router.get('/', function(req, res, next) {
 User.getUsers({
 limit: parseInt(req.query.limit) || 10, //默认查询10条
 offset: parseInt(req.query.offset) || 0 //默认查询第一页
 }).then(function(result) {

 res.json({
 status: 1,
 data: result
 });
 }).catch(next);
 });*/

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
  User.updateUserById(req.body, req.params.id).then(function (result) {
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
  User.deleteById(req.params.id).then(function (result) {
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