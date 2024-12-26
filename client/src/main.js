import { createApp } from 'vue'
import router from './routes/route'
import '@/assets/css/style.css'
import '@/assets/css/reset.css'
import App from './App.vue'
import '@fortawesome/fontawesome-free/css/all.min.css';
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap.bundle';
import 'vue3-toastify/dist/index.css';

router.beforeEach((to, from, next) => {
    document.title = to.meta.title || 'Default Title';
    next();
})  

const app = createApp(App)

app.use(router).mount('#app')
