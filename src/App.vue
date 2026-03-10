<template>
  <div class="min-h-screen bg-gray-100">
    <nav class="bg-white shadow-md px-6 py-4 flex gap-6 items-center">
      <span class="font-bold text-xl text-blue-600">Solutiah</span>
      <RouterLink
        to="/sucursales"
        class="text-gray-600 hover:text-blue-600 font-medium transition-colors"
        active-class="text-blue-600 border-b-2 border-blue-600"
      >
        Sucursales
      </RouterLink>
      <RouterLink
        to="/empleados"
        class="text-gray-600 hover:text-blue-600 font-medium transition-colors"
        active-class="text-blue-600 border-b-2 border-blue-600"
      >
        Empleados
      </RouterLink>
    </nav>
    <main class="p-6">
      <RouterView />
    </main>
    <Toast />
    <ConfirmDialog />
  </div>
</template>

<script setup lang="ts">
import Toast from 'primevue/toast'
import ConfirmDialog from 'primevue/confirmdialog'
</script>
