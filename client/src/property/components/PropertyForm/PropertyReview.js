import PropertyItem from "../PropertyItem"

const PropertyReview = (props) => {
  return (
    <>
      <PropertyItem preview={true} property={props.property} />
    </>
  );
};

export default PropertyReview;