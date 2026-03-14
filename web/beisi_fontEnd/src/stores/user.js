import { defineStore } from 'pinia'
import { ref, reactive } from 'vue'
export const useUserStore = defineStore('user', () => {
    const isLogin = ref(false)
    const userInfo = reactive({
        userName: "未登录",
        avatar: "",
        token: '',
        refToken: ''
    })
    const verifyData = async (account, passWord) => {
            const user = await fetch(`http://localhost:3000/users/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ account, passWord })
            })
            const data = await user.json()
            if (!user.ok) {
                const msg = data?.message || `请求失败: ${user.status}`
                ElMessage.error(msg || '登录失败')
                return false
            }
            const payload = data?.data?.[0] || {}
            userInfo.token = payload.token || ''
            userInfo.refToken = payload.refToken || ''
            return true
    }
    const getProfile = async () => {
        const profile = await fetch(`http://localhost:3000/users`, {
            headers: {
                'Authorization': `Bearer ${userInfo.token}`
            }
        })
        const data = await profile.json()
        if (
            profile.ok &&
            data?.data[0]
        ) {
            const userProfile = data.data[0]
            userInfo.userName = userProfile.userName || userInfo.userName
            userInfo.avatar = userProfile.avatar || userInfo.avatar
            return true
        }
        return false
    }
    const login = async (account, passWord) => {
        const isPass = await verifyData(account, passWord)
        const isGet = await getProfile()
        if(isPass&&isGet){
            isLogin.value = true
            ElMessage.success('登录成功')
            return true
        }
        return false
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