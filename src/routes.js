import Home from './components/home/Home.vue';
import Login from './components/login/Login.vue';
import Pagamento from './components/pagamento/Pagamento.vue'


export const routes = [
    /* rotas aqui */
    { path: '/', component: Login },
    { path: '/Home',component: Home },
    { path: '/Transferencias', component: Pagamento},
  ];