import {defineStore} from 'pinia'
import {ref,reactive} from 'vue'
export const useUserStore = defineStore('user',()=>{
    const isLogin = ref(false)
    const userInfo = reactive({
        userName: "未登录",
        avatar: "",
        token: '',
        refToken: ''
    })

    const login = (account, passWord) => {
        
    }

    const logOut = () => {
        isLogin.value = false
        userInfo.userName = '未登录'
        userInfo.token = ''
        userInfo.refToken = ''
    }

    return {
        isLogin,
        userInfo,
        logOut,
        login
    }
}, {
    persist: true
})