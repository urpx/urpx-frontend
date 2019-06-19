import Vue from 'vue'
import Router from 'vue-router'


import basicFormat from './components/basicFormat.vue'
import homeContent from './components/homeContent.vue'
import boardContent from './components/boardContent.vue'
import expenseContent from './components/expenseContent.vue'
import requestContent from './components/requestContent.vue'
import loginContent from './components/loginContent.vue'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: homeContent
    },
    {
      path: '/board',
      name: 'board',
      component: boardContent
    },
	{
	  path : '/request',
	  name : 'request',
	  component : requestContent
	},
    {
      path: '/expense',
      name: 'expense',
	  component : expenseContent
    },
	{
	  path : '/login',
	  name : 'login',
	  component : loginContent
	}
	  
	  
  ]
})
