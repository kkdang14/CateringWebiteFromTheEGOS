const jwt = require('jsonwebtoken');

const checkingLogin = (req, res, next) => {
    try {
        // Lấy token từ cookie
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({ message: "Authentication required" });
        }

        // Xác thực token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Gắn thông tin user vào request để sử dụng tiếp

        next(); // Cho phép request tiếp tục
    } catch (error) {
        res.status(403).json({ message: "Invalid or expired token" });
    }
};

module.exports = {
    checkingLogin
}