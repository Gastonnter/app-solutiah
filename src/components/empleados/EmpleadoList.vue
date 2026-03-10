<template>
  <div class="flex flex-col gap-4">
    <div class="flex justify-between items-center">
      <span class="text-gray-500 text-sm">{{ store.empleados.length }} empleados registrados</span>
      <Button label="Nuevo Empleado" icon="pi pi-plus" @click="openCreate" />
    </div>

    <div v-if="store.isLoading" class="flex justify-center py-12">
      <ProgressSpinner />
    </div>

    <div v-else-if="store.error" class="text-red-500 text-center py-6">
      {{ store.error }}
    </div>

    <div v-else-if="store.empleados.length === 0" class="text-center py-12 text-gray-400">
      <i class="pi pi-users text-4xl mb-3 block" />
      <p>No hay empleados registrados</p>
    </div>

    <div v-else>
      <DataTable
        :value="store.empleados"
        striped-rows
        paginator
        :rows="10"
        :rowsPerPageOptions="[5, 10, 20]"
        class="w-full"
      >
        <Column field="nombre" header="Nombre" sortable />
        <Column field="email" header="Email" sortable />
        <Column header="Sucursal">
          <template #body="{ data }">
            {{ getSucursalNombre(data.sucursal_id) }}
          </template>
        </Column>
        <Column header="Acciones" style="width: 120px">
          <template #body="{ data }">
            <div class="flex gap-2">
              <Button
                icon="pi pi-pencil"
                severity="secondary"
                rounded
                text
                @click="openEdit(data)"
              />
              <Button
                icon="pi pi-trash"
                severity="danger"
                rounded
                text
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
