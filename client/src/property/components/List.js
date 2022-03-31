import { Container, Stack } from "@mui/material";

import { makeStyles } from '@mui/styles';

import PropertyItem from "./PropertyItem";

const useStyles = makeStyles((theme) => ({
  listContainer: {
    "overflow-y": "scroll",
    marginTop: "40px",
    maxHeight: "585px",
  },
  listContainerInner: {
    alignItems: "center",
    paddingBottom: "40px",
    marginTop: "40px",
    "overflow": "hidden"
  }
}));

const List = (props) => {
  const classes = useStyles();

  return (
    <Container maxWidth={false} className={classes.listContainer}>
      <Stack spacing="30px" className={classes.listContainerInner}>
        {props.properties.map(item => (
          <PropertyItem key={item.id} property={item} />
        ))}
      </Stack>
    </Container>
  );
};

export default List;