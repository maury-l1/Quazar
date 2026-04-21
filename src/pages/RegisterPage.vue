<template>
    <q-page class="login-page flex flex-center">
        <div class="login-wrapper">

            <div class="login-header q-mb-lg text-center">
                <div class="logo-circle q-mb-md">
                    <q-icon name="task_alt" size="28px" color="white" />
                </div>
                <div class="text-h5 text-weight-bold text-grey-9">Crear cuenta</div>
                <div class="text-body2 text-grey-5 q-mt-xs">Regístrate para empezar</div>
            </div>

            <q-card flat class="login-card">
                <q-card-section class="q-pa-xl">
                    <q-form @submit.prevent="onSubmit" class="q-gutter-y-sm">

                        <div class="text-caption text-weight-medium text-grey-7 q-mb-xs">Nombre</div>
                        <q-input v-model="name" type="text" placeholder="Tu nombre" outlined dense bg-color="grey-1"
                            :rules="[val => !!val || 'El nombre es requerido']">
                            <template #prepend>
                                <q-icon name="person_outline" color="grey-5" size="18px" />
                            </template>
                        </q-input>

                        <div class="text-caption text-weight-medium text-grey-7 q-mb-xs q-mt-md">Correo electrónico
                        </div>
                        <q-input v-model="email" type="email" placeholder="tu@email.com" outlined dense
                            bg-color="grey-1" :rules="[val => !!val || 'El correo es requerido']">
                            <template #prepend>
                                <q-icon name="mail_outline" color="grey-5" size="18px" />
                            </template>
                        </q-input>

                        <div class="text-caption text-weight-medium text-grey-7 q-mb-xs q-mt-md">Contraseña</div>
                        <q-input v-model="password" :type="showPassword ? 'text' : 'password'" placeholder="••••••••"
                            outlined dense bg-color="grey-1"
                            :rules="[val => !!val || 'La contraseña es requerida', val => val.length >= 6 || 'Mínimo 6 caracteres']">
                            <template #prepend>
                                <q-icon name="lock_outline" color="grey-5" size="18px" />
                            </template>
                            <template #append>
                                <q-icon :name="showPassword ? 'visibility_off' : 'visibility'"
                                    class="cursor-pointer text-grey-5" size="18px"
                                    @click="showPassword = !showPassword" />
                            </template>
                        </q-input>

                        <div class="text-caption text-weight-medium text-grey-7 q-mb-xs q-mt-md">Confirmar contraseña
                        </div>
                        <q-input v-model="confirmPassword" :type="showConfirm ? 'text' : 'password'"
                            placeholder="••••••••" outlined dense bg-color="grey-1"
                            :rules="[val => !!val || 'Confirma tu contraseña', val => val === password || 'Las contraseñas no coinciden']">
                            <template #prepend>
                                <q-icon name="lock_outline" color="grey-5" size="18px" />
                            </template>
                            <template #append>
                                <q-icon :name="showConfirm ? 'visibility_off' : 'visibility'"
                                    class="cursor-pointer text-grey-5" size="18px"
                                    @click="showConfirm = !showConfirm" />
                            </template>
                        </q-input>

                        <q-btn type="submit" label="Crear cuenta" color="primary" unelevated no-caps
                            class="full-width q-mt-lg login-btn" :loading="loading" size="md">
                            <template #loading>
                                <q-spinner-dots color="white" size="20px" />
                            </template>
                        </q-btn>

                    </q-form>
                </q-card-section>

                <q-separator />

                <q-card-section class="text-center q-py-md bg-grey-1">
                    <span class="text-caption text-grey-6">¿Ya tienes cuenta? </span>
                    <q-btn flat dense no-caps label="Inicia sesión" color="primary" class="text-caption" padding="0 4px"
                        to="/Login" />
                </q-card-section>
            </q-card>

        </div>
    </q-page>
</template>

<script setup>
import { ref } from 'vue'
import { useQuasar } from 'quasar'
import { useApi } from 'src/composables/useApi'
import { useRouter } from 'vue-router'

const $q = useQuasar()
const { post } = useApi()
const router = useRouter()

const name = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const showPassword = ref(false)
const showConfirm = ref(false)
const loading = ref(false)

async function onSubmit() {
    loading.value = true
    try {
        await post('/api/auth/register', {
            name: name.value,
            email: email.value,
            password: password.value
        })
        $q.notify({ type: 'positive', message: '¡Cuenta creada correctamente!', position: 'top', timeout: 2000 })
        router.push('/List')
    } catch (err) {
        $q.notify({ type: 'negative', message: err.message ?? 'Error al crear la cuenta.', position: 'top' })
    } finally {
        loading.value = false
    }
}
</script>

<style scoped>
.login-page {
    background: #f0f2f5;
    min-height: 100vh;
}

.login-wrapper {
    width: 100%;
    max-width: 420px;
    padding: 1.5rem;
}

.logo-circle {
    width: 60px;
    height: 60px;
    border-radius: 16px;
    background: var(--q-primary, #1976d2);
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
    box-shadow: 0 8px 24px rgba(25, 118, 210, 0.3);
}

.login-card {
    border-radius: 16px;
    box-shadow: 0 4px 24px rgba(0, 0, 0, 0.06);
    overflow: hidden;
}

.login-btn {
    border-radius: 8px;
    height: 44px;
    font-size: 14px;
    font-weight: 500;
    letter-spacing: 0.3px;
}
</style>