import Vue from 'vue';
import VueRouter from 'vue-router';
// import store from '../store/index';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: '',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/formCV/Index.vue'),
    meta: {
      title: 'PdfCV',
    },
    children: [
      // {
      //   path: '/',
      //   name: 'DashBoard',
      //   component: () => import('../views/formCV/Index.vue'),
      //   meta: {
      //     title: '',
      //   },
      // },
    ],
  },
  {
    path: '*',
    name: 'pageNotFound',
    component: () => import('../views/pageNotFound/NotFound.vue'),
    meta: {
      title: 'PdfCV',
      screenName: 'PageNotFound',
    },
  },
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

// router.beforeEach(async (to, from, next) => {
//   const isLoggedIn = !!store.getters['common/TOKEN'];
//   document.title = to.meta.title;
//   if (to.fullPath === '/pageNotFound'
//     || to.fullPath === '/login') {
//     next();
//     return;
//   }
//   if (to.matched.some((record) => record.meta.requiresAuth)) {
//     if (isLoggedIn) {
//       if (to.requiresAuth) {
//         const { path } = to;
//         if (path !== '/') {
//           if (!this.privilegeMenu([path])) next('/login');
//         }
//       }
//       next();
//     } else {
//       next('/login');
//     }
//   } else {
//     if (isLoggedIn && to.name === 'Login') {
//       next('/');
//       return;
//     }
//     next();
//   }
// });

export default router;
