<template>
    <div class="modal-overlay">
        <div class="modal">
            <h2>Add New Employee</h2>
            <form @submit.prevent="submitForm">
                <label for="name">Name:</label>
                <input v-model="employee.name" type="text" id="name" required />

                <label for="username">Username:</label>
                <input v-model="employee.username" type="text" id="username" required />

                <label for="email">Email:</label>
                <input v-model="employee.email" type="email" id="email" required />

                <label for="phone">Phone:</label>
                <input v-model="employee.phone" type="text" id="phone" />

                <label for="address">Address:</label>
                <input v-model="employee.address" type="text" id="address" />

                <label for="note">Note:</label>
                <textarea v-model="employee.note" id="note"></textarea>

                <label for="admin">Admin:</label>
                <select v-model="employee.admin" id="admin">
                    <option value="0">No</option>
                    <option value="1">Yes</option>
                </select>

                <label for="photo">Photo URL:</label>
                <input v-model="employee.photo" type="text" id="photo" />

                <div class="modal-actions">
                    <button type="submit" class="btn btn-add" :disabled="loading">
                        {{ loading ? 'Adding...' : 'Add' }}
                    </button>
                    <button type="button" @click="closeModal" class="btn btn-cancel">Cancel</button>
                </div>
            </form>
            <p v-if="error" class="error">{{ error }}</p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'AddEmployeeModal',
    data() {
        return {
            employee: {
                name: '',
                username: '',
                password: '',
                phone: '',
                email: '',
                address: '',
                note: '',
                admin: '0',
                photo: '',
            },
            loading: false,
            error: null,
        };
    },
    methods: {
        async submitForm() {
            this.loading = true;
            this.error = null;

            try {
                const response = await fetch('/api/employees', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(this.employee),
                });

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.message || 'Failed to add employee');
                }

                this.$emit('employee-added', data);
                this.closeModal();
            } catch (err) {
                this.error = err.message || 'An error occurred';
            } finally {
                this.loading = false;
            }
        },
        closeModal() {
            this.$emit('close');
        },
    },
};
</script>

<style scoped>
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
}

.modal {
    background: #fff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.25);
    width: 400px;
    max-width: 90%;
    overflow-y: auto;
    max-height: 90%;
    display: flex;
    flex-direction: column;
}

.modal h2 {
    margin-bottom: 15px;
    font-size: 1.5rem;
    color: #333;
    text-align: center;
}

.modal form label {
    display: block;
    margin-top: 10px;
    font-weight: bold;
    color: #555;
}

.modal form input,
.modal form select,
.modal form textarea {
    width: calc(100% - 20px);
    padding: 8px;
    margin-top: 5px;
    border: 1px solid #ddd;
    border-radius: 6px;
}

.modal-actions {
    display: flex;
    justify-content: space-between;
    margin-top: 15px;
}

.btn-add {
    background: #28a745;
    color: #fff;
    padding: 8px 12px;
}

.btn-cancel {
    background: #dc3545;
    color: #fff;
    padding: 8px 12px;
}

.error {
    margin-top: 10px;
    color: red;
    font-size: 0.9rem;
}
</style>
