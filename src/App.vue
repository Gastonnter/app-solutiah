<template>
  <div class="min-h-screen bg-slate-50">
    <!-- Navbar -->
    <nav class="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100 shadow-sm">
      <div class="mx-auto max-w-7xl px-6 h-14 flex items-center gap-8">
        <!-- Logo -->
        <div class="flex items-center gap-2.5 mr-2">
          <div
            class="flex h-7 w-7 items-center justify-center rounded-lg bg-linear-to-br from-emerald-400 to-teal-600 shadow-sm"
          >
            <i class="pi pi-building text-white" style="font-size: 0.75rem" />
          </div>
          <span class="font-bold text-slate-800 tracking-tight text-base">Solutiah</span>
        </div>

        <!-- Divider vertical -->
        <div class="h-5 w-px bg-slate-200" />

        <!-- Nav links -->
        <div class="flex items-center gap-1">
          <RouterLink
            to="/sucursales"
            class="nav-link relative flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-sm font-medium text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-all duration-150"
            active-class="!text-emerald-600 !bg-emerald-50 hover:!bg-emerald-50 hover:!text-emerald-600"
          >
            <i class="pi pi-map-marker" style="font-size: 0.8rem" />
            Sucursales
          </RouterLink>
          <RouterLink
            to="/empleados"
            class="nav-link relative flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-sm font-medium text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-all duration-150"
            active-class="!text-emerald-600 !bg-emerald-50 hover:!bg-emerald-50 hover:!text-emerald-600"
          >
            <i class="pi pi-users" style="font-size: 0.8rem" />
            Empleados
          </RouterLink>
        </div>
      </div>
    </nav>

    <!-- Main content -->
    <main class="mx-auto max-w-7xl px-6 py-8">
      <RouterView />
    </main>

    <Toast position="bottom-right" />
    <ConfirmDialog />
  </div>
</template>

<script setup lang="ts">
import Toast from 'primevue/toast'
import ConfirmDialog from 'primevue/confirmdialog'
</script>
