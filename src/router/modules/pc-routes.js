export default [
  {
    path: '/',
    name: 'main',
    component: () => import('../../views/layout/index.vue'),
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('../../views/main/index.vue')
      },
      {
        path: '/profile',
        name: 'profile',
        component: () => import('../../views/profile/index.vue'),
        meta: {
          user: true
        }
      },
      {
        path: '/member',
        name: 'member',
        component: () => import('../../views/member/index.vue'),
        meta: {
          user: true
        }
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../../views/login-register/login/index.vue')
  }
]
