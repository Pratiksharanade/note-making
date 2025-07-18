// generateToken.js
import jwt from 'jsonwebtoken'; // ✅ THIS LINE WAS MISSING

const payload = { id: 'user123' };
const secret = 'secret123'; // must match JWT_SECRET in .env
const token = jwt.sign(payload, secret, { expiresIn: '1h' });

console.log('✅ Your valid test token:\n');
console.log(token);
