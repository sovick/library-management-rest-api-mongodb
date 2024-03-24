require('dotenv').config();

exports.PORT = process.env.PORT;
exports.DB_URI = process.env.DB_URI;
exports.SALT_ROUNDS = process.env.SALT_ROUNDS;
exports.JWT_SECRET = process.env.JWT_SECRET;