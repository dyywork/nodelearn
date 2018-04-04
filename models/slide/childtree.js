module.exports=function (sequelize,DataTypes) {
  return sequelize.define('childtree',{
    subid:{
      type:DataTypes.INTEGER,
      allowNull:false,
      autoIncrement:true,
      primaryKey:true
    },
    title:{
      type:DataTypes.STRING,
      allowNull:false
    },
    parentid:{
      type:DataTypes.INTEGER,
      allowNull:false
    },
    baseurl:{
      type:DataTypes.STRING,
      allowNull:false
    },
    show:{
      type:DataTypes.INTEGER,
      allowNull:false
    }
  },{
    underscored:true,
    timestamps:false,
    freezeTableName:true,
    classMethods:classMethods,
    comment:'slideChild'
  })
}

const classMethods = {
  getAllTree:function (options) {
    return this.findAll(options);
  }
}

