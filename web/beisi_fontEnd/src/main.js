import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import piniaPluginPersistedState from 'pinia-plugin-persistedstate'
import {createPinia} from 'pinia'
const app = createApp(App)
const pinia = createPinia()
pinia.use(piniaPluginPersistedState)
for(const [key,component] of Object.entries(ElementPlusIconsVue)){
    app.component(key,component)
}

app
.use(pinia)
.mount('#app')