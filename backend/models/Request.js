// models/request.js

module.exports = (pool) => {
  const getRequests = async () => {
    const [rows] = await pool.query('SELECT * FROM requests');
    return rows;
  };

  const addRequest = async (requestData) => {
    const { patient_name, hospital, blood_group, quantity, contact } = requestData;

    const [result] = await pool.query(
      'INSERT INTO requests (patient_name, hospital, blood_group, quantity, contact) VALUES (?, ?, ?, ?, ?)',
      [patient_name, hospital, blood_group, quantity, contact]
    );

    return result.insertId;
  };

  const updateRequestStatus = async (id, status) => {
    const [result] = await pool.query(
      'UPDATE requests SET status = ? WHERE id = ?', [status, id]
    );
    return result.affectedRows > 0;
  };

  return {
    getRequests,
    addRequest,
    updateRequestStatus
  };
};