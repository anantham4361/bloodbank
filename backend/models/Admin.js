// models/Admin.js

module.exports = (pool) => {
  const loginAdmin = async (username, password) => {
    const [rows] = await pool.query('SELECT * FROM admins WHERE username = ?', [username]);
    const admin = rows[0];

    if (!admin) return null;

    const isValid = require('bcryptjs').compareSync(password, admin.password);
    return isValid ? admin : null;
  };

  return {
    loginAdmin
  };
};