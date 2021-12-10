import { Stack } from "@mui/material";
import PropertyItem from "./Property/PropertyItem";

const List = () => {
  return (
    <Stack spacing="30px" sx={{ alignItems: "center" }}>
      <PropertyItem />
      <PropertyItem />
    </Stack >
  );
};

export default List;