import image from '../../static/images/types-of-homes-hero.png';

const DUMMY_DATA = [
  {
    id: "h1",
    title: "Villa in San Andreas",
    description: "One of the most impressive villas in Los Santos.",
    img: image,
    address: "5454 Interstate 55 North Frontage Rd, Jackson, MS 39211, United States",
    details: {
      listing_status: "Sale",
      creation_date: "3 hours",
      price: "1,750,000",
      renovated: true,
      rooms_num: "3",
      room_size: "75",
      house_type: "house",
      stories: "2",
      floor: "",
      parking: "1",
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
    title: "dsfsdf",
    description: "1234dsa",
    img: image,
    address: "123 Interstate 55 North Frontage Rd, Jackson, MS 39211, United States",
    details: {
      listing_status: "Rent",
      creation_date: "3 hours",
      price: "2,100",
      renovated: true,
      rooms_num: "3",
      room_size: "75",
      house_type: "apartment",
      stories: "",
      floor: "1",
      parking: "no",
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