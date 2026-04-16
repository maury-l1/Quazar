<template>
    <q-page class="login-page flex flex-center">
        <div class="login-wrapper">

            <div class="login-header q-mb-lg text-center">
                <div class="logo-circle q-mb-md">
                    <q-icon name="task_alt" size="28px" color="white" />
                </div>
                <div class="text-h5 text-weight-bold text-grey-9">Bienvenido</div>
                <div class="text-body2 text-grey-5 q-mt-xs">Inicia sesión en tu cuenta</div>
            </div>

            <q-card flat class="login-card">
                <q-card-section class="q-pa-xl">
                    <q-form @submit.prevent="onSubmit" class="q-gutter-y-sm">

                        <div class="text-caption text-weight-medium text-grey-7 q-mb-xs">Correo electrónico</div>
                        <q-input v-model="email" type="email" placeholder="tu@email.com" outlined dense
                            bg-color="grey-1" :rules="[val => !!val || 'El correo es requerido']">
                            <template #prepend>
                                <q-icon name="mail_outline" color="grey-5" size="18px" />
                            </template>
                        </q-input>

                        <div class="text-caption text-weight-medium text-grey-7 q-mb-xs q-mt-md">Contraseña</div>
                        <q-input v-model="password" :type="showPassword ? 'text' : 'password'" placeholder="••••••••"
                            outlined dense bg-color="grey-1" :rules="[val => !!val || 'La contraseña es requerida']">
                            <template #prepend>
                                <q-icon name="lock_outline" color="grey-5" size="18px" />
                            </template>
                            <template #append>
                                <q-icon :name="showPassword ? 'visibility_off' : 'visibility'"
                                    class="cursor-pointer text-grey-5" size="18px"
                                    @click="showPassword = !showPassword" />
                            </template>
                        </q-input>

                        <div class="row items-center justify-between q-mt-xs">
                            <q-checkbox v-model="rememberMe" label="Recordarme" dense color="primary" size="sm" />
                            <q-btn flat dense no-caps label="¿Olvidaste tu contraseña?" color="primary"
                                class="text-caption" padding="0" />
                        </div>

                        <q-btn type="submit" label="Iniciar sesión" color="primary" unelevated no-caps
                            class="full-width q-mt-lg login-btn" :loading="loading" size="md">
                            <template #loading>
                                <q-spinner-dots color="white" size="20px" />
                            </template>
                        </q-btn>

                        <div class="row items-center q-my-sm">
                            <q-separator class="col" />
                            <span class="text-caption text-grey-5 q-mx-md">o continúa con</span>
                            <q-separator class="col" />
                        </div>

                        <q-btn @click="loginWithGithub" unelevated no-caps class="full-width login-btn github-btn"
                            size="md">
                            <q-icon name="mdi-github" size="20px" class="q-mr-sm" />
                            Iniciar sesión con GitHub
                        </q-btn>

                    </q-form>
                </q-card-section>

                <q-separator />

                <q-card-section class="text-center q-py-md bg-grey-1">
                    <span class="text-caption text-grey-6">¿No tienes cuenta? </span>
                    <q-btn flat dense no-caps label="Regístrate aquí" color="primary" class="text-caption"
                        padding="0 4px" />
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

const email = ref('')
const password = ref('')
const rememberMe = ref(false)
const showPassword = ref(false)
const loading = ref(false)

function loginWithGithub() {
    window.location.href = 'http://localhost:3000/auth/github'
}

async function onSubmit() {
    loading.value = true
    try {
        await post('/api/auth/login', { email: email.value, password: password.value })
        $q.notify({ type: 'positive', message: '¡Sesión iniciada correctamente!', position: 'top', timeout: 2000 })
        router.push('/List')
    } catch (err) {
        $q.notify({ type: 'negative', message: err.message ?? 'Credenciales incorrectas.', position: 'top' })
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

.github-btn {
    background: #24292e;
    color: white;
}

.github-btn:hover {
    background: #1a1e22;
}
</style>