require('dotenv').config();

exports.PORT = process.env.PORT;
exports.DB_URI = process.env.DB_URI;
exports.SALT_ROUNDS = Number(process.env.SALT_ROUNDS);
exports.JWT_SECRET = process.env.JWT_SECRET;
exports.PAGINATION_SIZE = Number(process.env.PAGINATION_SIZE);