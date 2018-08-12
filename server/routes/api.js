const express = require('express');
const router = express.Router();

// Basic default route to make sure our module is importing/serving correctly.
router.get('/', (req, res) => {
  res.send('Default API Route');
});

module.exports = router;
