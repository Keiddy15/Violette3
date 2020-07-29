import Vue from 'vue'
import VueRouter from 'vue-router'
import Form from '../views/Form.vue'
import FinishedForm from '../views/FinishedForm.vue'
import Login from '../views/Login.vue'
import Admin from '../views/Admin.vue'
import Register from '../views/Register.vue'

Vue.use(VueRouter);

const routes = [
    {
        path: '*',
        redirect: '/formulario'
    },
    {
        path: '/',
        redirect: '/formulario'
    },
    {
        path: '/formulario',
        name: 'Form',
        components: {main: Form}
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
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
});

export default router