const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, 'El nombre es necesario'],
  },
  languages: [{ type: Schema.Types.ObjectId, ref: 'Language' }],
});

userSchema.virtual('publications', {
  ref: 'Publication',
  localField: '_id',
  foreignField: 'author',
});

userSchema.set('toObject', { virtuals: true });
userSchema.set('toJSON', { virtuals: true });

const User = mongoose.model('User', userSchema);

module.exports = User;
