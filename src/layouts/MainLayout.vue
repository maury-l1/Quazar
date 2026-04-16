<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="bg-white text-grey-9" bordered>
      <q-toolbar class="q-px-md">
        <q-btn flat dense round icon="menu" color="grey-7" @click="toggleLeftDrawer" />
        <q-toolbar-title class="text-weight-bold text-primary">
          <q-icon name="task_alt" size="22px" class="q-mr-xs" />
          Task App
        </q-toolbar-title>
        <q-btn flat no-caps color="grey-7" icon="logout" label="Salir" @click="logout" />
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered class="bg-grey-1">
      <div class="q-pa-md q-mb-sm">
        <div class="text-weight-bold text-primary text-h6">Task App</div>
        <div class="text-caption text-grey-6">Gestión de tareas</div>
      </div>
      <q-separator class="q-mb-sm" />
      <q-list padding>
        <EssentialLink v-for="link in linksList" :key="link.title" v-bind="link" />
      </q-list>
    </q-drawer>

    <q-page-container class="bg-grey-1">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useApi } from 'src/composables/useApi'
import { useQuasar } from 'quasar'
import EssentialLink from 'components/EssentialLink.vue'

const $q = useQuasar()
const router = useRouter()
const { post } = useApi()

const linksList = [
  {
    title: 'Mis Tareas',
    caption: 'Ver lista de tareas',
    icon: 'checklist',
    to: '/List',
  },
  {
    title: 'Login',
    caption: 'Iniciar sesión',
    icon: 'login',
    to: '/Login',
  },
]

async function logout() {
  try {
    await post('/api/auth/logout', {})
    router.push('/Login')
  } catch {
    $q.notify({ type: 'negative', message: 'Error al cerrar sesión', position: 'top' })
  }
}

const leftDrawerOpen = ref(false)
function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value
}
</script>