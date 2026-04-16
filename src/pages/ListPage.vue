<template>
    <q-page class="q-pa-lg">

        <div class="row items-center justify-between q-mb-lg">
            <div>
                <div class="text-h5 text-weight-bold text-grey-9">Mis Tareas</div>
                <div class="text-caption text-grey-5">{{ tasks.length }} tarea{{ tasks.length !== 1 ? 's' : '' }} en
                    total</div>
            </div>
            <q-btn color="primary" icon="add" label="Nueva tarea" no-caps unelevated rounded
                @click="openCreateDialog" />
        </div>

        <!-- Loading -->
        <div v-if="loading" class="flex flex-center q-mt-xl">
            <q-spinner-dots color="primary" size="40px" />
        </div>

        <!-- Error -->
        <div v-else-if="error" class="flex flex-center q-mt-xl">
            <div class="text-center">
                <q-icon name="error_outline" size="56px" color="negative" />
                <div class="text-body1 text-grey-6 q-mt-sm">{{ error }}</div>
                <q-btn unelevated color="primary" label="Reintentar" no-caps rounded class="q-mt-md"
                    @click="fetchTasks" />
            </div>
        </div>

        <!-- Sin tareas -->
        <div v-else-if="tasks.length === 0" class="flex flex-center q-mt-xl">
            <div class="text-center">
                <q-icon name="task_alt" size="64px" color="grey-3" />
                <div class="text-h6 text-grey-5 q-mt-md">No tienes tareas aún</div>
                <div class="text-caption text-grey-4 q-mb-md">Crea tu primera tarea para empezar</div>
                <q-btn unelevated color="primary" icon="add" label="Nueva tarea" no-caps rounded
                    @click="openCreateDialog" />
            </div>
        </div>

        <!-- Lista de tareas -->
        <div v-else class="q-gutter-y-sm">
            <q-card v-for="task in tasks" :key="task.id" flat class="task-card">
                <q-card-section class="row items-center q-py-md q-px-lg">
                    <q-icon name="radio_button_unchecked" color="grey-4" size="20px" class="q-mr-md" />
                    <div class="col">
                        <div class="text-body1 text-weight-medium text-grey-9">{{ task.title }}</div>
                        <div v-if="task.description" class="text-caption text-grey-5 q-mt-xs">
                            {{ task.description }}
                        </div>
                        <div v-if="task.finalDate" class="q-mt-xs">
                            <q-chip dense size="sm" icon="event" color="blue-1" text-color="primary" class="q-px-sm">
                                {{ task.finalDate }}
                            </q-chip>
                        </div>
                    </div>
                    <div class="row q-gutter-x-xs">
                        <q-btn flat round dense icon="edit" color="grey-5" @click="openEditDialog(task)">
                            <q-tooltip>Editar</q-tooltip>
                        </q-btn>
                        <q-btn flat round dense icon="delete_outline" color="grey-5" @click="confirmDelete(task)">
                            <q-tooltip>Eliminar</q-tooltip>
                        </q-btn>
                    </div>
                </q-card-section>
            </q-card>
        </div>

        <!-- Dialog crear tarea -->
        <q-dialog v-model="createDialog">
            <q-card class="dialog-card">
                <q-card-section class="row items-center q-pb-none">
                    <div class="text-h6 text-weight-bold">Nueva tarea</div>
                    <q-space />
                    <q-btn flat round dense icon="close" v-close-popup />
                </q-card-section>
                <q-card-section class="q-gutter-y-sm q-pt-md">
                    <q-input v-model="newTask.title" label="Título *" outlined dense
                        :rules="[val => !!val || 'El título es requerido']" />
                    <q-input v-model="newTask.description" label="Descripción" outlined dense type="textarea"
                        rows="3" />
                    <q-input v-model="newTask.finalDate" label="Fecha límite" outlined dense type="date" />
                </q-card-section>
                <q-card-actions class="q-pa-md" align="right">
                    <q-btn flat label="Cancelar" no-caps color="grey-6" v-close-popup />
                    <q-btn color="primary" label="Crear tarea" no-caps unelevated rounded :loading="creating"
                        @click="createTask" />
                </q-card-actions>
            </q-card>
        </q-dialog>

        <!-- Dialog editar tarea -->
        <q-dialog v-model="editDialog">
            <q-card class="dialog-card">
                <q-card-section class="row items-center q-pb-none">
                    <div class="text-h6 text-weight-bold">Editar tarea</div>
                    <q-space />
                    <q-btn flat round dense icon="close" v-close-popup />
                </q-card-section>
                <q-card-section class="q-gutter-y-sm q-pt-md">
                    <q-input v-model="editTask.title" label="Título *" outlined dense
                        :rules="[val => !!val || 'El título es requerido']" />
                    <q-input v-model="editTask.description" label="Descripción" outlined dense type="textarea"
                        rows="3" />
                    <q-input v-model="editTask.finalDate" label="Fecha límite" outlined dense type="date" />
                </q-card-section>
                <q-card-actions class="q-pa-md" align="right">
                    <q-btn flat label="Cancelar" no-caps color="grey-6" v-close-popup />
                    <q-btn color="primary" label="Guardar cambios" no-caps unelevated rounded :loading="editing"
                        @click="updateTask" />
                </q-card-actions>
            </q-card>
        </q-dialog>

        <!-- Dialog confirmar eliminación -->
        <q-dialog v-model="deleteDialog">
            <q-card class="dialog-card">
                <q-card-section class="text-center q-pt-lg">
                    <q-icon name="delete_outline" color="negative" size="48px" />
                    <div class="text-h6 text-weight-bold q-mt-sm">Eliminar tarea</div>
                    <div class="text-body2 text-grey-6 q-mt-xs">
                        ¿Estás seguro de que quieres eliminar <strong>{{ taskToDelete?.title }}</strong>?
                    </div>
                </q-card-section>
                <q-card-actions class="q-pa-md q-gutter-x-sm" align="center">
                    <q-btn flat label="Cancelar" no-caps color="grey-6" rounded v-close-popup
                        style="min-width: 120px" />
                    <q-btn color="negative" label="Eliminar" no-caps unelevated rounded :loading="deleting"
                        @click="deleteTask" style="min-width: 120px" />
                </q-card-actions>
            </q-card>
        </q-dialog>

    </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useQuasar } from 'quasar'
import { useApi } from 'src/composables/useApi'

const $q = useQuasar()
const { get, post, put, remove } = useApi()

const tasks = ref([])
const loading = ref(false)
const error = ref(null)

const createDialog = ref(false)
const creating = ref(false)
const newTask = ref({ title: '', description: '', finalDate: '' })

const editDialog = ref(false)
const editing = ref(false)
const editTask = ref({ id: null, title: '', description: '', finalDate: '' })

const deleteDialog = ref(false)
const deleting = ref(false)
const taskToDelete = ref(null)

async function fetchTasks() {
    loading.value = true
    error.value = null
    try {
        tasks.value = await get('/api/tasks')
    } catch (err) {
        error.value = err.message ?? 'Error al cargar las tareas'
    } finally {
        loading.value = false
    }
}

function openCreateDialog() {
    newTask.value = { title: '', description: '', finalDate: '' }
    createDialog.value = true
}

async function createTask() {
    if (!newTask.value.title.trim()) return
    creating.value = true
    try {
        const created = await post('/api/tasks', newTask.value)
        tasks.value.unshift(created)
        createDialog.value = false
        $q.notify({ type: 'positive', message: 'Tarea creada correctamente', position: 'top', timeout: 2000 })
    } catch (err) {
        $q.notify({ type: 'negative', message: err.message ?? 'Error al crear la tarea', position: 'top' })
    } finally {
        creating.value = false
    }
}

function openEditDialog(task) {
    editTask.value = { ...task }
    editDialog.value = true
}

async function updateTask() {
    if (!editTask.value.title.trim()) return
    editing.value = true
    try {
        const updated = await put(`/api/tasks/${editTask.value.id}`, editTask.value)
        const index = tasks.value.findIndex(t => t.id === updated.id)
        if (index !== -1) tasks.value[index] = updated
        editDialog.value = false
        $q.notify({ type: 'positive', message: 'Tarea actualizada correctamente', position: 'top', timeout: 2000 })
    } catch (err) {
        $q.notify({ type: 'negative', message: err.message ?? 'Error al actualizar la tarea', position: 'top' })
    } finally {
        editing.value = false
    }
}

function confirmDelete(task) {
    taskToDelete.value = task
    deleteDialog.value = true
}

async function deleteTask() {
    deleting.value = true
    try {
        await remove(`/api/tasks/${taskToDelete.value.id}`)
        tasks.value = tasks.value.filter(t => t.id !== taskToDelete.value.id)
        deleteDialog.value = false
        $q.notify({ type: 'positive', message: 'Tarea eliminada correctamente', position: 'top', timeout: 2000 })
    } catch (err) {
        $q.notify({ type: 'negative', message: err.message ?? 'Error al eliminar la tarea', position: 'top' })
    } finally {
        deleting.value = false
    }
}

onMounted(fetchTasks)
</script>

<style scoped>
.task-card {
    background: white;
    border-radius: 12px;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.06);
    transition: box-shadow 0.2s, transform 0.2s;
}

.task-card:hover {
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
    transform: translateY(-1px);
}

.dialog-card {
    min-width: 380px;
    border-radius: 16px;
}
</style>