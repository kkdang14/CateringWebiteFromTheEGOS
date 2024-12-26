import { createRouter, createWebHistory } from 'vue-router';
import authService from '@/services/auth.service';
import { toast } from 'vue3-toastify';

async function checkAdminAccess(to, from, next) {
    try {
        const user = await authService.checkToken();
        console.log('User:', user);

        if (user.success) {
            next();
        } else {
            alert(user.message || 'You do not have permission to access this page');
            next({ path: '/auth/adminLogin' });
        }
            
    } catch (error) {
        console.error('Error checking admin access', error);
        alert("Error checking Admin access");
        next('/');
    }
}

async function checkAdminPermission(to, from, next) { 
    try {
        const user = await authService.checkToken();
        console.log('User:', user);

        if (user.success) {
            if (user.isAdmin !== 0) {
                next();
            } else {
                toast.error('You do note have permission to access this page!', {
                    autoClose: 1200,
                })
                next('/admin');
            }
        } else {
            alert(user.message || 'You do not have permission to access this page');
            next({ path: '/auth/adminLogin' });
        }
            
    } catch (error) {
        console.error('Error', error);
        alert("Error checking Admin permission");
        next('/admin');
    }
}


const routes = [
    {
        path: "/",
        name: "defaut",
        component: () => import('@/layouts/defaultLayout.vue'),
        children: [
            {
                path: "",
                name: "Home",
                component: () => import('@/views/default/home.vue'),
                meta: { title: 'Home' },
            },

            {
                path: "catering",
                name: "Catering",
                component: () => import('@/views/default/catering.vue'),
                meta: { title: 'Catering' },
            }
        ]
    },

    {
        path: "/auth",
        component: () => import('@/layouts/authLayout.vue'),
        children: [
            {
                path: "login",
                name: "Login",
                component: () => import('@/views/auth/login.vue'),
                meta: { title: 'Login' }
            },
            {
                path: "register",
                name: "Register",
                component: () => import('@/views/auth/register.vue'),
                meta: { title: 'Register' }
            },

            {
                path: "adminLogin", 
                name: "AdminLogin",
                component: () => import('@/views/auth/adminLogin.vue'),
                meta: { title: 'Admin Login' }
            },
        ],
    },

    {
        path: "/admin",
        name: "Admin",
        component: () => import('@/layouts/adminLayout.vue'),
        meta: { title: 'Admin' },
        beforeEnter: checkAdminAccess,
        children: [
            {
                path: "dashboard",
                name: "Dashboard",
                component: () => import('@/views/admin/dashboard.admin.vue'),
                meta: { title: 'Dashboard' },
            }, 

            {
                path: "product-management",
                name: "ProductManagement",
                component: () => import('@/views/admin/product.admin.vue'),
                meta: { title: 'Product Management' },
            },

            {
                path: "user-management",
                name: "UserManagement",
                component: () => import('@/views/admin/user.admin.vue'),
                meta: { title: 'User Management' },
                beforeEnter: checkAdminPermission,
            },

            {
                path: "order-management",
                name: "OrderManagement",
                component: () => import('@/views/admin/order.admin.vue'),
                meta: { title: 'Order Management' },
            },   
        ]
    },
];


const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

export default router;