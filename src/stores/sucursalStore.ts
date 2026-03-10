import { defineStore } from 'pinia'
import { ref } from 'vue'
import { sucursalService } from '@/services/sucursalService'
import type { Sucursal } from '@/types'

export const useSucursalStore = defineStore('sucursal', () => {
  const sucursales = ref<Sucursal[]>([])
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  async function fetchAll(search?: string) {
    isLoading.value = true
    error.value = null
    try {
      const response = await sucursalService.getAll(search)
      sucursales.value = response.data
    } catch (e) {
      error.value = 'Error al cargar las sucursales'
    } finally {
      isLoading.value = false
    }
  }

  async function create(data: Omit<Sucursal, 'id' | 'created_at'>) {
    isLoading.value = true
    error.value = null
    try {
      await sucursalService.create(data)
      await fetchAll()
    } catch (e) {
      error.value = 'Error al crear la sucursal'
      throw e
    } finally {
      isLoading.value = false
    }
  }

  async function update(id: number, data: Partial<Sucursal>) {
    isLoading.value = true
    error.value = null
    try {
      await sucursalService.update(id, data)
      await fetchAll()
    } catch (e) {
      error.value = 'Error al actualizar la sucursal'
      throw e
    } finally {
      isLoading.value = false
    }
  }

  async function remove(id: number) {
    isLoading.value = true
    error.value = null
    try {
      await sucursalService.delete(id)
      sucursales.value = sucursales.value.filter((s) => s.id !== id)
    } catch (e) {
      error.value = 'Error al eliminar la sucursal'
      throw e
    } finally {
      isLoading.value = false
    }
  }

  return { sucursales, isLoading, error, fetchAll, create, update, remove }
})
