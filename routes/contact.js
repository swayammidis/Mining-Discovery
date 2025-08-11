const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');

// POST /api/contact - send a message
router.post('/', contactController.sendMessage);

// GET /api/contact/admin/messages - fetch all contact messages (admin)
router.get('/admin/messages', contactController.getAllMessages); // <-- line 9 here?

// DELETE /api/contact/:id - delete a contact message by ID (admin)
router.delete('/:id', contactController.deleteMessage);

module.exports = router;
