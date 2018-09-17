import express from 'express'
const router = express.Router();

import User from '../models/user'
import Address from '../models/address'
import LoginInfo from '../models/loginInfo'

/**
 * 获取所有地址（包括用户信息，不包括用户的话去掉include即可）
 */
router.get("/", function(req, res, next) {
    Address.findAll({
        include: [{
            model: User
        }]
    }).then(function(addresses) {
        res.json({
            status: 1,
            data: addresses
        });
    }).catch(next);
});

/**
 * 新增一个地址
 */
router.post("/", function(req, res, next) {
    console.log(req.body);
    var user = User.build({
        id: req.query.uid //改地址关联的用户id
    });
    user.createAddress(req.body).then(function(result) {
        res.json({
            status: 1,
            data: result
        });
    }).catch(next);
});

/**
 * 获取当前地址关联的用户信息
 */
router.get("/:id/user", function(req, res, next) {
    Address.findOne({
        where: {
            id: req.params.id
        },
        include: [User]
    }).then(function(address) {
        res.json({
            status: 1,
            data: address
        });
    }).catch(next);
});

/**
 * 删除一个地址
 */
router.get("/:id/del", function(req, res, next) {
    Address.destroy({
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
 * 更新某个地址
 */
router.post("/:id/update", function(req, res, next) {
    Address.update(req.body, {
        where: {
            id: req.params.id
        }
    }).then(function(address) {
        res.json({
            status: 1,
            data: address
        });
    }).catch(next);
});

module.exports = router;