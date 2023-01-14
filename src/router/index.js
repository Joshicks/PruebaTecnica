import { createRouter, createWebHistory } from "vue-router";
import Registro from "@/views/RegistroView.vue";
import Login from "@/views/LoginView.vue";
import Home from "@/views/HomeView.vue";
const routes = [{
        path: "/",
        alias: "/registro",
        name: "registro",
        component: Registro,
    },
    {
        path: "/login",
        alias: "/login",
        name: "login",
        component: Login,
    },
    {
        path: "/home",
        alias: "/home",
        name: "home",
        component: Home,
    }
]
const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});
export default router;