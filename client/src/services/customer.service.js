import createApiClient from "./api.service"

class CustomerService {
    constructor(baseUrl = "http://localhost:3000/api/v1/customers"){
        this.apiClient = createApiClient(baseUrl)
    }   

    async getAllCustomers() {
        try {
            const response = await this.apiClient.get('/getall');
            return response.data;
        } catch (error) {
            throw error;
        }
    }


    async getCustomerById(userId) {
        try {
            const response = await this.apiClient.get(`/get/${userId}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async updateCustomer(userId, userData) {
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

    async deleteCustomer(userId) {
        try {
            const response = await this.apiClient.delete(`/delete/${userId}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async deleteAllCustomers() { 
        try {
            const response = await this.apiClient.delete('/deleteall');
            return response.data;
        } catch (error) {
            throw error;
        }
    }
}

export default new CustomerService();
