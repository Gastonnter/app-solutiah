<template>
  <Dialog
    :visible="visible"
    :header="empleado ? 'Editar Empleado' : 'Nuevo Empleado'"
    :style="{ width: '440px' }"
    :pt="{
      header: { class: 'border-b border-slate-100 pb-4' },
      content: { class: 'pt-5 pb-2' },
      footer: { class: 'border-t border-slate-100 pt-4' },
    }"
    modal
    @update:visible="$emit('update:visible', $event)"
  >
    <div class="flex flex-col gap-5">
      <!-- Nombre -->
      <div class="flex flex-col gap-1.5">
        <label class="text-xs font-bold uppercase tracking-widest text-slate-400">Nombre</label>
        <InputText
          v-model="form.nombre"
          placeholder="Ej: Juan García"
          class="w-full rounded-xl! border-slate-200!"
          :class="{ 'border-red-300!': errors.nombre }"
        />
        <small v-if="errors.nombre" class="flex items-center gap-1 text-red-500">
          <i class="pi pi-exclamation-circle" style="font-size: 0.7rem" />
          {{ errors.nombre }}
        </small>
      </div>

      <!-- Email -->
      <div class="flex flex-col gap-1.5">
        <label class="text-xs font-bold uppercase tracking-widest text-slate-400">Email</label>
        <InputText
          v-model="form.email"
          placeholder="email@ejemplo.com"
          class="w-full rounded-xl! border-slate-200!"
          :class="{ 'border-red-300!': errors.email }"
        />
        <small v-if="errors.email" class="flex items-center gap-1 text-red-500">
          <i class="pi pi-exclamation-circle" style="font-size: 0.7rem" />
          {{ errors.email }}
        </small>
      </div>

      <!-- Sucursal -->
      <div class="flex flex-col gap-1.5">
        <label class="text-xs font-bold uppercase tracking-widest text-slate-400">Sucursal</label>
        <Select
          v-model="form.sucursal_id"
          :options="sucursales"
          optionLabel="nombre"
          optionValue="id"
          placeholder="Seleccioná una sucursal"
          class="w-full rounded-xl! border-slate-200!"
          :class="{ 'border-red-300!': errors.sucursal_id }"
        >
          <template #option="{ option }">
            <div class="flex items-center gap-2">
              <i class="pi pi-map-marker text-emerald-500" style="font-size: 0.75rem" />
              <span class="text-sm">{{ option.nombre }}</span>
              <span class="text-xs text-slate-400 ml-auto">{{ option.ciudad }}</span>
            </div>
          </template>
        </Select>
        <small v-if="errors.sucursal_id" class="flex items-center gap-1 text-red-500">
          <i class="pi pi-exclamation-circle" style="font-size: 0.7rem" />
          {{ errors.sucursal_id }}
        </small>
      </div>
    </div>

    <template #footer>
      <div class="flex justify-end gap-2">
        <Button
          label="Cancelar"
          severity="secondary"
          class="rounded-xl! border-slate-200! text-slate-600! hover:bg-slate-50!"
          @click="$emit('update:visible', false)"
        />
        <Button
          :label="empleado ? 'Guardar cambios' : 'Crear empleado'"
          :icon="empleado ? 'pi pi-check' : 'pi pi-plus'"
          :loading="loading"
          class="rounded-xl! bg-emerald-500! hover:bg-emerald-600! border-emerald-500!"
          @click="handleSubmit"
        />
      </div>
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

const form = ref({ nombre: '', email: '', sucursal_id: null as number | null })
const errors = ref<Record<string, string>>({})

watch(
  () => props.empleado,
  (val) => {
    if (val) {
      form.value = { nombre: val.nombre, email: val.email, sucursal_id: val.sucursal_id }
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
