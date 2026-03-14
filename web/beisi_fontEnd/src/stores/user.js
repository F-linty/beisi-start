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
    const verifyData = async(account,passWord) => {
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
            throw new Error(msg)
        }
        const payload = data?.data?.[0] || {}
        isLogin.value = true
        userInfo.token = payload.token || ''
        userInfo.refToken = payload.refToken || ''
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
        }
    }
    const login = async (account, passWord) => {
        try {
            await verifyData(account,passWord)
            await getProfile()
        } catch (e) {
            isLogin.value = false
            throw e
        }
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