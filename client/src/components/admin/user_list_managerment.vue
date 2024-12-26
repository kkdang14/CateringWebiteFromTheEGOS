<template>
    <div class="user-list_container">
        <div class="user-list">
            <!-- Customers Section -->
            <div class="user-list__section">
                <h2 @click="toggleCustomers">
                    Customers
                    <i :class="showCustomers ? 'fa-solid fa-chevron-up' : 'fa-solid fa-chevron-down'"></i>
                </h2>
                <div v-show="showCustomers" class="table-wrapper">
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="customer in customers" :key="customer.CustomerID">
                                <td>{{ customer.Name }}</td>
                                <td>{{ customer.Email }}</td>
                                <td>
                                    <button @click="lookUser(customer)" class="btn btn-look">👁️</button>
                                    <button @click="updateUser(customer)" class="btn btn-update">✏️</button>
                                    <button @click="deleteUser(customer)" class="btn btn-delete">🗑️</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <!-- Employees Section -->
            <div class="user-list__section">
                <h2 @click="toggleEmployees">
                    Employees
                    <i :class="showEmployees ? 'fa-solid fa-chevron-up' : 'fa-solid fa-chevron-down'"></i>
                </h2>
                <div v-show="showEmployees" class="table-wrapper">
                    <button class="addBtn" @click="toggleAddEmployee">Add Employee</button>
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="employee in employees" :key="employee.EmployeeID">
                                <td>{{ employee.Name }}</td>
                                <td>{{ employee.Email }}</td>
                                <td>
                                    <button @click="lookUser(employee)" class="btn btn-look">👁️</button>
                                    <button @click="updateUser(employee)" class="btn btn-update">✏️</button>
                                    <button @click="deleteUser(employee)" class="btn btn-delete">🗑️</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <addEmployeeModal v-show="showAddEmployeeModal" @close="showAddEmployeeModal = false"/>
    </div>
</template>




<script>
import addEmployeeModal from '../../components/admin/addEmployeeModal.vue';
export default {
    name: "UserListManagement",
    components: {
        addEmployeeModal
    },
    props: {
        customers: {
            type: Array,
            required: true
        },
        employees: {
            type: Array,
            required: true
        }
    },
    data() {
        return {
            showCustomers: false, 
            showEmployees: false,
            showAddEmployeeModal: false,
        };
    },
    methods: {
        toggleAddEmployee() {
            this.showAddEmployeeModal = !this.showAddEmployeeModal;
        },

        toggleCustomers() {
            this.showCustomers = !this.showCustomers;
        },
        toggleEmployees() {
            this.showEmployees = !this.showEmployees;
        }
    }
};
</script>

<style scoped>
/* Container styles */
.user-list_container {
    max-width: 1100;
    height: 500px;
    margin: 30px auto;
    padding: 20px;
    background: #fffaf5;
    border-radius: 12px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    font-family: 'Arial', sans-serif;
    overflow: hidden;
}

.user-list{
    overflow-y: scroll;
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
}

/* Section Styles */
.user-list__section {
    margin-bottom: 30px;
    border: 1px solid #ffd9b3;
    border-radius: 8px;
    background: #fff0e6;
    transition: box-shadow 0.3s ease;
    width: 85%;
}

.user-list__section:hover {
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.15);
}

.user-list__section h2 {
    padding: 15px;
    font-size: 1.2rem;
    font-weight: bold;
    color: #e67337;
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    background: #ffe8d9;
    transition: background 0.3s ease;
}

.user-list__section h2:hover {
    background: #ffd9b3;
}

.user-list__section i {
    font-size: 1rem;
    color: #e67337;
}

/* Table Wrapper for Scroll */
.table-wrapper {
    max-height: 350px; /* Set the height for scrollable area */ 
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    overflow-y: auto;
    overflow-x: hidden;
}

.addBtn{
    width: 20%;
    padding: 8px;
    margin: 8px 10px;
}

/* Table Styles */
table {
    width: 100%;
    border-collapse: collapse;
    margin: 8px 0;
    table-layout: fixed; /* Ensure columns are evenly distributed */
}

th, td {
    padding: 12px 15px;
    text-align: center;
    border-bottom: 1px solid #ffd9b3;
    vertical-align: middle;
}

th {
    background: #ffdbac;
    font-weight: bold;
    color: #e67337;
}

td {
    background: #fff5eb;
}

/* Set width for each column */
th:nth-child(1), td:nth-child(1) {
    width: 33%;  /* Cột Name */
}

th:nth-child(2), td:nth-child(2) {
    width: 33%;  /* Cột Email */
}

th:nth-child(3), td:nth-child(3) {
    width: 34%;  /* Cột Actions */
}

/* Căn chỉnh cho các nút bên trong bảng */
td button {
    margin-right: 8px;
    padding: 6px 10px;
    font-size: 0.9rem;
    font-weight: bold;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    transition: background 0.3s ease;
}

/* Button Styles */
.btn-look {
    background: #6c9dd1;
    color: #fff;
}

.btn-look:hover {
    background: #527cad;
}

.btn-update {
    background: #ffcc66;
    color: #fff;
}

.btn-update:hover {
    background: #e6b347;
}

.btn-delete {
    background: #e67373;
    color: #fff;
}

.btn-delete:hover {
    background: #c55f5f;
}

/* Scrollbar Styles */
.table-wrapper::-webkit-scrollbar {
    width: 8px;
}

.table-wrapper::-webkit-scrollbar-thumb {
    background-color: #ff8c42;  /* Orange color */
    border-radius: 10px;
}

.table-wrapper::-webkit-scrollbar-track {
    background: #fff5eb;  /* Light background to contrast */
}

.user-list::-webkit-scrollbar {
    width: 8px;
}

.user-list::-webkit-scrollbar-thumb {
    background-color: #ff8c42;  /* Orange color */
    border-radius: 10px;
}

.user-list::-webkit-scrollbar-track {
    background: #fff5eb;  /* Light background to contrast */
}

</style>
