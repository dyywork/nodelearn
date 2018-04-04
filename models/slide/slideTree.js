/*
* 侧边栏
* */
module.exports=function (sequelize, DataTypes) {
  return sequelize.define("slidetree",{
    id:{
      type: DataTypes.INTEGER,
      allowNull:false,
      autoIncrement:true,
      primaryKey:true
    },
    maintitle:{
      type:DataTypes.STRING,
      allowNull:false
    },
    parentshow:{
      type:DataTypes.INTEGER,
      allowNull:false
    }
  },{
    underscored:true,
    timestamps:false,
    freezeTableName:true,
    classMethods:classMethods,
    comment:"侧边栏信息"
  })
}

const classMethods = {
  getAllTree:function (options) {
    return this.findAll(options)
  },
}