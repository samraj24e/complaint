const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../config/db');

const signToken = (user) => jwt.sign({ id: user.id, role: user.role, email: user.email }, process.env.JWT_SECRET, { expiresIn: '12h' });

exports.registerPassenger = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const [exists] = await pool.query('SELECT id FROM users WHERE email = ?', [email]);

    if (exists.length) {
      return res.status(409).json({ message: 'Email already registered' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const [result] = await pool.query('INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)', [
      name,
      email,
      hashedPassword,
      'passenger'
    ]);

    const user = { id: result.insertId, name, email, role: 'passenger' };
    const token = signToken(user);

    return res.status(201).json({ token, user });
  } catch (error) {
    return res.status(500).json({ message: 'Registration failed', error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const [rows] = await pool.query('SELECT id, name, email, password, role FROM users WHERE email = ?', [email]);
    if (!rows.length) {
      return res.status(404).json({ message: 'User not found' });
    }

    const user = rows[0];
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = signToken(user);
    delete user.password;

    return res.json({ token, user });
  } catch (error) {
    return res.status(500).json({ message: 'Login failed', error: error.message });
  }
};
