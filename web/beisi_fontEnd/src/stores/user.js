import {defineStore} from 'pinia'
import {ref,reactive} from 'vue'
export const useUserStore = defineStore('user',()=>{
    const isLogin = ref(false)
    const userInfo = reactive({
        userName:"未登录",
        avatar:"",
        token,
        refToken
    })

    const login = (userName,passWord)=>{

    }

    const logOut = ()=>{

    }

    return{
        isLogin,
        userInfo,
        logOut,
        login
    }
},{
    persist:true
})