export interface Empleado {
  id: number
  nombre: string
  email: string
  sucursal_id: number
  created_at?: string
}

export interface Sucursal {
  id: number
  nombre: string
  ciudad: string
  pais: string
  latitud: number
  longitud: number
  temperatura?: number | null
  viento?: number | null
  empleados?: Empleado[]
  created_at?: string
}

export interface ApiResponse<T> {
  data: T
  message: string
  status: number
}
