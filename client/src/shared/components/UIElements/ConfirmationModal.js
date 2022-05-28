import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button
} from "@mui/material";

const ConfirmationModal = (props) => {
  const cancelHandler = () => {
    props.onCancel();
  };

  const confirmHandler = () => {
    props.onConfirm();
  };

  return (
    <Dialog
      open={props.open}
      onClose={cancelHandler}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {props.title}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {props.text}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={cancelHandler}>Cancel</Button>
        <Button
          color="error"
          onClick={confirmHandler}>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  )
}
export default ConfirmationModal;