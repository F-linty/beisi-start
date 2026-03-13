import { Injectable,HttpException } from '@nestjs/common';


@Injectable()
export class UsersService {

  create(user) {
    const passPort = [{userId:1,account:"ycx123",passWord:"123456"}]
    const {account,passWord} = user
    if(!account?.trim() || !passWord?.trim()) {
      if(!account?.trim()){
        throw new HttpException("账号不能为空",400)
      }else{
        throw new HttpException("密码不能为空",400)
      }
    }
    if(account.trim() !== passPort[0].account) throw new HttpException("用户不存在",404)
    if(passWord.trim() !== passPort[0].passWord) throw new HttpException("密码错误",401)
    if(
      account.trim() === passPort[0].account &&
      passWord.trim() === passPort[0].passWord
    ){
      return{
        code:200,
        message:"登入成功",
        data:[{token:''}]
      }
    }
  }

  findOne(id: number) {
    const passPort = [{userId:1,account:"ycx123",passWord:"123456"}]
    const user = passPort.filter(u=>u.userId == id)
    if(!user.length){
      throw new HttpException("用户不存在",404)
    }
    return {
      code:200,
      message:"查询成功",
      data:user
    }
  }

}
