const express = require('express');
const {
    registerUserForCourse,
    getAllRegistrations,
    getRegistrationById,
    updateRegistration,
    deleteRegistration,
  } = require('../controllers/registrationController');

const router = express.Router();

router.post('/', registerUserForCourse);
router.get('/', getAllRegistrations);
router.get('/:id', getRegistrationById);
router.put('/:id', updateRegistration);
router.delete('/:id', deleteRegistration);

module.exports = router;