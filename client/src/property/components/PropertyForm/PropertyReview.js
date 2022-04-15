import { useCallback, useEffect, useState } from "react";
import PropertyItem from "../PropertyItem"

const PropertyReview = () => {
  const [propertyData, setPropertyData] = useState({});

  useEffect(() => {
    const items = {
      ...JSON.parse(sessionStorage.getItem("new-property-state")),
      images: [
        ...JSON.parse(sessionStorage.getItem("new-property-images"))
      ]
    };
    if (items) {
      setPropertyData(items);
    }
  }, []);

  console.log(propertyData);

  return (
    <>
      <PropertyItem property={propertyData} />
      {/* {propertyData && Object.keys(propertyData).legnth !== 0 &&
        <PropertyItem property={propertyData} />
      }
      {
        propertyData && Object.keys(propertyData).legnth === 0 && <p>No data</p>
      } */}
    </>
  );
};

export default PropertyReview;