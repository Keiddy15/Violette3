import Vue from 'vue'
import VueRouter from 'vue-router'
import Form from '../views/Form.vue'
import FinishedForm from '../views/FinishedForm.vue'
import Login from '../views/Login.vue'
import Admin from '../views/Admin.vue'
import Register from '../views/Register.vue'
import Welcome from "../views/Welcome";
import FormCartagena from "../views/FormCartagena";

Vue.use(VueRouter);

const routes = [
    {
        path: '*',
        redirect: '/Bienvenida'
    },
    {
        path: '/',
        redirect: '/Bienvenida'
    },
    {
        path: '/Bienvenida',
        name: 'Welcome',
        components: {main: Welcome}
    },
    {
        path: '/Agradecimientos',
        name: 'FinishedForm',
        components: {main: FinishedForm}
    },
    {
        path: '/Login',
        name: 'Login',
        components: {main: Login}
    },
    {
        path: '/Admin',
        name: 'Admin',
        components: {main: Admin}
    },
    {
        path: '/Registrar',
        name: 'Register',
        components: {main: Register}
    },
    {
        path: '/formularioCartagena',
        name: 'FormCartagena',
        components: {main: FormCartagena}
    },
    {
        path: '/formulario',
        name: 'Form',
        components: {main: Form}
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
});

export default router