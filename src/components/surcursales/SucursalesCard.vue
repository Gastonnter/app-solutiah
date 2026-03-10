<template>
  <div
    class="sucursal-card group relative flex flex-col gap-0 overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
  >
    <!-- Header con color accent -->
    <div class="relative px-5 pt-5 pb-4">
      <div
        class="absolute top-0 left-0 h-1 w-full bg-linear-to-r from-emerald-400 to-teal-500 rounded-t-2xl"
      />

      <div class="flex justify-between items-start mt-1">
        <div class="flex-1 min-w-0">
          <h2 class="text-base font-semibold text-slate-800 truncate leading-tight">
            {{ sucursal.nombre }}
          </h2>
          <div class="flex items-center gap-1.5 mt-1">
            <i class="pi pi-map-marker text-emerald-500" style="font-size: 0.7rem" />
            <p class="text-xs text-slate-400 font-medium tracking-wide">
              {{ sucursal.ciudad }}, {{ sucursal.pais }}
            </p>
          </div>
        </div>

        <!-- Acciones -->
        <div
          class="flex gap-1 ml-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        >
          <Button
            icon="pi pi-pencil"
            severity="secondary"
            rounded
            text
            size="small"
            class="w-8! h-8! hover:bg-slate-100!"
            @click="$emit('edit', sucursal)"
          />
          <Button
            icon="pi pi-trash"
            severity="danger"
            rounded
            text
            size="small"
            class="w-8! h-8! hover:bg-red-50!"
            @click="$emit('delete', sucursal.id)"
          />
        </div>
      </div>
    </div>

    <!-- Divider -->
    <div class="mx-5 h-px bg-slate-100" />

    <!-- Clima -->
    <div class="px-5 py-3 flex gap-4">
      <div
        class="flex items-center gap-2 rounded-xl bg-amber-50 border border-amber-100 px-3 py-1.5"
      >
        <i class="pi pi-sun text-amber-400" style="font-size: 0.85rem" />
        <span class="text-xs font-semibold text-amber-700">
          {{ sucursal.temperatura != null ? sucursal.temperatura + '°C' : 'N/D' }}
        </span>
      </div>
      <div class="flex items-center gap-2 rounded-xl bg-sky-50 border border-sky-100 px-3 py-1.5">
        <i class="pi pi-send text-sky-400" style="font-size: 0.85rem" />
        <span class="text-xs font-semibold text-sky-700">
          {{ sucursal.viento != null ? sucursal.viento + ' km/h' : 'N/D' }}
        </span>
      </div>
    </div>

    <!-- Divider -->
    <div class="mx-5 h-px bg-slate-100" />

    <!-- Empleados -->
    <div class="px-5 py-4 flex-1">
      <template v-if="sucursal.empleados && sucursal.empleados.length > 0">
        <div class="flex items-center justify-between mb-2.5">
          <span class="text-[10px] font-bold uppercase tracking-widest text-slate-400"
            >Empleados</span
          >
          <span
            class="rounded-full bg-emerald-50 border border-emerald-200 px-2 py-0.5 text-[10px] font-bold text-emerald-600"
          >
            {{ sucursal.empleados.length }}
          </span>
        </div>
        <div class="flex flex-col gap-1.5">
          <div
            v-for="empleado in sucursal.empleados"
            :key="empleado.id"
            class="flex items-center gap-2.5 rounded-lg bg-slate-50 px-3 py-2"
          >
            <div
              class="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100 shrink-0"
            >
              <i class="pi pi-user text-emerald-600" style="font-size: 0.6rem" />
            </div>
            <div class="flex flex-col min-w-0">
              <span class="text-xs font-medium text-slate-700 truncate">{{ empleado.nombre }}</span>
              <span class="text-[10px] text-slate-400 truncate">{{ empleado.email }}</span>
            </div>
          </div>
        </div>
      </template>
      <template v-else>
        <div class="flex flex-col items-center justify-center py-3 text-center">
          <div class="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 mb-2">
            <i class="pi pi-users text-slate-300" style="font-size: 0.85rem" />
          </div>
          <p class="text-xs text-slate-400">Sin empleados asignados</p>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import Button from 'primevue/button'
import type { Sucursal } from '@/types'

defineProps<{
  sucursal: Sucursal
}>()

defineEmits<{
  edit: [sucursal: Sucursal]
  delete: [id: number]
}>()
</script>
