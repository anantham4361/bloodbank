module.exports = (pool) => {
  return {
    loginAdmin: async (req, res) => {
      const { username, password } = req.body;

      try {
        const [rows] = await pool.query('SELECT * FROM admins WHERE username = ?', [username]);
        const admin = rows[0];

        if (!admin || admin.password !== password) {
          return res.status(401).json({ error: 'Invalid credentials' });
        }

        // No JWT — just respond with success
        res.json({ authenticated: true });

      } catch (err) {
        console.error("Login failed:", err);
        res.status(500).json({ error: "Internal Server Error" });
      }
    }
  };
};