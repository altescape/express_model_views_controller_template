var mongoose = require('mongoose');

var EntrySchema = new mongoose.Schema({
  sessionId: String,
  firstName: String,
  lastName: String,
  email: String,
  approved: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
});

mongoose.model('Entry', EntrySchema);
