const argon2 = require('argon2');

const hashPassword = async (password) => {
    try {
        return await argon2.hash(password);
    } catch (err) {
        throw new Error('Failed to hash password');
    }
};

const verifyPassword = async (hashed, plain) => {
    return await argon2.verify(hashed, plain);
};

module.exports = { hashPassword, verifyPassword };
