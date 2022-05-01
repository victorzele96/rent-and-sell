const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 6 },
  properties: [{ type: mongoose.Types.ObjectId, required: true, ref: 'Property' }]
});

// userSchema.plugin(uniqueValidator);

userSchema.set('toJSON', { getters: true });

module.exports = mongoose.model('User', userSchema);