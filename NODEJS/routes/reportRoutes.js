const express = require('express');
const {authMiddleware} = require('../middlewares/authentication');
const {
    createReport,
    getAllReports,
    getReportById,
    updateReport,
    deleteReport,
  } = require('../controllers/reportController');

const router = express.Router();

// Report routes
router.post('/',authMiddleware(['admin']), createReport);
router.get('/', getAllReports);
router.get('/:id', getReportById);
router.put('/:id', updateReport);
router.delete('/:id', deleteReport);

module.exports = router;