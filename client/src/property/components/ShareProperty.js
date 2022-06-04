import { useState } from "react";

import {
  FacebookShareButton,
  FacebookIcon,
  TelegramShareButton,
  TelegramIcon,
  WhatsappShareButton,
  WhatsappIcon,
} from "react-share";

import { DialogActions } from "@mui/material";

const ShareProperty = (props) => {
  // eslint-disable-next-line
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => {
    setIsOpen((prev) => !prev);
  };

  // const shareUrl = window.location.href;
  const shareUrl = process.env.REACT_APP_FRONT_URL + '/property/' + props.propertyId; // TODO: need to be changed to url with specific item
  return (
    <DialogActions
      sx={{ width: "250px", justifyContent: "center", paddingTop: "14px" }}
      onClick={toggle}
    >
      <FacebookShareButton url={shareUrl}>
        <FacebookIcon size={40} round={true} />
      </FacebookShareButton>
      <TelegramShareButton url={shareUrl}>
        <TelegramIcon size={40} round={true} />
      </TelegramShareButton>
      <WhatsappShareButton url={shareUrl}>
        <WhatsappIcon size={40} round={true} />
      </WhatsappShareButton>
    </DialogActions>
  );
};

export default ShareProperty;