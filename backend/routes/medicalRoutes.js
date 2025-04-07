// routes/symptomRoutes.js
const express = require("express");
const { getDiagnosis, conditionDetails, treatmentInfo } = require("../controllers/medicalController");
const router = express.Router();

router.post("/ai-diagnosis", getDiagnosis);
router.post("/ai-condition-details", conditionDetails);
router.post("/ai-treatment", treatmentInfo);

module.exports = router;
