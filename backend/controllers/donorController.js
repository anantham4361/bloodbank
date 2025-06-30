const donorModel = require('../models/Donor');
const stockModel = require('../models/Stock');

exports.registerDonor = async (req, res, pool) => {
  try {
    const donorId = await donorModel(pool).addDonor(req.body);
    await stockModel(pool).updateStock(req.body.blood_group, parseInt(req.body.quantity) || 1);
    res.status(201).json({ message: 'Donor registered successfully', id: donorId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to register donor' });
  }
};

exports.getAllDonors = async (req, res, pool) => {
  try {
    const donors = await donorModel(pool).getDonors();
    res.json(donors);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch donors' });
  }
};

exports.deleteDonor = async (req, res, pool) => {
  try {
    const success = await donorModel(pool).deleteDonorById(req.params.id);
    if (success) {
      res.json({ message: 'Donor deleted' });
    } else {
      res.status(404).json({ error: 'Donor not found' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete donor' });
  }
};
