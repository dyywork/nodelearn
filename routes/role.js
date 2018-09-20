import express from 'express'
const router = express.Router();
import { Sequelize } from '../config/db'
const Op = Sequelize.Op

import User from '../models/user'
import Role from '../models/role'

/**
 * 测试猜想
 */
/*router.get('/test',function (req, res, next) {
    User.addrole(Role,{ through: {status: 'started'}}).then(user => {
        res.json({
            status: 1,
            data: user
        })
    }).catch(next)
})*/
/**
 * 获取所有角色(不包括用户信息)
 */
router.get("/findAll", function (req, res, next) {
    Role.findAll({
        where: {
            role_name: {
                [Op.ne]: null
            }
        }
    }).then(roles => {
        res.json({
            status: 1,
            data: roles
        })
    }).catch(next)
})

/**
 * 获取所有角色（包括用户信息，不包括用户的话去掉include即可）
 */
router.get("/", function(req, res, next) {
    Role.findAll({
        include: [{
            model: User
        }]
    }).then(function(roles) {
        res.json({
            status: 1,
            data: roles
        });
    }).catch(next);
});

/**
 * 获取当前登录信息关联的用户信息
 */
router.get("/:id/user", function(req, res, next) {
    Role.findOne({
        where: {
            id: req.params.id
        },
        include: [User]
    }).then(function(role) {
        res.json({
            status: 1,
            data: role
        });
    }).catch(next);
});

/**
 * 删除
 */
router.get("/:id/del", function(req, res, next) {
    Role.destroy({
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

/**
 * 新增一个角色
 */
router.post("/", function(req, res, next) {
    Role.create(req.body).then(function(role) {
        res.json({
            status: 1,
            data: role
        })
    }).catch(next);
});

/**
 * 更新角色
 */
router.post("/:id/update", function(req, res, next) {
    Role.update(req.body, {
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

module.exports = router;