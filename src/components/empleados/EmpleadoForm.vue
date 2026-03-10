<template>
  <Dialog
    :visible="visible"
    :header="empleado ? 'Editar Empleado' : 'Nuevo Empleado'"
    :style="{ width: '450px' }"
    modal
    @update:visible="$emit('update:visible', $event)"
  >
    <div class="flex flex-col gap-4 py-2">
      <div class="flex flex-col gap-1">
        <label class="font-medium text-gray-700">Nombre</label>
        <InputText v-model="form.nombre" placeholder="Nombre completo" class="w-full" />
        <small v-if="errors.nombre" class="text-red-500">{{ errors.nombre }}</small>
      </div>

      <div class="flex flex-col gap-1">
        <label class="font-medium text-gray-700">Email</label>
        <InputText v-model="form.email" placeholder="email@ejemplo.com" class="w-full" />
        <small v-if="errors.email" class="text-red-500">{{ errors.email }}</small>
      </div>

      <div class="flex flex-col gap-1">
        <label class="font-medium text-gray-700">Sucursal</label>
        <Select
          v-model="form.sucursal_id"
          :options="sucursales"
          optionLabel="nombre"
          optionValue="id"
          placeholder="Seleccioná una sucursal"
          class="w-full"
        />
        <small v-if="errors.sucursal_id" class="text-red-500">{{ errors.sucursal_id }}</small>
      </div>
    </div>

    <template #footer>
      <Button label="Cancelar" severity="secondary" @click="$emit('update:visible', false)" />
      <Button :label="empleado ? 'Guardar' : 'Crear'" @click="handleSubmit" :loading="loading" />
    </template>
  </Dialog>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import Dialog from 'primevue/dialog'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import Select from 'primevue/select'
import type { Empleado, Sucursal } from '@/types'

const props = defineProps<{
  visible: boolean
  empleado?: Empleado | null
  sucursales: Sucursal[]
  loading?: boolean
}>()

const emit = defineEmits<{
  'update:visible': [value: boolean]
  submit: [data: Omit<Empleado, 'id' | 'created_at'>]
}>()

const form = ref({
  nombre: '',
  email: '',
  sucursal_id: null as number | null,
})

const errors = ref<Record<string, string>>({})

watch(
  () => props.empleado,
  (val) => {
    if (val) {
      form.value = {
        nombre: val.nombre,
        email: val.email,
        sucursal_id: val.sucursal_id,
      }
    } else {
      form.value = { nombre: '', email: '', sucursal_id: null }
    }
  },
  { immediate: true },
)

function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

function validate(): boolean {
  errors.value = {}
  if (!form.value.nombre) errors.value.nombre = 'El nombre es obligatorio'
  if (!form.value.email) errors.value.email = 'El email es obligatorio'
  else if (!validateEmail(form.value.email)) errors.value.email = 'El email no es válido'
  if (!form.value.sucursal_id) errors.value.sucursal_id = 'La sucursal es obligatoria'
  return Object.keys(errors.value).length === 0
}

function handleSubmit() {
  if (!validate()) return
  emit('submit', {
    nombre: form.value.nombre,
    email: form.value.email,
    sucursal_id: form.value.sucursal_id as number,
  })
}
</script>
