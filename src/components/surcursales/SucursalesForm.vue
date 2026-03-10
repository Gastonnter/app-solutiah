<template>
  <Dialog
    :visible="visible"
    :header="sucursal ? 'Editar Sucursal' : 'Nueva Sucursal'"
    :style="{ width: '500px' }"
    modal
    @update:visible="$emit('update:visible', $event)"
  >
    <div class="flex flex-col gap-4 py-2">
      <div class="flex flex-col gap-1">
        <label class="font-medium text-gray-700">Nombre</label>
        <InputText v-model="form.nombre" placeholder="Nombre de la sucursal" class="w-full" />
        <small v-if="errors.nombre" class="text-red-500">{{ errors.nombre }}</small>
      </div>

      <div class="flex flex-col gap-1">
        <label class="font-medium text-gray-700">Ciudad</label>
        <InputText v-model="form.ciudad" placeholder="Ciudad" class="w-full" />
        <small v-if="errors.ciudad" class="text-red-500">{{ errors.ciudad }}</small>
      </div>

      <div class="flex flex-col gap-1">
        <label class="font-medium text-gray-700">País</label>
        <InputText v-model="form.pais" placeholder="País" class="w-full" />
        <small v-if="errors.pais" class="text-red-500">{{ errors.pais }}</small>
      </div>

      <div class="flex gap-4">
        <div class="flex flex-col gap-1 flex-1">
          <label class="font-medium text-gray-700">Latitud</label>
          <InputText v-model="form.latitud" placeholder="-34.6037" class="w-full" />
          <small v-if="errors.latitud" class="text-red-500">{{ errors.latitud }}</small>
        </div>
        <div class="flex flex-col gap-1 flex-1">
          <label class="font-medium text-gray-700">Longitud</label>
          <InputText v-model="form.longitud" placeholder="-58.3816" class="w-full" />
          <small v-if="errors.longitud" class="text-red-500">{{ errors.longitud }}</small>
        </div>
      </div>
    </div>

    <template #footer>
      <Button label="Cancelar" severity="secondary" @click="$emit('update:visible', false)" />
      <Button :label="sucursal ? 'Guardar' : 'Crear'" @click="handleSubmit" :loading="loading" />
    </template>
  </Dialog>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import Dialog from 'primevue/dialog'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import type { Sucursal } from '@/types'

const props = defineProps<{
  visible: boolean
  sucursal?: Sucursal | null
  loading?: boolean
}>()

const emit = defineEmits<{
  'update:visible': [value: boolean]
  submit: [data: Omit<Sucursal, 'id' | 'created_at'>]
}>()

const form = ref({
  nombre: '',
  ciudad: '',
  pais: '',
  latitud: '',
  longitud: '',
})

const errors = ref<Record<string, string>>({})

watch(
  () => props.sucursal,
  (val) => {
    if (val) {
      form.value = {
        nombre: val.nombre,
        ciudad: val.ciudad,
        pais: val.pais,
        latitud: String(val.latitud),
        longitud: String(val.longitud),
      }
    } else {
      form.value = { nombre: '', ciudad: '', pais: '', latitud: '', longitud: '' }
    }
  },
  { immediate: true },
)

function validate(): boolean {
  errors.value = {}
  if (!form.value.nombre) errors.value.nombre = 'El nombre es obligatorio'
  if (!form.value.ciudad) errors.value.ciudad = 'La ciudad es obligatoria'
  if (!form.value.pais) errors.value.pais = 'El país es obligatorio'
  if (!form.value.latitud) errors.value.latitud = 'La latitud es obligatoria'
  if (!form.value.longitud) errors.value.longitud = 'La longitud es obligatoria'
  return Object.keys(errors.value).length === 0
}

function handleSubmit() {
  if (!validate()) return
  emit('submit', {
    nombre: form.value.nombre,
    ciudad: form.value.ciudad,
    pais: form.value.pais,
    latitud: Number(form.value.latitud),
    longitud: Number(form.value.longitud),
  })
}
</script>
