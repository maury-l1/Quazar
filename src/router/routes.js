const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/IndexPage.vue') },
      { path: 'Login', component: () => import('pages/LoginPage.vue') },
      { path: 'List', component: () => import('pages/ListPage.vue') },
      { path: 'Register', component: () => import('pages/RegisterPage.vue') },
      
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
]

export default routes
