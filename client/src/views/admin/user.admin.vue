<template>
    <div class="user-container">
        <h1>User Management</h1>
        <user_list_managerment :customers="customers" :employees="employees"></user_list_managerment>
    </div>
</template>

<script>
import user_list_managerment from '../../components/admin/user_list_managerment.vue';
import customerService from '../../services/customer.service';
import employeeService from '../../services/employee.service';
export default {
    name: "DashboardPage",
    components: {
        user_list_managerment
    },
    data() {
        return {
            customers: [],
            employees: [],
        };
    },

    created() {
        this.fetchCustomer();
        this.fetchEmployee();
    },

    methods: {
        async fetchCustomer() {
            try {
                const response = await customerService.getAllCustomers();
                this.customers = Array.isArray(response.data) ? response.data[0] || [] : [];
                console.log("Customers:", this.customers);
            } catch (error) {
                console.error("Error during fetching user:", error.response?.data || error.message);
            }
        },

        async fetchEmployee() {
            try {
                const response = await employeeService.getAllEmployees();
                this.employees = Array.isArray(response.data) ? response.data[0] || [] : [];
                console.log("Employees:", this.employees);
            } catch (error) {
                console.error("Error during fetching employee:", error.response?.data || error.message);
            }
        },
    },
};
</script>

<style scoped>
.user-container {
    width: 100%;
    color: #e67337; 
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 8px;
    background-color: #f9f9f9;
    height: 100%;
    overflow:hidden;
}

</style>
