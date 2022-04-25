const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const propertySchema = new Schema({
  description: { type: String, required: true },
  image: { type: [String], required: true },
  address: { type: String, required: true },
  // location: {
  //   type: {
  //     type: String,
  //     enum: ['Point'],
  //     required: true
  //   },
  //   coordinates: {
  //     type: [Number],
  //     required: true
  //   }
  // },
  details: {
    listing_status: { type: String, required: true },
    creation_date: { type: Date, default: Date.now() },
    price: { type: Number, required: true },
    renovated: { type: Boolean },
    rooms_num: { type: Number, required: true },
    room_size: { type: Number, required: true },
    house_type: { type: String, required: true },
    stories: { type: Number },
    floor: { type: Number },
    parking: { type: Boolean },
    accessiblity: { type: Boolean },
    natural_illumination: { type: Boolean },
    pets: { type: Boolean },
    park: { type: Boolean },
    public_transport: { type: Boolean },
    public_institutes: { type: Boolean },
    contact: { type: String, required: true }
  },
  creator: { type: String, require: true }
  // creator: { type: mongoose.Types.ObjectId, required: true, ref: 'User' }
});

propertySchema.set('toJSON', { getters: true });

module.exports = mongoose.model('Propery', propertySchema);