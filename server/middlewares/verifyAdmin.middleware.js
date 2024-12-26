const jwt = require('jsonwebtoken');

const verifyAdmin = (req, res, next) => {
    const token = req.cookies.token; // Lấy token từ HttpOnly cookie

    if (!token) {
        return res.status(401).json({ message: 'Please' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Giải mã token
        if (decoded.userType !== 'employee') {
            return res.status(403).json({ message: 'Chỉ Admin mới có quyền truy cập' });
        }

        req.user = decoded; // Gắn thông tin user vào req để sử dụng tiếp
        next(); // Tiếp tục xử lý request
    } catch (error) {
        console.error('Lỗi xác minh token:', error);
        return res.status(401).json({ message: 'Token không hợp lệ hoặc đã hết hạn' });
    }
};


module.exports = verifyAdmin;
