<template>
  <div class="flex flex-col gap-6">
    <!-- Page Header -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 class="text-xl font-bold text-slate-800 tracking-tight">Empleados</h1>
        <p class="text-sm text-slate-400 mt-0.5">
          {{
            store.empleados.length > 0
              ? `${store.empleados.length} empleado${store.empleados.length !== 1 ? 's' : ''} registrado${store.empleados.length !== 1 ? 's' : ''}`
              : 'Administrá tu equipo de trabajo'
          }}
        </p>
      </div>

      <Button
        label="Nuevo Empleado"
        icon="pi pi-plus"
        class="rounded-xl! bg-emerald-500! hover:bg-emerald-600! border-emerald-500! text-sm! font-semibold!"
        @click="openCreate"
      />
    </div>

    <!-- Loading -->
    <div v-if="store.isLoading" class="flex flex-col items-center justify-center py-20 gap-3">
      <ProgressSpinner style="width: 36px; height: 36px" strokeWidth="3" />
      <p class="text-sm text-slate-400">Cargando empleados...</p>
    </div>

    <!-- Error -->
    <div
      v-else-if="store.error"
      class="flex items-center gap-3 rounded-xl border border-red-100 bg-red-50 px-5 py-4 text-red-600"
    >
      <i class="pi pi-exclamation-triangle text-red-400" />
      <span class="text-sm">{{ store.error }}</span>
    </div>

    <!-- Empty state -->
    <div
      v-else-if="store.empleados.length === 0"
      class="flex flex-col items-center justify-center py-20 text-center"
    >
      <div class="flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 mb-4">
        <i class="pi pi-users text-slate-300" style="font-size: 1.8rem" />
      </div>
      <h3 class="text-base font-semibold text-slate-600 mb-1">No hay empleados</h3>
      <p class="text-sm text-slate-400 mb-5">Comenzá agregando tu primer empleado</p>
      <Button
        label="Crear empleado"
        icon="pi pi-plus"
        class="rounded-xl! bg-emerald-500! hover:bg-emerald-600! border-emerald-500! text-sm!"
        @click="openCreate"
      />
    </div>

    <!-- Tabla -->
    <div v-else class="rounded-2xl border border-slate-200/80 bg-white shadow-sm overflow-hidden">
      <DataTable
        :value="store.empleados"
        :rows="10"
        :rowsPerPageOptions="[5, 10, 20]"
        paginator
        :pt="{
          root: { class: 'w-full' },
          header: { class: 'hidden' },
          thead: { class: 'bg-slate-50 border-b border-slate-100' },
          tbody: { class: 'divide-y divide-slate-100' },
          paginator: { class: 'border-t border-slate-100 !rounded-none' },
        }"
      >
        <!-- Nombre -->
        <Column field="nombre" sortable>
          <template #header>
            <span class="text-xs font-bold uppercase tracking-widest text-slate-400">Nombre</span>
          </template>
          <template #body="{ data }">
            <div class="flex items-center gap-3 py-1">
              <div
                class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-100"
              >
                <span class="text-xs font-bold text-emerald-600">
                  {{ data.nombre.charAt(0).toUpperCase() }}
                </span>
              </div>
              <span class="text-sm font-semibold text-slate-700">{{ data.nombre }}</span>
            </div>
          </template>
        </Column>

        <!-- Email -->
        <Column field="email" sortable>
          <template #header>
            <span class="text-xs font-bold uppercase tracking-widest text-slate-400">Email</span>
          </template>
          <template #body="{ data }">
            <div class="flex items-center gap-2">
              <i class="pi pi-envelope text-slate-300" style="font-size: 0.75rem" />
              <span class="text-sm text-slate-500">{{ data.email }}</span>
            </div>
          </template>
        </Column>

        <!-- Sucursal -->
        <Column>
          <template #header>
            <span class="text-xs font-bold uppercase tracking-widest text-slate-400">Sucursal</span>
          </template>
          <template #body="{ data }">
            <span
              class="inline-flex items-center gap-1.5 rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600"
            >
              <i class="pi pi-map-marker text-slate-400" style="font-size: 0.65rem" />
              {{ getSucursalNombre(data.sucursal_id) }}
            </span>
          </template>
        </Column>

        <!-- Acciones -->
        <Column header="" style="width: 90px">
          <template #body="{ data }">
            <div
              class="flex items-center gap-1 justify-end opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Button
                icon="pi pi-pencil"
                severity="secondary"
                rounded
                text
                size="small"
                class="w-8! h-8! hover:bg-slate-100!"
                @click="openEdit(data)"
              />
              <Button
                icon="pi pi-trash"
                severity="danger"
                rounded
                text
                size="small"
                class="w-8! h-8! hover:bg-red-50!"
                @click="handleDelete(data.id)"
              />
            </div>
          </template>
        </Column>
      </DataTable>
    </div>

    <EmpleadoForm
      v-model:visible="formVisible"
      :empleado="selectedEmpleado"
      :sucursales="sucursalStore.sucursales"
      :loading="store.isLoading"
      @submit="handleSubmit"
    />

    <ConfirmDialog />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useConfirm } from 'primevue/useconfirm'
import { useToast } from 'primevue/usetoast'
import Button from 'primevue/button'
import ProgressSpinner from 'primevue/progressspinner'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import ConfirmDialog from 'primevue/confirmdialog'
import { useEmpleadoStore } from '@/stores/empleadoStore'
import { useSucursalStore } from '@/stores/sucursalStore'
import EmpleadoForm from './EmpleadoForm.vue'
import type { Empleado } from '@/types'

const store = useEmpleadoStore()
const sucursalStore = useSucursalStore()
const confirm = useConfirm()
const toast = useToast()

const formVisible = ref(false)
const selectedEmpleado = ref<Empleado | null>(null)

onMounted(async () => {
  await store.fetchAll()
  await sucursalStore.fetchAll()
})

function getSucursalNombre(sucursalId: number): string {
  const sucursal = sucursalStore.sucursales.find((s) => s.id === sucursalId)
  return sucursal ? sucursal.nombre : 'Sin sucursal'
}

function openCreate() {
  selectedEmpleado.value = null
  formVisible.value = true
}

function openEdit(empleado: Empleado) {
  selectedEmpleado.value = empleado
  formVisible.value = true
}

async function handleSubmit(data: Omit<Empleado, 'id' | 'created_at'>) {
  try {
    if (selectedEmpleado.value) {
      await store.update(selectedEmpleado.value.id, data)
      toast.add({
        severity: 'success',
        summary: 'Éxito',
        detail: 'Empleado actualizado',
        life: 3000,
      })
    } else {
      await store.create(data)
      toast.add({ severity: 'success', summary: 'Éxito', detail: 'Empleado creado', life: 3000 })
    }
    formVisible.value = false
  } catch {
    toast.add({ severity: 'error', summary: 'Error', detail: store.error, life: 3000 })
  }
}

function handleDelete(id: number) {
  confirm.require({
    message: '¿Estás seguro que querés eliminar este empleado?',
    header: 'Confirmar eliminación',
    icon: 'pi pi-exclamation-triangle',
    acceptLabel: 'Eliminar',
    rejectLabel: 'Cancelar',
    acceptClass: 'p-button-danger',
    accept: async () => {
      try {
        await store.remove(id)
        toast.add({
          severity: 'success',
          summary: 'Éxito',
          detail: 'Empleado eliminado',
          life: 3000,
        })
      } catch {
        toast.add({ severity: 'error', summary: 'Error', detail: store.error, life: 3000 })
      }
    },
  })
}
</script>
