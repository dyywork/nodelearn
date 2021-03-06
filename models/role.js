/**
 * 角色类
 */

import { sequelize, Sequelize} from '../config/db'

export default sequelize.define("role", {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false, //非空
        autoIncrement: true, //自动递增
        primaryKey: true //主键
    },
    roleName: {
        type: Sequelize.STRING,
        field: "role_name",
        comment: "角色名称"
    }
}, {
    underscored: true,
    timestamps: false,
    freezeTableName: true
}, {
    underscored: true, //额外字段以下划线来分割
    // createdAt: "created_at",
    // updatedAt: "updated_at",
    timestamps: false, //取消默认生成的createdAt、updatedAt字段
    freezeTableName: true, // Model 对应的表名将与model名相同
    comment: "角色表"
})
