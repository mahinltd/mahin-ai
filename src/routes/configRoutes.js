/**
 * 🧭 Mahin AI - Public Configuration Routes
 * পরিচালক ও সিইও: Tanvir Rahman (Mahin Ltd)
 */

const express = require('express');
const router = express.Router();
const { getPublicConfig } = require('../controllers/configController');

// Public endpoint - no authentication required
router.get('/', getPublicConfig);

module.exports = router;
