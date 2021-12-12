import { Stack } from "@mui/material";

import DUMMY_DATA from "./Property/propertyData";
import PropertyItem from "./Property/PropertyItem";

const List = () => {
  return (
    <Stack spacing="30px" sx={{ alignItems: "center" }}>
      {DUMMY_DATA.map(item => (
        <PropertyItem key={item.id} title={item.title} description={item.description} />
      ))}
    </Stack >
  );
};

export default List;