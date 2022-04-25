import image from '../../static/images/types-of-homes-hero.png';

const DUMMY_DATA = [
  {
    id: "h1",
    description: "One of the most impressive villas in Los Santos.",
    images: image,
    address: "5454 Interstate 55 North Frontage Rd, Jackson, MS 39211, United States",
    location: {
      lat: 31.2530,
      lng: 34.7915
    },
    details: {
      listing_status: "Sale",
      creation_date: "3 hours",
      price: "1,750,000",
      renovated: true,
      rooms_num: "3",
      room_size: "75",
      property_type: "house",
      stories: "2",
      floor: "",
      parking: true,
      accessiblity: true,
      natural_illumination: true,
      pets: false,
      park: false,
      public_transport: true,
      public_institutes: true,
      contact: "+97251944245"
    },
    creator: "u1"
  },
  {
    id: "h2",
    description: "1234dsa",
    images: image,
    address: "123 Interstate 55 North Frontage Rd, Jackson, MS 39211, United States",
    location: {
      lat: 31.2,
      lng: 34.7
    },
    details: {
      listing_status: "Rent",
      creation_date: "3 hours",
      price: "2,100",
      renovated: true,
      rooms_num: "3",
      room_size: "75",
      property_type: "apartment",
      stories: "",
      floor: "1",
      parking: false,
      accessiblity: false,
      natural_illumination: true,
      pets: true,
      park: true,
      public_transport: true,
      public_institutes: true,
      contact: "+9721111111"
    },
    creator: "u2"
  },
];

export default DUMMY_DATA;