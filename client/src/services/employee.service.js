import createApiClient from "./api.service"

class EmployeeService {
    constructor(baseUrl = "http://localhost:3000/api/v1/employees"){
        this.apiClient = createApiClient(baseUrl)
    }

    async addEmployee(employeeData) {
        try {
            const response = await this.apiClient.post('/add', employeeData);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async getAllEmployees() {
        try {
            const response = await this.apiClient.get('/list');
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async getEmployeeById(userId) {
        try {
            const response = await this.apiClient.get(`/getById/${userId}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async updateEmployee(userId, userData) {
        try {
            const response = await this.apiClient.put(`/update/${userId}`, userData);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async deleteProductCart(userId, cart) {
        try {
            const response = await this.apiClient.put(`/${userId}`, { cart });
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async deleteEmployee(userId) {
        try {
            const response = await this.apiClient.delete(`/delete/${userId}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
}

export default new EmployeeService();
