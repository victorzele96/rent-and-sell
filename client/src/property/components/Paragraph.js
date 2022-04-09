import { Typography } from '@mui/material';

import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';

const Paragraph = (props) => {
  const yes_noIcon = () => {
    if (props.text === "yes") {
      return <CheckIcon className={props.iconClassName} />
    } else if (props.text === "no") {
      return <ClearIcon className={props.iconClassName} />
    }
  };

  const textOrIcon = (props.text === "yes" || props.text === "no") ? yes_noIcon() : props.text;
  return (
    <>
      {props.show && <Typography paragraph>{props.icon}{props.info} {textOrIcon}</Typography>}
    </>
  );
};

export default Paragraph;