const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) return res.status(401).json({ message: 'Không tìm thấy token!' });
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || "SECRET_KEY_CUA_BAN");
        req.user = decoded;
        next();
    } catch (err) {
        console.error("Lỗi xác thực Token:", err.message);
        res.status(401).json({ message: 'Token không hợp lệ!' });
    }
};

const checkRole = (roles) => {
    return (req, res, next) => {
        if (!req.user || !roles.includes(req.user.roleId)) {
            return res.status(403).json({ message: 'Bạn không có quyền truy cập tài nguyên này!' });
        }
        next();
    };
};

module.exports = { authenticate, checkRole };