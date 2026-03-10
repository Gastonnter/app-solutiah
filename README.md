# App de Gestión de Sucursales y Empleados

Este proyecto es una aplicación web para la gestión de sucursales y empleados, desarrollada en Vue 3 + TypeScript, siguiendo principios de **Clean Architecture** y buenas prácticas de desarrollo frontend.

---

## 🏗️ Arquitectura

La aplicación está estructurada siguiendo los principios de **Clean Architecture** para lograr un código desacoplado, mantenible y fácilmente testeable.  
Las capas principales son:

- **Presentación (Views/Components):**  
  Componentes Vue reutilizables y desacoplados de la lógica de negocio.  
  Ejemplo: `EmpleadoForm.vue`, `SucursalesList.vue`.

- **Stores (Estado):**  
  Manejo del estado global con [Pinia](https://pinia.vuejs.org/), actuando como intermediario entre la UI y los servicios.  
  Ejemplo: `empleadoStore.ts`, `sucursalStore.ts`.

- **Servicios (Services):**  
  Encapsulan la comunicación con la API REST, desacoplando la lógica de red del resto de la app.  
  Ejemplo: `empleadoService.ts`, `sucursalService.ts`.

- **Tipos (Types):**  
  Definición de interfaces y tipos TypeScript para garantizar tipado estricto y evitar errores.

Esta arquitectura permite:

- **Reutilización:** Componentes y servicios desacoplados y reutilizables.
- **Escalabilidad:** Fácil de agregar nuevas funcionalidades o entidades.
- **Testabilidad:** Cada capa puede ser testeada de forma aislada.
- **Mantenibilidad:** Separación clara de responsabilidades.

---

## ⚙️ Dependencias Principales

- **Vue 3**: Framework principal.
- **TypeScript**: Tipado estático.
- **Pinia**: Manejo de estado global.
- **PrimeVue**: Librería de componentes UI.
- **Axios**: Cliente HTTP para la comunicación con la API.
- **Vite**: Herramienta de build y desarrollo rápido.

---

## 🚀 ¿Cómo funciona?

1. **Navegación:**
   - `/sucursales`: Listado, creación, edición y eliminación de sucursales.
   - `/empleados`: Listado, creación, edición y eliminación de empleados.

2. **Flujo de datos:**
   - Los componentes de UI disparan eventos (crear, editar, eliminar).
   - Los stores gestionan el estado y llaman a los servicios.
   - Los servicios interactúan con la API REST.
   - El estado se actualiza y la UI reacciona automáticamente.

3. **Validaciones:**
   - Formularios con validaciones en el frontend para evitar datos inválidos.
   - Mensajes de error claros y feedback visual.

---

## 📦 Estructura de Carpetas

```
src/
├── components/
│   ├── empleados/
│   └── surcursales/
├── services/
├── stores/
├── types/
├── views/
└── router/
```

---

## 🧩 ¿Por qué esta arquitectura?

- **Separación de responsabilidades:** Cada capa tiene una función clara.
- **Facilidad de pruebas:** Los servicios y stores pueden ser testeados sin depender de la UI.
- **Escalabilidad:** Permite agregar nuevas entidades (por ejemplo, productos, clientes) sin reescribir la base.
- **Reutilización:** Componentes y lógica reutilizables en diferentes partes de la app.

---

## 📋 Instalación y uso

1. Instala dependencias:

   ```bash
   npm install
   ```

2. Corre el servidor de desarrollo:

   ```bash
   npm run dev
   ```

3. Accede a la app en `http://localhost:5173` (o el puerto que indique Vite).

---

## 📚 Recursos

- [Clean Architecture](https://8thlight.com/blog/uncle-bob/2012/08/13/the-clean-architecture.html)
- [Vue 3 Docs](https://vuejs.org/)
- [Pinia Docs](https://pinia.vuejs.org/)
