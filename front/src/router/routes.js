
const routes = [
  {
    path: '/auth',
    component: () => import('layouts/AuthLayout.vue'),
    children: [
      { path: '', component: () => import('pages/auth/Index.vue') },
      { path: 'signup', component: () => import('pages/auth/Signup.vue') },
      { path: 'forgotPassword', component: () => import('pages/auth/ForgotPassword.vue') }
    ]
  },
  {
    path: '/home',
    component: () => import('layouts/HomeLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
