const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const contactController = require('../controllers/contactController');


router.get('/', contactController.getContacts);

// @route   GET api/contacts/:id
// @desc    Get single contact by ID
// @access  Public
router.get('/:id', contactController.getContactById);

router.post(
  '/',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('phone', 'Phone number is required').not().isEmpty()
  ],
  contactController.addContact
);

router.put(
  '/:id',
  [
    check('name', 'Name is required').optional().not().isEmpty(),
    check('email', 'Please include a valid email').optional().isEmail(),
    check('phone', 'Phone number is required').optional().not().isEmpty()
  ],
  contactController.updateContact
);


router.delete('/:id', contactController.deleteContact);

module.exports = router;