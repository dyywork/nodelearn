/**
 * 用户类
 */

import { sequelize, Sequelize } from '../config/db'

export default sequelize.define("user", {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false, //非空
        autoIncrement: true, //自动递增
        primaryKey: true //主键
    },
    username: {
        type: Sequelize.STRING,
        field: "username",
        allowNull: false
    },
    lastname: {
        type: Sequelize.STRING,
        field: "last_name",
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    active: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
    }
}, {
    underscored: true, //额外字段以下划线来分割
    timestamps: true, //取消默认生成的createdAt、updatedAt字段
    freezeTableName: true, // Model 对应的表名将与model名相同
    createdAt: "created_at",
    updatedAt: "updated_at",
    //静态方法，即user模型自带的方法
    classMethods: classMethods,
    comment: "用户信息类",
    // paranoid: true      //虚拟删除
    //实例方法
    // instanceMethods: instanceMethods
})

//静态方法
const classMethods = {
  getAllUser: function (options) {
    return this.findAndCountAll(options)
  },
  //根据id查询
  getUserById: function (id) {
    return this.findById(id);
  },
  //获取所有
  getUsers: function (options) {
    return this.findAll(options);
  },
  //根据id更新数据
  updateUserById: function (values, id) {
    return this.update(values, {
      where: {
        id: id
      }
    });
  },
  //根据id删除数据
  deleteById: function (id) {
    return this.destroy({
      where: {
        id: id
      }
    })
  }
}