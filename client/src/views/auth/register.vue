<template>
    <div class="register-page">
        <h2>Register</h2>

        <div class="section-container">
            <!-- Personal Information Section -->
            <div class="section">
                <h3>Personal Information</h3>
                <form @submit.prevent="handleSubmit" class="register-form">

                    <div class="form-group">
                        <label for="name">Name</label>
                        <input v-model="formData.name" type="text" id="name" required placeholder="Enter your name" />
                    </div>

                    <div class="form-group">
                        <label for="username">Username</label>
                        <input v-model="formData.username" type="text" id="username" required
                            placeholder="Enter your username" />
                    </div>

                    <div class="form-group">
                        <label for="password">Password</label>
                        <input v-model="formData.password" type="password" id="password" required
                            placeholder="Enter your password" />
                    </div>

                    <div class="form-group">
                        <label for="retypePassword">Retype Password</label>
                        <input v-model="formData.retypePassword" type="password" id="retypePassword" required
                            placeholder="Retype your password" />
                    </div>

                </form>
            </div>

            <!-- Contact Information Section -->
            <div class="section">
                <h3>Contact Information</h3>
                <form @submit.prevent="handleSubmit" class="register-form">

                    <div class="form-group">
                        <label for="email">Email</label>
                        <input v-model="formData.email" type="email" id="email" required placeholder="Enter your email" />
                    </div>

                    <div class="form-group">
                        <label for="phone">Phone</label>
                        <input v-model="formData.phone" type="tel" id="phone" placeholder="Enter your phone number" />
                    </div>

                    <div class="form-group">
                        <label for="address">Address</label>
                        <textarea v-model="formData.address" id="address" placeholder="Enter your address"></textarea>
                    </div>

                    <div class="form-group">
                        <label for="note">Note</label>
                        <textarea v-model="formData.note" id="note" placeholder="Enter a note (optional)"></textarea>
                    </div>

                    <button type="submit" class="register-btn">Register</button>
                </form>
            </div>
        </div>

        <!-- Error and Success Messages -->
        <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
        <div v-if="successMessage" class="success-message">{{ successMessage }}</div>
    </div>
</template>


<script>
import authCustomerService from '../../services/auth.service';
export default {
    data() {
        return {
            formData: {
                name: '',
                username: '',
                password: '',
                retypePassword: '', // For validation only, not to be submitted
                email: '',
                phone: '',
                address: '',
                note: '',
                photo: null
            },
            errorMessage: '',
            successMessage: ''
        };
    },
    methods: {
        async handleSubmit() {
        // Validate password match
        if (this.formData.password !== this.formData.retypePassword) {
            this.errorMessage = 'Passwords do not match.';
            this.successMessage = '';
            return;
        }

        try {
            // Prepare the form data as a plain JavaScript object (JSON)
            const formData = {
                name: this.formData.name,
                username: this.formData.username,
                password: this.formData.password,
                email: this.formData.email,
                phone: this.formData.phone,
                address: this.formData.address,
                note: this.formData.note,
            };

            // // If a photo is provided, include it as part of the formData
            // if (this.formData.photo) {
            //     formData.photo = this.formData.photo;
            // }

            // Call the register service with the prepared JSON data
            const response = await authCustomerService.register(formData);
            this.successMessage = response.data.message;
            console.log("Form Data:", formData);
            this.$router.push({ name: 'Login' });
            this.errorMessage = '';
        } catch (error) {
            this.errorMessage = error.response?.data?.message || 'Registration failed. Please try again.';
            this.successMessage = '';
        }
    }
        // handleFileChange(event) {
        //     const file = event.target.files[0];
        //     if (file) {
        //         this.formData.photo = file;
        //     }
        // }
    }
};
</script>


<style scoped>
.register-page {
    width: 1000px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 8px;
    background-color: #f9f9f9;
}

h2 {
    text-align: center;
    margin-bottom: 20px;
}

h3 {
    margin-top: 0;
    margin-bottom: 15px;
}

.section-container{
    display: flex;
    justify-content: space-around;
}

.section {
    margin-bottom: 20px;
}

.register-form {
    display: flex;
    flex-direction: column;
}

.form-group {
    margin-bottom: 15px;
}

label {
    font-weight: bold;
    margin-bottom: 5px;
    display: inline-block;
}

input,
textarea {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
}

button.register-btn {
    background-color: #4caf50;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
    margin-top: 20px;
}

button.register-btn:hover {
    background-color: #45a049;
}

.error-message {
    color: red;
    margin-top: 10px;
}

.success-message {
    color: green;
    margin-top: 10px;
}
</style>