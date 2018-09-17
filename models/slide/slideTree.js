/*
* 侧边栏
* */

import { sequelize, Sequelize } from '../../config/db'

export default sequelize.define("slidetree",{
    id:{
        type: Sequelize.INTEGER,
        allowNull:false,
        autoIncrement:true,
        primaryKey:true
    },
    maintitle:{
        type:Sequelize.STRING,
        allowNull:false
    },
    parentshow:{
        type:Sequelize.BOOLEAN,
        allowNull:false
    }
},{
    underscored:true,
    timestamps:false,
    freezeTableName:true,
    classMethods:classMethods,
    comment:"侧边栏信息"
})

const classMethods = {
  getAllTree:function (options) {
    return this.findAll(options)
  },
}