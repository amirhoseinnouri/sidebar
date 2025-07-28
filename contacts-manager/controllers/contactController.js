const { validationResult } = require('express-validator');
const { v4: uuidv4 } = require('uuid'); 

// Simple in-memory storage for contacts
let contacts = [];

// @route   GET api/contacts
// @desc    Get all contacts
// @access  Public
exports.getContacts = (req, res, next) => {
  try {
    // Sort by createdAt
    res.json(contacts.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0)));
  } catch (err) {
    next(err);
  }
};

exports.getContactById = (req, res, next) => {
  try {
    const contact = contacts.find(c => c.id === req.params.id);
    if (!contact) {
      return res.status(404).json({ msg: 'Contact not found' });
    }
    res.json(contact);
  } catch (err) {
    next(err);
  }
};


exports.addContact = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, email, phone, address } = req.body;

  // Simple validation for unique email
  if (contacts.some(c => c.email === email)) {
    return res.status(400).json({ msg: 'Contact with this email already exists' });
  }

  try {
    const newContact = {
      id: uuidv4(), // Generate a unique ID
      name,
      email,
      phone,
      address: address || '', // Default to empty string 
      createdAt: Date.now()
    };

    contacts.push(newContact);
    res.status(201).json(newContact);
  } catch (err) {
    next(err);
  }
};


exports.updateContact = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, email, phone, address } = req.body;

  try {
    let contactIndex = contacts.findIndex(c => c.id === req.params.id);

    if (contactIndex === -1) {
      return res.status(404).json({ msg: 'Contact not found' });
    }


    if (name) contacts[contactIndex].name = name;
    if (email) {

      if (contacts.some((c, i) => c.email === email && i !== contactIndex)) {
        return res.status(400).json({ msg: 'Contact with this email already exists' });
      }
      contacts[contactIndex].email = email;
    }
    if (phone) contacts[contactIndex].phone = phone;
    if (address) contacts[contactIndex].address = address;

    res.json(contacts[contactIndex]);
  } catch (err) {
    next(err);
  }
};

// @route   DELETE api/contacts/:id
// @desc    Delete contact
// @access  Public
exports.deleteContact = (req, res, next) => {
  try {
    const initialLength = contacts.length;
    contacts = contacts.filter(c => c.id !== req.params.id);

    if (contacts.length === initialLength) {
      return res.status(404).json({ msg: 'Contact not found' });
    }

    res.json({ msg: 'Contact removed' });
  } catch (err) {
    next(err);
  }
};