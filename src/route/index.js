import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter);
/**import TodoLogin from '../components/TodoLogin'
import TodoContents from '../components/TodoContents' **/
import TodoMain2 from '../components/TodoMain2'
import TodoMain from '../components/TodoMain'
const router = new VueRouter({
mode: 'history',
routes: [
{ path: '/', component: TodoMain },    
{ path: '/todo', component: TodoMain2 },
{ path: '/main', component: TodoMain },
{ path: '*', component: TodoMain }  
/**{ path: '/', component: TodoMain },
{ path: '/todo', component: TodoMain },
{ path: '*', component: TodoMain } **/
]
})
export default router