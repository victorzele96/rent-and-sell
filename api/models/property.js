const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const properySchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  address: { type: String, required: true },
  location: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true }
  },
  details: {
    listing_status: { type: String, required: true },
    creation_date: { type: Number, required: true },
    price: { type: Number, required: true },
    renovated: { type: Boolean, required: true },
    rooms_num: { type: Number, required: true },
    room_size: { type: Number, required: true },
    house_type: { type: String, required: true },
    stories: { type: Number },
    floor: { type: Number },
    parking: { type: String, required: true },
    accessiblity: { type: Boolean, required: true },
    natural_illumination: { type: Boolean, required: true },
    pets: { type: Boolean, required: true },
    park: { type: Boolean, required: true },
    public_transport: { type: Boolean, required: true },
    public_institutes: { type: Boolean, required: true },
    contact: { type: String, required: true }
  },
  creator: { type: mongoose.Types.ObjectId, required: true, ref: 'User' }
});

module.exports = mongoose.model('Propery', properySchema);