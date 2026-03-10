<template>
  <div class="flex flex-col gap-6">
    <!-- Page Header -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 class="text-xl font-bold text-slate-800 tracking-tight">Sucursales</h1>
        <p class="text-sm text-slate-400 mt-0.5">
          {{
            store.sucursales.length > 0
              ? `${store.sucursales.length} sucursal${store.sucursales.length !== 1 ? 'es' : ''} registrada${store.sucursales.length !== 1 ? 's' : ''}`
              : 'Administrá tus sucursales'
          }}
        </p>
      </div>

      <div class="flex items-center gap-3">
        <!-- Search -->
        <div class="relative">
          <i
            class="pi pi-search absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
            style="font-size: 0.8rem"
          />
          <InputText
            v-model="search"
            placeholder="Buscar por nombre o ciudad..."
            class="pl-9! pr-4! rounded-xl! border-slate-200! text-sm! w-64 focus:ring-emerald-400!"
            @input="handleSearch"
          />
        </div>

        <!-- Nueva sucursal -->
        <Button
          label="Nueva Sucursal"
          icon="pi pi-plus"
          class="rounded-xl! bg-emerald-500! hover:bg-emerald-600! border-emerald-500! text-sm! font-semibold! whitespace-nowrap"
          @click="openCreate"
        />
      </div>
    </div>

    <!-- Loading -->
    <div v-if="store.isLoading" class="flex flex-col items-center justify-center py-20 gap-3">
      <ProgressSpinner style="width: 36px; height: 36px" strokeWidth="3" />
      <p class="text-sm text-slate-400">Cargando sucursales...</p>
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
      v-else-if="store.sucursales.length === 0"
      class="flex flex-col items-center justify-center py-20 text-center"
    >
      <div class="flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 mb-4">
        <i class="pi pi-building text-slate-300" style="font-size: 1.8rem" />
      </div>
      <h3 class="text-base font-semibold text-slate-600 mb-1">No hay sucursales</h3>
      <p class="text-sm text-slate-400 mb-5">Comenzá creando tu primera sucursal</p>
      <Button
        label="Crear sucursal"
        icon="pi pi-plus"
        class="rounded-xl! bg-emerald-500! hover:bg-emerald-600! border-emerald-500! text-sm!"
        @click="openCreate"
      />
    </div>

    <!-- Grid -->
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <SucursalCard
        v-for="sucursal in store.sucursales"
        :key="sucursal.id"
        :sucursal="sucursal"
        @edit="openEdit"
        @delete="handleDelete"
      />
    </div>

    <!-- Form dialog -->
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
    acceptClass: 'p-button-danger',
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
