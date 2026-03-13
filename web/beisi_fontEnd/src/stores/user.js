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

    const login = async (account, passWord) => {
        // 简单校验
        if(!account || !account.trim()) throw new Error('账号不能为空')
        if(!passWord || !passWord.trim()) throw new Error('密码不能为空')

        const base = window.__BASE_API__ || 'http://localhost:3000'
        const url = `${base}/users/login`

        const resp = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ account, passWord })
        })

        let data
        try{
            data = await resp.json()
        }catch(e){
            throw new Error('后端返回数据解析失败')
        }

        if(!resp.ok){
            // Nest 抛出 HttpException 时通常返回 { statusCode, message }
            const msg = data?.message || (Array.isArray(data?.message) ? data.message[0] : '') || '登录失败'
            throw new Error(msg || '登录失败')
        }

        // 兼容后端成功格式 { code:200, message:'', data: [...] }
        if(data && data.code === 200){
            isLogin.value = true
            userInfo.userName = account
            // 取 token（如果后端返回）
            if(Array.isArray(data.data) && data.data[0]){
                userInfo.token = data.data[0].token || ''
            }
            return data
        }

        throw new Error(data?.message || '登录失败')
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