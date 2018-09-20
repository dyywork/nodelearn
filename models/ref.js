/**
 * 模型关联类
 */
import { sequelize } from '../config/db'
import User from './user'
import Address from './address'
import Role from './role'
import LoginInfo from './loginInfo'
import child from './slide/childtree'
import slide from './slide/slideTree'

//建立模型之间关联关系
User.hasOne(LoginInfo);
LoginInfo.belongsTo(User);

// slide.belongsTo(Role);
slide.hasMany(child,{
  foreignKey:'parentid'
})
User.hasMany(Address, {
    foreignKey: 'user_id',
    targetKey: 'id',
    as: "Addresses" //别名，目标模型会混入到源模型后会使用该名称,存在getAddresses、setAddresses等方法
});
Address.belongsTo(User); //address想反查user必须加这个，否则只能实现user查询address

User.belongsToMany(Role, {
    through: "userRoles"
});
Role.belongsToMany(User, {
    through: 'userRoles'
});
//创建表
sequelize.sync({ force: false, match: /est$/ });
