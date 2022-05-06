import { createContext, useState } from "react";

const PropertyContext = createContext({
  properties: [],
  propertyForm: {},
  setPropertyForm: (prevState) => { },
  createProperty: (propertyData) => { },
  addProperty: (property) => { },
  editProperty: (propertyId) => { },
  deleteProperty: (propertyId) => { }

});

export const PropertyContextProvider = (props) => {
  const [propertyForm, setPropertyForm] = useState({});
  const [properties, setProperties] = useState([]);

  const createPropertyHandler = (propertyData) => {
    setPropertyForm(prevState => {
      return { ...prevState, ...propertyData };
    });
  };

  const addPropertyHandler = (property) => {
    setProperties((prevProperties => {
      return prevProperties.concat(property);
    }));
  }

  const editPropertyHandler = (propertyId) => {

  };

  const deletePropertyHandler = (propertyId) => {
    setProperties((prevProperties => {
      return prevProperties.filter(property => property.id !== propertyId);
    }));
  };

  const context = {
    properties,
    propertyForm,
    setPropertyForm,
    createProperty: createPropertyHandler,
    addProperty: addPropertyHandler,
    editProperty: editPropertyHandler,
    deleteProperty: deletePropertyHandler
  };

  return (
    <PropertyContext.Provider value={context}>
      {props.children}
    </PropertyContext.Provider>
  );
}

export default PropertyContext;