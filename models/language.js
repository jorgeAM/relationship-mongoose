const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const languageSchema = new Schema({
  name: {
    type: String,
    required: [true, 'El nombre es necesario'],
  },
  users: [{ type: Schema.Types.ObjectId, ref: 'User' }],
});

const Language = mongoose.model('Language', languageSchema);

module.exports = Language;
