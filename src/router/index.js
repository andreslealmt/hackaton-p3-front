import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  }, 
  {
    path: '/misCuestionarios',
    name: 'MisCuestionarios',    
    component: () => import('../views/MisCuestionarios')
  },
  {
    path: '/preguntas/:id',
    name: 'Preguntas',    
    component: () => import('../views/Preguntas')
  },
  {
    path: '/detalleTest/:id',
    name: 'DetalleTest',    
    component: () => import('../views/DetalleTest')
  },
  {
    path: '/examen/:id',
    name: 'Examen',    
    component: () => import('../views/Examen')
  },
  {
    path:'/perfil',
    name:'Perfil',
    component: () => import('../views/Perfil')
  },
  {
    path:'/loggin',
    name:'Loggin',
    component: () => import('../views/Loggin')
  },
  {
    path:'/registro',
    name:'Registro',
    component: () => import('./../views/Registro')
  },
  {
    path:'/categorias',
    name:'Categorias',
    component: () => import('../views/Categorias')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
