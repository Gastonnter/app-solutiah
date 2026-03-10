import { createRouter, createWebHistory } from 'vue-router'
import SucursalesView from '@/views/SucursalesView.vue'
import EmpleadosView from '@/views/EmpleadosView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/sucursales',
    },
    {
      path: '/sucursales',
      name: 'sucursales',
      component: SucursalesView,
    },
    {
      path: '/empleados',
      name: 'empleados',
      component: EmpleadosView,
    },
  ],
})

export default router
