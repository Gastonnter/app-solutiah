<template>
  <div class="flex flex-col gap-4">
    <div class="flex justify-between items-center">
      <InputText
        v-model="search"
        placeholder="Buscar por nombre o ciudad..."
        class="w-80"
        @input="handleSearch"
      />
      <Button label="Nueva Sucursal" icon="pi pi-plus" @click="openCreate" />
    </div>

    <div v-if="store.isLoading" class="flex justify-center py-12">
      <ProgressSpinner />
    </div>

    <div v-else-if="store.error" class="text-red-500 text-center py-6">
      {{ store.error }}
    </div>

    <div v-else-if="store.sucursales.length === 0" class="text-center py-12 text-gray-400">
      <i class="pi pi-building text-4xl mb-3 block" />
      <p>No hay sucursales registradas</p>
    </div>

    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <SucursalCard
        v-for="sucursal in store.sucursales"
        :key="sucursal.id"
        :sucursal="sucursal"
        @edit="openEdit"
        @delete="handleDelete"
      />
    </div>

    <SucursalForm
      v-model:visible="formVisible"
      :sucursal="selectedSucursal"
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
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import ProgressSpinner from 'primevue/progressspinner'
import ConfirmDialog from 'primevue/confirmdialog'
import { useSucursalStore } from '@/stores/sucursalStore'
import SucursalCard from './SucursalesCard.vue'
import SucursalForm from './SucursalesForm.vue'
import type { Sucursal } from '@/types'

const store = useSucursalStore()
const confirm = useConfirm()
const toast = useToast()

const search = ref('')
const formVisible = ref(false)
const selectedSucursal = ref<Sucursal | null>(null)

onMounted(() => store.fetchAll())

function handleSearch() {
  store.fetchAll(search.value)
}

function openCreate() {
  selectedSucursal.value = null
  formVisible.value = true
}

function openEdit(sucursal: Sucursal) {
  selectedSucursal.value = sucursal
  formVisible.value = true
}

async function handleSubmit(data: Omit<Sucursal, 'id' | 'created_at'>) {
  try {
    if (selectedSucursal.value) {
      await store.update(selectedSucursal.value.id, data)
      toast.add({
        severity: 'success',
        summary: 'Éxito',
        detail: 'Sucursal actualizada',
        life: 3000,
      })
    } else {
      await store.create(data)
      toast.add({ severity: 'success', summary: 'Éxito', detail: 'Sucursal creada', life: 3000 })
    }
    formVisible.value = false
  } catch {
    toast.add({ severity: 'error', summary: 'Error', detail: store.error, life: 3000 })
  }
}

function handleDelete(id: number) {
  confirm.require({
    message: '¿Estás seguro que querés eliminar esta sucursal?',
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
          detail: 'Sucursal eliminada',
          life: 3000,
        })
      } catch {
        toast.add({ severity: 'error', summary: 'Error', detail: store.error, life: 3000 })
      }
    },
  })
}
</script>
