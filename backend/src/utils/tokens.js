const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const config = require('../config');
function hashToken(t) { return crypto.createHash('sha256').update(t).digest('hex'); }
function generateAccessToken(user) { return jwt.sign({ id:user.id, role:user.role }, config.jwt.accessSecret, { expiresIn: config.jwt.accessExpiry }); }
function generateRefreshToken(user) { return jwt.sign({ id:user.id }, config.jwt.refreshSecret, { expiresIn: config.jwt.refreshExpiry }); }
function verifyAccessToken(t) { return jwt.verify(t, config.jwt.accessSecret); }
function verifyRefreshToken(t) { return jwt.verify(t, config.jwt.refreshSecret); }
module.exports = { hashToken, generateAccessToken, generateRefreshToken, verifyAccessToken, verifyRefreshToken };
