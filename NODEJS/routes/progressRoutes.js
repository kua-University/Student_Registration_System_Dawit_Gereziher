const express = require('express');
const {
    createProgressRecord,
    getAllProgressRecords,
    getProgressById,
    updateProgressRecord,
    deleteProgressRecord,
  } = require('../controllers/progressController');

const router = express.Router();

// Progress routes
router.post('/', createProgressRecord);
router.get('/', getAllProgressRecords);
router.get('/:id', getProgressById);
router.put('/:id', updateProgressRecord);
router.delete('/:id', deleteProgressRecord);

module.exports = router;