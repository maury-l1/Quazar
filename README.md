# Task App - Frontend

Aplicación de gestión de tareas construida con **Quasar Framework (Vue 3)**, conectada a un backend en **Nuxt**.

---

## 🛠️ Tecnologías

- [Quasar Framework](https://quasar.dev/) v2
- Vue 3 (Composition API)
- Vue Router
- Fetch API (nativo)

---

## 📋 Requisitos previos

- Node.js 18+
- Quasar CLI instalado globalmente:

```bash
npm install -g @quasar/cli
```

---

## 🚀 Instalación

```bash
# Clonar el repositorio
git clone <url-del-repo>
cd quasar-project

# Instalar dependencias
npm install
```

---

## ⚙️ Variables de entorno

Crea un archivo `.env` en la raíz del proyecto:

```env
VITE_API_BASE_URL=http://localhost:3000
```

---

## ▶️ Desarrollo

```bash
quasar dev
```

La app estará disponible en `http://localhost:9000`.

---

## 📁 Estructura del proyecto

```
src/
├── composables/
│   └── useApi.js          # Cliente HTTP con fetch nativo
├── layouts/
│   └── MainLayout.vue     # Layout principal con navbar y drawer
├── pages/
│   ├── LoginPage.vue      # Inicio de sesión
│   ├── RegisterPage.vue   # Registro de usuario
│   └── ListPage.vue       # Lista de tareas (CRUD)
├── components/
│   └── EssentialLink.vue  # Componente de navegación
└── router/
    └── routes.js          # Definición de rutas
```

---

## 🔌 Comunicación con el backend

La comunicación con el backend se realiza mediante el composable `useApi.js` ubicado en `src/composables/useApi.js`, que usa `fetch` nativo con soporte de cookies de sesión.

```js
import { useApi } from 'src/composables/useApi'

const { get, post, put, remove } = useApi()

// GET
const tasks = await get('/api/tasks')

// POST
const task = await post('/api/tasks', { title: 'Nueva tarea' })

// PUT
const updated = await put('/api/tasks/1', { title: 'Tarea editada' })

// DELETE
await remove('/api/tasks/1')
```

> Todas las peticiones incluyen `credentials: 'include'` para el manejo de sesiones con cookies.

---

## 🔐 Autenticación

La app soporta dos métodos de autenticación:

### Email y contraseña
- Endpoint: `POST /api/auth/login`
- Devuelve el usuario y establece una cookie de sesión

### GitHub OAuth
- Redirige a `http://localhost:3000/auth/github`
- GitHub autentica y redirige de vuelta a la app

### Registro
- Endpoint: `POST /api/auth/register`
- Campos requeridos: `name`, `email`, `password`

### Logout
- Endpoint: `POST /api/auth/logout`
- Limpia la sesión del servidor y redirige al login

---

## ✅ Funcionalidades

### Tareas
| Acción | Método | Endpoint |
|--------|--------|----------|
| Listar tareas | GET | `/api/tasks` |
| Crear tarea | POST | `/api/tasks` |
| Editar tarea | PUT | `/api/tasks/:id` |
| Eliminar tarea | DELETE | `/api/tasks/:id` |

### Campos de una tarea
- `title` — Título (obligatorio)
- `description` — Descripción (opcional)
- `finalDate` — Fecha límite (opcional)

---

## 🧭 Rutas

| Ruta | Página |
|------|--------|
| `/Login` | Inicio de sesión |
| `/Register` | Registro de usuario |
| `/List` | Lista de tareas |

---

## 📦 Build de producción

```bash
quasar build
```

Los archivos compilados se generan en `dist/spa/`.

---

## 📱 Build para Android (APK)

```bash
# Añadir modo Capacitor
quasar mode add capacitor
npx cap add android

# Compilar
quasar build -m capacitor -T android

# Abrir en Android Studio
npx cap open android
```

> ⚠️ Para el APK el backend debe estar desplegado en un servidor con URL pública, no en `localhost`.

---

## 🔗 Backend

Este frontend se conecta al backend desarrollado en Nuxt. Consulta el README del repositorio del backend para más información.
