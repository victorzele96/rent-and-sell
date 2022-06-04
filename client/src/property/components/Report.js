import { useState, useContext } from 'react';

import {
  Box,
  Typography,
  Modal,
  Button,
  Alert
} from '@mui/material';

import { useHttpClient } from "../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/context/auth-context";

import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';

import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';

import { styled } from '@mui/material/styles';

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

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&:before': {
    display: 'none',
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === 'dark'
      ? 'rgba(255, 255, 255, .05)'
      : 'rgba(0, 0, 0, .03)',
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

const Report = (props) => {
  const [open, setOpen] = useState(true);
  const authCtx = useContext(AuthContext);

  const { sendRequest } = useHttpClient();

  const closeModalHandler = () => {
    setOpen(false)
    props.onClose();
  };

  const [expanded, setExpanded] = useState('');
  const [selectedReport, setSelectedReport] = useState('');
  const [error, setError] = useState();

  const panelChangeHandler = (panel) => (event, newExpanded) => {
    setError(null);
    setExpanded(newExpanded ? panel : false);
    const str = panel.split('Panel')[0];
    setSelectedReport(newExpanded ? str.charAt(0).toUpperCase() + str.slice(1) : '');
  };

  const submitHandler = (event) => {
    if (selectedReport !== '') {
      console.log(selectedReport);
      reportHandler();
    } else {
      setError('Choose report reason before clicking submit.');
    }
  };

  const reportHandler = async () => {
    try {
      await sendRequest(
        process.env.REACT_APP_BACK_URL + `/properties/report/${props.propertyId}/${authCtx.user.userId}`,
        "PATCH",
        JSON.stringify({
          userId: authCtx.user.userId,
          userReport: selectedReport,
        }),
        {
          Authorization: "Bearer " + authCtx.token,
          "Content-Type": "application/json",
        }
      );
      alert('Reported successfully!');
      closeModalHandler();
    } catch (err) {
      console.log(err.message || "Something went wrong, please try again.");
      setError(err.message);
    }
  };

  return (
    <Modal
      open={open}
      onClose={closeModalHandler}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={modalBoxStyle}>
        <Typography variant='h4' gutterBottom>
          Report
        </Typography>
        <Accordion expanded={expanded === 'spamPanel'} onChange={panelChangeHandler('spamPanel')} sx={{ mt: 3 }}>
          <AccordionSummary aria-controls="spamPaneld-content" id="spamPaneld-header">
            <Typography>Spam</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography gutterBottom>
              If one of the following describes your problem click submit.
            </Typography>
            <Typography variant="body2" gutterBottom>
              • Similar post already exists.
            </Typography>
            <Typography variant="body2">
              • Post author use chat spam.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion expanded={expanded === 'wrongPanel'} onChange={panelChangeHandler('wrongPanel')}>
          <AccordionSummary aria-controls="wrongPaneld-content" id="wrongPaneld-header">
            <Typography>Wrong Information</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography gutterBottom>
              If one of the following describes your problem click submit.
            </Typography>
            <Typography variant="body2" gutterBottom>
              • Post contain missleading information.
            </Typography>
            <Typography variant="body2">
              • Post contain wrong information.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion expanded={expanded === 'offensivePanel'} onChange={panelChangeHandler('offensivePanel')}>
          <AccordionSummary aria-controls="offensivePaneld-content" id="offensivePaneld-header">
            <Typography>Offensive</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography gutterBottom>
              If one of the following describes your problem click submit.
            </Typography>
            <Typography variant="body2" gutterBottom>
              • Post author used offensive language agains you.
            </Typography>
            <Typography variant="body2">
              • Post contain offensive language.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Box sx={{ mt: 3, display: 'flex', justifyContent: 'right' }}>
          <Button disabled={!selectedReport} variant="contained" onClick={submitHandler}>Submit</Button>
        </Box>
        {error && (
          <Box sx={{ mt: 1 }}>
            <Alert severity="error">{error}</Alert>
          </Box>
        )}
      </Box>
    </Modal>
  );
};

export default Report;