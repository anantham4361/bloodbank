// module.exports = (pool) => ({
//   updateStock: async (blood_group, quantity) => {
//     const [rows] = await pool.query('SELECT quantity FROM blood_stock WHERE blood_group = ?', [blood_group]);

//     if (rows.length === 0) {
//       throw new Error("Invalid blood group"); // just in case
//     }

//     const newQty = rows[0].quantity + quantity;
//     await pool.query('UPDATE blood_stock SET quantity = ? WHERE blood_group = ?', [newQty, blood_group]);
//   }
// });

module.exports = (pool) => ({
  updateStock: async (blood_group, quantity) => {
    const [rows] = await pool.query('SELECT quantity FROM blood_stock WHERE blood_group = ?', [blood_group]);
    if (rows.length === 0) throw new Error('Invalid blood group');

    const newQty = rows[0].quantity + quantity;
    await pool.query('UPDATE blood_stock SET quantity = ? WHERE blood_group = ?', [newQty, blood_group]);
  }
});