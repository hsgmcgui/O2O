import Vue from 'vue'
import VueRouter from 'vue-router'
import SignIn from '../views/SignIn.vue'

Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'SignIn',
        component: SignIn
    },
    {
        path: '/register',
        name: 'Register',
        component: () =>
            import ( /* webpackChunkName: "about" */ '../views/Register.vue'),
    },
    {
        path: '/home',
        name: 'Home',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "about" */ '../views/Home.vue'),
        children: [{
            path: '/',
            name: 'Index',
            component: () =>
                import ( /* webpackChunkName: "about" */ '../views/Index.vue'),
        }, {
            path: '/order',
            name: 'Order',
            component: () =>
                import ( /* webpackChunkName: "about" */ '../views/Order.vue'),
        }, {
            path: '/my',
            name: 'My',
            component: () =>
                import ( /* webpackChunkName: "about" */ '../views/My.vue'),
        }]
    }, {
        path: '/seller/:id',
        name: 'Seller',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "about" */ '../views/Seller.vue'),
    }, {
        path: '/delicacy',
        name: 'Delicacy',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "about" */ '../views/Delicacy.vue'),
    }, {
        path: '/comment',
        name: 'Comment',
        component: () =>
            import ( /* webpackChunkName: "about" */ '../views/Comment.vue'),
    }, {
        path: '/payment',
        name: 'Payment',
        component: () =>
            import ( /* webpackChunkName: "about" */ '../views/Payment.vue'),
    }, {
        path: '/search',
        name: 'Search',
        component: () =>
            import ( /* webpackChunkName: "about" */ '../views/Search.vue'),
    }
]

const router = new VueRouter({
    routes
})

export default router