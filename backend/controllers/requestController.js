

module.exports = (pool) => ({
  getAllRequests: async (req, res) => {
    try {
      const [rows] = await pool.query('SELECT * FROM requests');
      res.json(rows);
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch requests' });
    }
  },

  updateRequestStatus: async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    try {
      await pool.query('UPDATE requests SET status = ? WHERE id = ?', [status, id]);
      res.json({ message: 'Status updated' });
    } catch (err) {
      res.status(500).json({ error: 'Failed to update status' });
    }
  },

  submitRequest: async (req, res) => {
  const { patient_name, hospital, blood_group, quantity, contact } = req.body;

  // Validation
  if (!patient_name || !hospital || !blood_group || !quantity || !contact) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const [result] = await pool.query(
      'INSERT INTO requests (patient_name, hospital, blood_group, quantity, contact, status) VALUES (?, ?, ?, ?, ?, "Pending")',
      [patient_name, hospital, blood_group, quantity, contact]
    );
    res.status(201).json({ message: 'Request submitted successfully', id: result.insertId });
  } catch (err) {
    console.error("Error inserting request:", err);
    res.status(500).json({ error: 'Failed to submit request' });
  }
}

});
