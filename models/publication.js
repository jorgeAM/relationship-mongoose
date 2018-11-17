const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const languageSchema = new Schema({
  title: {
    type: String,
    required: [true, 'El titulo es necesario'],
  },
  content: {
    type: String,
    required: [true, 'El contenido es necesario'],
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

const Language = mongoose.model('Publication', languageSchema);

module.exports = Language;
