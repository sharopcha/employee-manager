import Vue from 'vue';
import VueRouter from 'vue-router';
import Dashboard from '@/views/Dashboard';
import NewEmployee from '@/views/newEmployee';
import ViewEmployee from '@/views/viewEmployee';
import EditEmployee from '@/views/editEmployee';
import Login from '@/views/login';
import Register from '@/views/register';
import firebase from 'firebase';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'dashboard',
    component: Dashboard,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {
      requiresGuest: true,
    },
  },
  {
    path: '/register',
    name: 'register',
    component: Register,
    meta: {
      requiresGuest: true,
    },
  },
  {
    path: '/new',
    name: 'new-employee',
    component: NewEmployee,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/edit/:employee_id',
    name: 'edit-employee',
    component: EditEmployee,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/:employee_id',
    name: 'view-employee',
    component: ViewEmployee,
    meta: {
      requiresAuth: true,
    },
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

// nav guards
router.beforeEach((to, from, next) => {
  // check for required auth guard
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    // check if NOT logged in
    if (!firebase.auth().currentUser) {
      // go to login page
      next({
        path: '/login',
        query: { redirect: to.fullPath },
      });
    } else {
      // preceed to route
      next();
    }
  } else if (to.matched.some((record) => record.meta.requiresGuest)) {
    // check if user IS logged in
    if (firebase.auth().currentUser) {
      // go to dashboard page
      next({ path: '/', query: { redirect: to.fullPath } });
    } else {
      // preceed to route
      next();
    }
  } else {
    next();
  }
});

export default router;
