import { Box, Modal, Typography } from '@mui/material';

import MyAccordion from '../UIElements/MyAccordion';

const modalBoxStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: {
    lg: 600,
    md: 500,
    sm: 400,
    xs: 300
  },
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: '4px'
};

const Notifications = (props) => {
  return (
    <Modal
      open={props.open}
      onClose={props.onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={modalBoxStyle}>
        <Typography variant='h4' gutterBottom>
          Notifications
        </Typography>
        {props.notifications && props.notifications.map((notification, index) => (
          <MyAccordion key={`${index}-accordion`} item={notification} selected={props.notifications[props.selected]} />
        ))}
      </Box>
    </Modal>
  );
};

export default Notifications;