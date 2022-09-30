export default [
  {
    path: '/',
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
