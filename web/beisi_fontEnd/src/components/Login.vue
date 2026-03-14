<script setup>
import { ref, defineEmits, defineProps, computed } from 'vue'
import { useUserStore } from '@/stores/user'
import { ElMessage } from 'element-plus'

const emits = defineEmits(['update:visible', 'login-success'])
const props = defineProps({
    visible: { type: Boolean, default: false }
})

const visible = computed({
    get: () => props.visible,
    set: (v) => emits('update:visible', v)
})

const userStore = useUserStore()

const formRef = ref(null)
const form = ref({ account: '', password: '' })
const rules = {
    account: [{ required: true, message: '请输入账号', trigger: 'blur' }],
    password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
}

const submit = async () => {
    if (!formRef.value) return
    formRef.value.validate(async (valid) => {
        if (valid) {
            const res = await userStore.login(form.value.account, form.value.password)
            if(res){
                emits('login-success')
                visible.value = false
            }
        }
    })
}

const close = () => { visible.value = false }
</script>

<template>
    <teleport to="body">
        <el-dialog :model-value="visible" title="登录" @close="close">
            <el-form ref="formRef" :model="form" :rules="rules" label-width="70px">
                <el-form-item label="账号" prop="account">
                    <el-input v-model="form.account" autocomplete="off" />
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model="form.password" type="password" autocomplete="off" />
                </el-form-item>
            </el-form>
            <template #footer>
                <el-button @click="close">取 消</el-button>
                <el-button type="primary" @click="submit">登 录</el-button>
            </template>
        </el-dialog>
    </teleport>
</template>

<style scoped></style>