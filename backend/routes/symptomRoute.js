const express = require('express');
const { processSymptoms } = require('../controllers/symptomController');

const router = express.Router();

// POST /api/symptoms - Process symptoms and get AI response
router.post('/', processSymptoms);

module.exports = router;