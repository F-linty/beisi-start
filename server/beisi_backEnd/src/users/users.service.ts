import { Injectable } from '@nestjs/common';


@Injectable()
export class UsersService {

  create(user) {
    const passPort = [{userId:1,account:"ycx123",passWord:"123456"}]
    const {account,passWord} = user
    const res = {
      code:200,
      message:"登入成功",
      data:{token:""}
    }
    if(!account?.trim() || !passWord?.trim()) {
      res.code = 400
      if(!account?.trim()){
        res.message = "账号不能为空"
      }else{
        res.message = "密码不能为空"
      }
      return res
    }
    if(
      account.trim() === passPort[0].account &&
      passWord.trim() === passPort[0].passWord 
    ){
      res.code = 200
      res.message = "登录成功"
      res.data.token = ""
    }else{
      if(account.trim() !== passPort[0].account){
        res.code = 404
        res.message = "用户不存在"
      }else{
        res.code = 401
        res.message = "密码错误"
      }
    }
    return res
  }

  findOne(id: number) {
    const passPort = [{userId:1,account:"ycx123",passWord:"123456"}]
    const res = {
      code:200,
      message:"查询成功",
    }
    const user = passPort.filter(u=>u.userId == id)
    if(!user.length){
      
    }
  }

}
