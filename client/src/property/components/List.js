import { Stack } from "@mui/material";

import PropertyItem from "./PropertyItem";

const List = (props) => {
  return (
    <Stack spacing="30px" sx={{ alignItems: "center" }}>
      {props.properties.map(item => (
        <PropertyItem key={item.id} property={item} />
      ))}
    </Stack >
  );
};

export default List;