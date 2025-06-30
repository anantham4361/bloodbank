module.exports = (pool) => {
  const getDonors = async () => {
    const [rows] = await pool.query('SELECT * FROM donors');
    return rows;
  };

  const addDonor = async (donorData) => {
    const { name, age, gender, blood_group, contact, location } = donorData;
    const [result] = await pool.query(
      'INSERT INTO donors (name, age, gender, blood_group, contact, location) VALUES (?, ?, ?, ?, ?, ?)',
      [name, age, gender, blood_group, contact, location]
    );
    return result.insertId;
  };

  const deleteDonorById = async (id) => {
    const [result] = await pool.query('DELETE FROM donors WHERE id = ?', [id]);
    return result.affectedRows > 0;
  };

  return {
    getDonors,
    addDonor,
    deleteDonorById
  };
};