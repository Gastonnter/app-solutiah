<template>
  <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-5 flex flex-col gap-3">
    <div class="flex justify-between items-start">
      <div>
        <h2 class="text-lg font-bold text-gray-800">{{ sucursal.nombre }}</h2>
        <p class="text-gray-500 text-sm">{{ sucursal.ciudad }}, {{ sucursal.pais }}</p>
      </div>
      <div class="flex gap-2">
        <Button
          icon="pi pi-pencil"
          severity="secondary"
          rounded
          text
          @click="$emit('edit', sucursal)"
        />
        <Button
          icon="pi pi-trash"
          severity="danger"
          rounded
          text
          @click="$emit('delete', sucursal.id)"
        />
      </div>
    </div>

    <div class="flex gap-4 bg-blue-50 rounded-lg p-3">
      <div class="flex items-center gap-2">
        <i class="pi pi-sun text-orange-400" />
        <span class="text-sm font-medium text-gray-700">
          {{ sucursal.temperatura != null ? sucursal.temperatura + '°C' : 'N/D' }}
        </span>
      </div>
      <div class="flex items-center gap-2">
        <i class="pi pi-send text-blue-400" />
        <span class="text-sm font-medium text-gray-700">
          {{ sucursal.viento != null ? sucursal.viento + ' km/h' : 'N/D' }}
        </span>
      </div>
    </div>

    <div v-if="sucursal.empleados && sucursal.empleados.length > 0">
      <p class="text-xs text-gray-400 font-medium uppercase mb-2">
        Empleados ({{ sucursal.empleados.length }})
      </p>
      <div class="flex flex-col gap-1">
        <div
          v-for="empleado in sucursal.empleados"
          :key="empleado.id"
          class="flex items-center gap-2 text-sm text-gray-600"
        >
          <i class="pi pi-user text-gray-400 text-xs" />
          <span>{{ empleado.nombre }}</span>
          <span class="text-gray-400">— {{ empleado.email }}</span>
        </div>
      </div>
    </div>
    <div v-else>
      <p class="text-sm text-gray-400 italic">Sin empleados asignados</p>
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
