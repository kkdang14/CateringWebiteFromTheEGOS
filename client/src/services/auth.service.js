import createApiClient from "./api.service"

class AuthService {
    constructor(baseUrl = "http://localhost:3000/api/v1/auth/") {
        this.apiClient = createApiClient(baseUrl)
    }

    async register(credentials) {
        try {
            const response = await this.apiClient.post("/register", credentials)
            console.log(response);
            return response
        } catch (error) {
            console.log(error)
        }
    }

    async login(credentials){
        try {
            const response = await this.apiClient.post("/login", credentials)
            console.log(response.data.message);
            return response.data.payload;
        } catch (error) {
            console.error("Login failed:", error.response?.data?.message || error.message);
            throw error;
        }
    };

    async logout(){
        try {
            const response = await this.apiClient.post('/logout');
            console.log(response.data.message);
        } catch (error) {
            console.error("Logout failed:", error.response?.data?.message || error.message);
            throw error;
        }
    };

    async adminlogin(credentials){
        try {
            const response = await this.apiClient.post("/adminLogin", credentials)
            console.log(response.data.message);
            return response.data.payload;
        } catch (error) {
            console.error("Login failed:", error.response?.data?.message || error.message);
            throw error;
        }
    };

    async checkToken() {
        try {
            const response = await this.apiClient.get('/verify-admin');
            console.log("Access granted:", response.data.user);
            return { success: true, user: response.data.user };
        } catch (error) {
            console.error('Lỗi kiểm tra quyền Admin:', error.response?.data?.message || error.message);
            return { 
                success: false, 
                message: error.response?.data?.message || 'Có lỗi xảy ra khi kiểm tra quyền Admin' 
            };
        }
    }

    async checkProtected() {
        try {
            const response = await apiClient.get('/protected');
            console.log("Access granted:", response.data.user);
            return response.data.user; // User được giải mã từ token
        } catch (error) {
            console.error("Access denied:", error.response?.data?.message || error.message);
            return null; // Không có quyền truy cập
        }
    }

    async checkLogin() {
        try {
            const response = await this.apiClient.get('/check-login');
            console.log("Check Login API Response:", response.data);
            return response.data.user; // Ensure this matches your API's response structure
        } catch (error) {
            console.error("Error in Check Login API:", error.response?.data || error.message);
            return null; // Return null if not logged in
        }
    }
}

export default new AuthService();