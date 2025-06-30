// const StockModel = require('../models/Stock');

// exports.getStock = async (req, res) => {
//   const stockModel = StockModel(req.pool);

//   try {
//     const stock = await stockModel.getStock();
//     res.json(stock);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Failed to fetch stock' });
//   }
// };

// exports.updateStock = async (req, res) => {
//   const stockModel = StockModel(req.pool);

//   try {
//     const success = await stockModel.updateStock(req.body.blood_group, req.body.quantity);
//     if (!success) return res.status(400).json({ error: 'Failed to update stock' });

//     res.json({ message: 'Stock updated successfully' });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Server error' });
//   }
// };


module.exports = {
  getStock: async (req, res) => {
    try {
      const [rows] = await req.pool.query('SELECT * FROM blood_stock');
      res.json(rows);
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch stock' });
    }
  },

  updateStock: async (req, res) => {
    const { blood_group, quantity } = req.body;
    try {
      await req.pool.query('UPDATE blood_stock SET quantity = ? WHERE blood_group = ?', [quantity, blood_group]);
      res.json({ message: 'Stock updated' });
    } catch (err) {
      res.status(500).json({ error: 'Failed to update stock' });
    }
  }
};
