
import { sequelize, Sequelize} from '../../config/db'

export default sequelize.define('childtree',{
    subid:{
        type:Sequelize.INTEGER,
        allowNull:false,
        autoIncrement:true,
        primaryKey:true
    },
    title:{
        type:Sequelize.STRING,
        allowNull:false
    },
    parentid:{
        type:Sequelize.INTEGER,
        allowNull:false
    },
    baseurl:{
        type:Sequelize.STRING,
        allowNull:false
    },
    show:{
        type:Sequelize.BOOLEAN,
        allowNull:false
    }
},{
    underscored:true,
    timestamps:false,
    freezeTableName:true,
    classMethods:classMethods,
    comment:'slideChild'
})

const classMethods = {
  getAllTree:function (options) {
    return this.findAll(options);
  }
}

