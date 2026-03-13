import { Injectable,HttpException } from '@nestjs/common';
import {AuthService} from '@common'

@Injectable()
export class UsersService {
  constructor(
    private readonly authService: AuthService
  ){}
  async create(user) {
    const passPort = [{userId:1,account:"ycx123",passWord:"123456",avatar:"https://www.keaitupian.cn/cjpic/frombd/1/253/3663778712/1545220977.jpg"}]
    const {account,passWord} = user
    const userInfo = passPort.filter(u=>u.account == account)
    if(!account?.trim() || !passWord?.trim()) {
      if(!account?.trim()){
        throw new HttpException("账号不能为空",400)
      }else{
        throw new HttpException("密码不能为空",400)
      }
    }
    if(account.trim() !== userInfo[0].account) throw new HttpException("用户不存在",404)
    if(passWord.trim() !== userInfo[0].passWord) throw new HttpException("密码错误",401)
    if(
      account.trim() === userInfo[0].account &&
      passWord.trim() === userInfo[0].passWord
    ){
      const {token,refToken} = await this.authService.Generate(userInfo[0].userId)
      return{
        code:200,
        message:"登入成功",
        data:[{token,refToken}]
      }
    }
  }

  findOne(id: number) {
    const passPort = [{userId:1,account:"ycx123",passWord:"123456",avatar:"https://www.keaitupian.cn/cjpic/frombd/1/253/3663778712/1545220977.jpg"}]
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
