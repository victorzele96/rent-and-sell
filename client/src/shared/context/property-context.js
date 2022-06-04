import { createContext, useState } from "react";

import { useHttpClient } from "../hooks/http-hook";

const initialPropertyState = {
  description: '',
  address: '',
  images: [],
  details: {
    listing_status: "rent",
    price: 0,
    renovated: false,
    rooms_num: 0,
    room_size: 0,
    property_type: "house",
    stories: 0,
    floor: 0,
    parking: false,
    accessiblity: false,
    natural_illumination: false,
    pets: false,
    park: false,
    public_transport: false,
    public_institutes: false,
    contact: ''
  },
  creator: ''
};

const PropertyContext = createContext({
  properties: [],
  propertyForm: initialPropertyState,
  setProperties: (property) => { },
  setPropertyForm: (prevState) => { },
  createProperty: (propertyData) => { },
  uploadImage: () => { },
  addProperty: (property) => { },
  editProperty: (propertyId) => { },
  deleteProperty: (propertyId) => { },
  isLoading: false,
  setImgsToDelete: (imgs_list) => { },
});

export const PropertyContextProvider = (props) => {
  const [propertyForm, setPropertyForm] = useState(initialPropertyState);
  const [properties, setProperties] = useState([]);
  const { isLoading, sendRequest } = useHttpClient();
  const [imgsToDelete, setImgsToDelete] = useState([]);

  const createPropertyHandler = async (token) => {
    try {
      await sendRequest(
        process.env.REACT_APP_BACK_URL + '/properties',
        'POST',
        JSON.stringify({
          description: propertyForm.description,
          address: propertyForm.address,
          images: propertyForm.images,
          details: propertyForm.details
        }),
        {
          Authorization: 'Bearer ' + token,
          'Content-Type': 'application/json'
        },
      );
    } catch (err) {
      console.log(err);
    }
  };

  const uploadImage = async (preset) => {
    const url = `https://api.cloudinary.com/v1_1/rent-and-sell/image/upload`;

    const formData = new FormData();
    let imagesUrl = [];
    try {
      for (const image of propertyForm.images) {
        formData.append('file', image);
        formData.append('upload_preset', preset);

        const data = await sendRequest(url, 'POST', formData);
        imagesUrl.push(data.secure_url);
      }
      setPropertyForm(prevState => ({ ...prevState, images: imagesUrl }));
    } catch (err) {
      console.log(err);
    }
  };

  const addPropertyHandler = (property) => {
    setProperties((prevProperties => prevProperties.concat(property)));
  }

  const editPropertyHandler = async (propertyId, token) => {
    try {
      await sendRequest(
        process.env.REACT_APP_BACK_URL + '/properties/' + propertyId,
        'PATCH',
        JSON.stringify({
          description: propertyForm.description,
          address: propertyForm.address,
          images: propertyForm.images,
          details: propertyForm.details,
          imgsToDelete
        }),
        {
          Authorization: 'Bearer ' + token,
          'Content-Type': 'application/json'
        },
      );
    } catch (err) {
      console.log(err);
    }
  };

  const deletePropertyHandler = (propertyId) => {
    setProperties((prevProperties => prevProperties.filter(property => property.id !== propertyId)));
  };

  const context = {
    properties,
    propertyForm,
    setPropertyForm,
    setProperties,
    createProperty: createPropertyHandler,
    uploadImage,
    addProperty: addPropertyHandler,
    editProperty: editPropertyHandler,
    deleteProperty: deletePropertyHandler,
    isLoading,
    setImgsToDelete,
  };

  return (
    <PropertyContext.Provider value={context}>
      {props.children}
    </PropertyContext.Provider>
  );
}

export default PropertyContext;