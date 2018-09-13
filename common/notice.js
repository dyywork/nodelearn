
/*module.exports = {
    USERHAVE:function (res) {
      if (res){
        return "添加成功！";
      }else {
        return '用户已存在！';
      }
    }
  }*/
export function USERHAVE(res) {
    if (res){
        return "添加成功！";
    }else {
        return '用户已存在！';
    }
}