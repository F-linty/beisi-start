<script setup>
import logo from '@/assets/Bes.jpg'

import { ref } from 'vue'
import {useUserStore} from '@/stores/user'
import {storeToRefs} from 'pinia'

const userStore = useUserStore()
const {isLogin,userInfo} = storeToRefs(userStore)
const loginVisible = ref(false)

import Login from './Login.vue'
function handleLoginSuccess(){
    
}
</script>

<template>
    <div class="container">
        <header>
            <div class="tabbar">
                <div class="tabbar_info">
                    <el-image style="width: 45px; height: 45px;border-radius: 12px;" :src="logo" fit="cover" />
                </div>
                <el-button 
                    v-if="!isLogin"
                    type="default"
                    circle
                    @click="loginVisible = true"
                >
                    <el-icon><User /></el-icon>
                </el-button>
                <el-dropdown v-else>
                    <span class="el-dropdown-link">
                    {{ userInfo.userName }}
                    <el-icon class="el-icon--right">
                        <arrow-down />
                    </el-icon>
                    </span>
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item><el-avatar :size="35" /></el-dropdown-item>
                        </el-dropdown-menu>
                        <el-dropdown-menu style="display: flex;justify-content: center;">
                            <el-button link>登出</el-button>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
            </div>
        </header>
        <main>内容区域</main>
        <footer>底部栏</footer>
        <Login v-model:visible="loginVisible" @login-success="handleLoginSuccess" />
    </div>
</template>
<style scoped>
    .container{
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100%;
    }
    header{
        display: flex;
        justify-content: center;
        padding-top: 10px;
        height: 10vh;
        width: 100%;
        position: fixed;
    }
    .tabbar{
        display: flex;
        align-items: center;
        padding-right: 13px;
        height: 100%;
        width: 90%;
        border-radius: 15px;
        background: rgba(255, 255, 255, 0.15);
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.2);
        box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    }
    .tabbar_info{
        display: flex;
        flex: 1;
        padding-left: 8px;
    }
    main{
        display: flex;
        justify-content: center;
        align-items: center;
        height: 650px;
        width: 100%;
        user-select: none;
        background-color: rgb(156, 196, 194);
    }
    footer{
        display: flex;
        justify-content: center;
        align-items: center;
        height: 160px;
        width: 100%;
        user-select: none;
        background-color: rgba(52, 133, 136, 0.664);
    }
</style>