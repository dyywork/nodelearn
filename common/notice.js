
/*module.exports = {
    USERHAVE:function (res) {
      if (res){
        return "添加成功！";
      }else {
        return '用户已存在！';
      }
    }
  }*/
const fail = 0
const success = 1

export function EORROR(res) {
    res.json({
        status: fail,
        msg: '未知异常，请联系管理员'
    })
}export function USERHAVE(res) {
    if (res){
        return "添加成功！";
    }else {
        return '用户已存在！';
    }
}

export function NOROLE() {
    return {
        status: fail,
        msg: '角色不存在！'
    }
}
export function NOUSER() {
    return {
        status: fail,
        msg: '用户不存在！'
    }
}

export function OPERATION() {
    return {
        status: success,
        msg: '操作成功！'
    }
}
