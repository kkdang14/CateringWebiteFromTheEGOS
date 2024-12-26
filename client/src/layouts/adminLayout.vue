<template>
    <div class="admin-container">
        <div class="admin__sidebar">
            <AdminSidebar />
        </div>
        <div class="router_content">
            <div class="welcome-admin" v-if="$route.path === '/admin'">
                <h1>Hello admin, Welcome Admin Dashboard</h1>
            </div>
            <router-view class="views" v-else></router-view>
        </div>
    </div>
</template>

<script>
import AdminSidebar from '@/components/admin/sidebar.vue'
export default {
    name: 'AdminLayout',
    components: {
        AdminSidebar
    }
}
</script>

<style scoped>
    .admin-container {
        display: flex;
        height: 100vh;
        flex-direction: row;
    }

    .admin-sidebar {
        width: 100px;
        height: 100%;
        background-color: #f4f4f4;
    }

    .router_content {
        flex: 1;
        padding: 20px;
    }

    .welcome-admin {
        height: 100%;
        color: #e67337; 
        text-align: center;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .views{
        overflow: scroll;
    }
</style>