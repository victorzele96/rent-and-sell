import { useState, useEffect, useContext } from "react";

import { useHttpClient } from "../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/context/auth-context";

import { Rating, Box } from "@mui/material";

import StarIcon from "@mui/icons-material/Star";

const labels = {
  1: "Not recommended",
  2: "Disappointing",
  3: "Ok",
  4: "Good",
  5: "Excellent",
};

function getLabelText(value) {
  return `${value} Star${value !== 1 ? "s" : ""}, ${labels[value]}`;
}

const HoverRating = (props) => {
  const [value, setValue] = useState(0);
  const [hover, setHover] = useState(-1);

  useEffect(() => {
    setValue(props.currentValue);
  }, [props.currentValue])

  const authCtx = useContext(AuthContext);

  const { sendRequest } = useHttpClient();

  const ratingHandler = async (event, newValue) => {
    setValue(newValue ? newValue : Number(event.target.defaultValue));
    try {
      await sendRequest(
        process.env.REACT_APP_BACK_URL + `/properties/rate/${props.property.id}/${authCtx.user.userId}`,
        "PATCH",
        JSON.stringify({
          userId: authCtx.user.userId,
          userRating: newValue ? newValue : event.target.defaultValue,
        }),
        {
          Authorization: "Bearer " + authCtx.token,
          "Content-Type": "application/json",
        }
      );
    } catch (err) {
      console.log(err.message || "Something went wrong, please try again.");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
      }}
    >
      <Rating
        // if guest or creator => rating is readOnly
        readOnly={!authCtx.user || authCtx.user.userId.toString() === props.property.creator.toString() ? true : false}
        name="hover-feedback"
        value={value}
        precision={1}
        max={5}
        getLabelText={getLabelText}
        onChange={ratingHandler}
        onChangeActive={(event, newHover) => {
          setHover(newHover);
        }}
        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
      />
      {value !== null && (
        <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>
      )}
    </Box>
  );
};

export default HoverRating;