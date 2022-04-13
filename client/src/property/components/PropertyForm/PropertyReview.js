import { useEffect, useState } from "react";
import PropertyItem from "../PropertyItem"

const PropertyReview = () => {
  const [item, setItem] = useState({});

  // useEffect(() => {
  //   return () => {
  //     setItem({
  //       ...JSON.parse(window.sessionStorage.getItem("new-property-state"))
  //     });
  //     let images = JSON.parse(window.sessionStorage.getItem("new-property-images"));
  //     setItem(prevState => [...prevState, images])
  //     console.log(item);
  //   }
  // }, [item]);

  return (
    <>
      {/* <PropertyItem item={item} /> */}
    </>
  );
};

export default PropertyReview;