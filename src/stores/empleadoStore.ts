import { defineStore } from 'pinia'
import { ref } from 'vue'
import { empleadoService } from '@/services/empleadoService'
import type { Empleado } from '@/types'

export const useEmpleadoStore = defineStore('empleado', () => {
  const empleados = ref<Empleado[]>([])
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  async function fetchAll() {
    isLoading.value = true
    error.value = null
    try {
      const response = await empleadoService.getAll()
      empleados.value = response.data
    } catch (e) {
      error.value = 'Error al cargar los empleados'
    } finally {
      isLoading.value = false
    }
  }

  async function create(data: Omit<Empleado, 'id' | 'created_at'>) {
    isLoading.value = true
    error.value = null
    try {
      await empleadoService.create(data)
      await fetchAll()
    } catch (e) {
      error.value = 'Error al crear el empleado'
      throw e
    } finally {
      isLoading.value = false
    }
  }

  async function update(id: number, data: Partial<Empleado>) {
    isLoading.value = true
    error.value = null
    try {
      await empleadoService.update(id, data)
      await fetchAll()
    } catch (e) {
      error.value = 'Error al actualizar el empleado'
      throw e
    } finally {
      isLoading.value = false
    }
  }

  async function remove(id: number) {
    isLoading.value = true
    error.value = null
    try {
      await empleadoService.delete(id)
      empleados.value = empleados.value.filter((e) => e.id !== id)
    } catch (e) {
      error.value = 'Error al eliminar el empleado'
      throw e
    } finally {
      isLoading.value = false
    }
  }

  return { empleados, isLoading, error, fetchAll, create, update, remove }
})
