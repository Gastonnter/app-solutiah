import api from './api'
import type { ApiResponse, Empleado } from '@/types'

export const empleadoService = {
  async getAll(): Promise<ApiResponse<Empleado[]>> {
    const response = await api.get('/empleados')
    return response.data
  },

  async create(data: Omit<Empleado, 'id' | 'created_at'>): Promise<ApiResponse<Empleado>> {
    const response = await api.post('/empleados', data)
    return response.data
  },

  async update(id: number, data: Partial<Empleado>): Promise<ApiResponse<Empleado>> {
    const response = await api.put(`/empleados/${id}`, data)
    return response.data
  },

  async delete(id: number): Promise<ApiResponse<null>> {
    const response = await api.delete(`/empleados/${id}`)
    return response.data
  },
}
