import { CircularProgress, Modal } from "@mui/material";

const CircularProgressModal = () => {
  return (
    <Modal open sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
      <CircularProgress />
    </Modal>
  );
};

export default CircularProgressModal;