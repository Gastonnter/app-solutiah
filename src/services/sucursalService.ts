import api from './api'
import type { ApiResponse, Sucursal } from '@/types'

export const sucursalService = {
  async getAll(search?: string): Promise<ApiResponse<Sucursal[]>> {
    const params = search ? { search } : {}
    const response = await api.get('/sucursales', { params })
    return response.data
  },

  async getById(id: number): Promise<ApiResponse<Sucursal>> {
    const response = await api.get(`/sucursales/${id}`)
    return response.data
  },

  async create(data: Omit<Sucursal, 'id' | 'created_at'>): Promise<ApiResponse<Sucursal>> {
    const response = await api.post('/sucursales', data)
    return response.data
  },

  async update(id: number, data: Partial<Sucursal>): Promise<ApiResponse<Sucursal>> {
    const response = await api.put(`/sucursales/${id}`, data)
    return response.data
  },

  async delete(id: number): Promise<ApiResponse<null>> {
    const response = await api.delete(`/sucursales/${id}`)
    return response.data
  },
}
