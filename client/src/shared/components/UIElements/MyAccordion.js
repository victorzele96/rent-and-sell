import { useEffect, useState } from 'react';

import { Typography } from '@mui/material';

import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';

import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';

import { styled } from '@mui/material/styles';

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

const MyAccordion = (props) => {
  const [expanded, setExpanded] = useState('');

  const panelChangeHandler = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  useEffect(() => {
    console.log(props.selected);
    if (props.selected) {
      setExpanded(`${props.selected.title}Panel`);
    }
  }, [props.selected]);

  return (
    <Accordion
      expanded={expanded === `${props.item.title}Panel`}
      onChange={panelChangeHandler(`${props.item.title}Panel`)}
    >
      <AccordionSummary
        aria-controls={`${props.item.title}Paneld-content`}
        id={`${props.item.title}Paneld-header`}
      >
        <Typography>
          {props.item.title}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography gutterBottom>
          {props.item.message}
        </Typography>
      </AccordionDetails>
    </Accordion>
  )
}
export default MyAccordion;