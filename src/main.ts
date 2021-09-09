import { createApp } from 'vue'
import { store, key } from './store'
import router from "./router";
// 引入Element Plus
import ElementPlus from 'element-plus'
import '../node_modules/element-plus/lib/theme-chalk/index.css'
import App from './App.vue'
import './index.css'



const app = createApp(App)
// vuex
app.use(store, key)
// router
app.use(router)
// element-plus
app.use(ElementPlus)
app.mount('#app')